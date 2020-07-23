import scrapy
import json
import os
import requests

filename='events.json'

if os.path.exists("events.json"):
    os.remove("events.json")

# if os.path.exists("eventsGeoJson.json"):
#     os.remove("eventsGeoJson.json")



class SpiderSpider(scrapy.Spider):
    name = 'events'

    def start_requests(self):

        def readLinkTxt(filename):
            urls= open(filename)
            content = urls.readlines()
            taburls=[]
            i=0
            while(i<len(content)):
                u=content[i].split()
                taburls.append(u[2][:-1])     #le dernier caractère est " donc je supprime le dernier caractère
                i=i+1

            urls.close()
            return(taburls)

        taburls=readLinkTxt('eventsLinks.txt')

        for url in taburls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        list_data=[]

        main=response.xpath('//div[@class="event-listing__body l-sm-pad-top-0"]')
        title_list =main.xpath('.//h1[@class="listing-hero-title"]/text()').extract()
        image_url_list=main.xpath('.//picture/@content').extract_first()
        date_list=main.xpath('.//p[@class="js-date-time-first-line"]/text()').extract_first()
        hour_list=main.xpath('.//p[@class="js-date-time-second-line"]/text()').extract_first()


        def descrip(select):
            description=[]
            for data in select:
                cont= data.xpath('.//text()').extract();
                description=description+['\n']+cont
            return(description)

        all_para=main.xpath('.//div[@class="structured-content-rich-text structured-content__module l-align-left l-mar-vert-6 l-sm-mar-vert-4 text-body-medium"]/p')

        description_list=(descrip(all_para))



        price_list=main.xpath('.//div[@class="js-display-price"]/text()').extract_first()
        address_list=main.xpath('.//div[@class="event-details__data"]/p/text()').extract()

        def format_descrip(tab_descrip):
            long=len(tab_descrip)
            description_list=[]
            description=''
            for i in range (long):
                description=description+tab_descrip[i]
            description_list.append(description)
            return description_list


        def format_add(tab_add):
            long=len(tab_add)
            found = False
            index=0
            i=0
            address=''
            address_list=[]
            if long!=0:
                while found==False:
                    if tab_add[i].startswith('\n')==True or i>=long:
                        index=i
                        found=True
                    i+=1
                if index<long :
                    for j in range (index,long):
                        tab_add.pop()
                long=len(tab_add)
                for p in range (1,len(tab_add)):
                    address=address+tab_add[p]
                address_list.append(address)
                return address_list
            else:
                return tab_add

        def format_list(objet):
            list_=[]
            list_.append(objet)
            return list_

        description_list=format_descrip(description_list)

        address_list=format_add(address_list)
        price_list=format_list(price_list)
        hour_list=format_list(hour_list)
        date_list=format_list(date_list)
        image_url_list=format_list(image_url_list)

        def coord(address):
            coord=[]
            tabAddress = address.split(' ')
            if len(tabAddress)>1:
                add=''
                for i in tabAddress:
                    add=add+'+'+i
                add=add.strip('+')
                req='https://api-adresse.data.gouv.fr/search/?q='+add
                response = requests.get(req)
                result= response.json()
                lon = result['features'][0]['geometry']['coordinates'][0]
                lat = result['features'][0]['geometry']['coordinates'][1]
                coord.append(lon)
                coord.append(lat)
            else:
                coord.append(0)
                coord.append(0)
            return coord

        address_coord_list=[]


        for address in address_list:
            coord=coord(address)
            address_coord_list.append(coord)


        i=0
        for title in title_list:
            if hour_list[i] is None:
                hour_list[i]=[]
            else:
                hour_list[i]=hour_list[i].replace("CEST","")

            if title is None:
                title=[]
            else :
                title=format_list(title)

            if image_url_list[i] is None:
                image_url_list[i]=[]

            if date_list[i] is None:
                date_list[i]=[]

            if price_list[i] is None:
                price_list[i]=[]
            else:
                price_list[i]=price_list[i].strip()

            data={
                'title' : title_list[i],
                'image-url' : image_url_list[i],
                'date' : date_list[i],
                'hour' : hour_list[i],
                'price':price_list[i],
                'address':address_list[i],
                'coordinates':address_coord_list[i],
                'description':description_list[i],
                'category':"cs"
            }
            i+=1
            list_data.append(data)

        with open(filename, 'a+') as f:   # Writing data in the file
            for data in list_data :
                app_json = json.dumps(data)
                f.write(app_json+"\n")

        ##construction du geojson grace au json créer juste au-dessus

        data = [json.loads(line) for line in open('events.json', 'r')]

        geojson = {
            "type": "FeatureCollection",
            "features": [
            {
                "type": "Feature",
                "properties" : d,
                "geometry" : {
                    "type": "Point",
                    "coordinates": d['coordinates'],
                    },

             } for d in data
             ]
        }
        

        for d in data:
            print(d['date'])
            # print(d['price'])
            # print(d['hour'])
            # print(d['address'])


        
        output = open("eventsGeoJson.json","w")

        json.dump(geojson,output,indent=4)


#fin hono
