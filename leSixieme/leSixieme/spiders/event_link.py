import scrapy
import json
import os

filename='event.json'

if os.path.exists("event.json"):
    os.remove("event.json")

filename = "event.json"

class SpiderSpider(scrapy.Spider):
    name = 'events'
# =============================================================================
#     allowed_domains = ['eventbrite.co.uk/e/fashion-masterclass-paris-tickets-110725982394?aff=ebdssbdestsearch']
#     start_urls = ['https://www.eventbrite.co.uk/e/fashion-masterclass-paris-tickets-110725982394?aff=ebdssbdestsearch']
# =============================================================================


    def start_requests(self):
#hono
        def readLinkTxt(filename):
            urls= open(filename)
            contenu = urls.readlines()
            taburls=[]
            i=0
            while(i<len(contenu)):
                u=contenu[i].split()
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
        image_url_list=main.xpath('.//picture/@content').extract()
        date_list=main.xpath('.//p[@class="js-date-time-first-line"]/text()').extract()
        heure_list=main.xpath('.//p[@class="js-date-time-second-line"]/text()').extract()


        def descrip(select):
            description=[]
            for data in select:
                cont= data.xpath('.//text()').extract();
                description=description+['\n']+cont
            return(description)

        all_para=main.xpath('.//div[@class="structured-content-rich-text structured-content__module l-align-left l-mar-vert-6 l-sm-mar-vert-4 text-body-medium"]/p')

        description_list=(descrip(all_para))



        prix_list=main.xpath('.//div[@class="js-display-price"]/text()').extract_first()
        adresse_list=main.xpath('.//div[@class="event-details__data"]/p/text()').extract()

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
            adresse=''
            adresse_list=[]
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
                    adresse=adresse+tab_add[p]
                adresse_list.append(adresse)
                return adresse_list
            else:
                return tab_add

        def format_list(objet):
            liste=[]
            liste.append(objet)
            return liste

        description_list=format_descrip(description_list)

        adresse_list=format_add(adresse_list)
        prix_list=format_list(prix_list)


        i=0
        for title in title_list:
            data={
                'title' : title_list[i],
                'image-url' : image_url_list[i],
                'date' : date_list[i],
                'heure' : heure_list[i],
                'prix':prix_list[i],
                'adresse':adresse_list[i],
                'description':description_list[i]
            }

            if heure_list[i] is None:
                heure_list[i]=[]
            else:
                heure_list[i]=heure_list[i].replace("CEST","")
                heure_list[i]=format_list(heure_list[i])

            if title_list is None:
                title_list=[]
            else :
                title_list=format_list(title_list)

            if image_url_list[i] is None:
                image_url_list[i]=[]
            else :
                image_url_list[i]=format_list(image_url_list[i])

            if date_list[i] is None:
                date_list[i]=[]
            else :
                date_list[i]=format_list(date_list[i])

            if prix_list[i] is None:
                prix_list[i]=[]
            else:
                print(type(prix_list))
                prix_list[i]=prix_list[i].strip()
                prix_list[i]=format_list(prix_list[i])
            i+=1
            list_data.append(data)




        with open(filename, 'a+') as f:   # Writing data in the file
            for data in list_data :
                app_json = json.dumps(data)
                f.write(app_json+"\n")

#fin hono
