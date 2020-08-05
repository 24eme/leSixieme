#!/usr/bin/env python
# -*- coding: utf-8 -*-
import scrapy
import json
import os
import requests
import datetime
from currency_converter import CurrencyConverter

filename='events.json'

if os.path.exists("events.json"):
    os.remove("events.json")

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
                taburls.append(u[2][:-1])     #le dernier caractère est ", on supprime donc le dernier caractère
                i=i+1

            urls.close()
            return(taburls)

        taburls=readLinkTxt('eventsLinks.txt')

        for url in taburls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        c=CurrencyConverter()
        list_data=[]
        url_list=response.request.url

       #on commence par définir les fonctions qui serviront au formatage des données

        def descrip(select):
            description=[]
            for data in select:
                cont= data.xpath('.//text()').extract();
                description=description+['\n']+cont
            return(description)

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

        def getDay(date):
            tabdays=['01','02','03','04','05','06','07',
            '08','09','10','11','12','13','14','15','16','17','18','19',
            '20','21','22','23','24','25','26','27','28','29','30','31','1','2','3','4','5','6','7','8','9']
            for d in tabdays:
                if d in date:
                    if (len(d))==1:
                        return ('0'+d)
                    return d
            return '00'

        def getMonth(date):
            dicomonth={'janvier': '01','Janvier':'01','janv':'01','février': '02','Février': '02','mars': '03','Mars': '03','avril': '04','Avril': '04','mai': '05','Mai': '05','juin': '06',
            'Juin': '06','juillet': '07','Juillet': '07','juil':'07','août': '08','Août': '08','septembre': '09','Septembre': '09','Sep':'09',
            'octobre': '10','Octobre': '10','novembre': '11','Novembre': '11','décembre': '12','Décembre': '12','Dec':'12',
            'January': '01', 'Feb': '02','March': '03','Mar':'03','April': '04','May': '05','June': '06'
            ,'July': '07','August': '08','Aug':'08','September': '09','sept':'09','setembro':'09','October': '10','outubro':'09','November': '11','December': '12','déc':'12'}
            for m in dicomonth:
                if m in date:
                    return dicomonth[m]
            return '00'

        def getYear(date):
            today=datetime.date.today()
            if str(today.year) in date:
                return str(today.year)
            elif str(today.year+1) in date:
                return str(today.year+1)
            elif str(today.year+2) in date:
                return str(today.year+2)
            else:
                return '0000'

        def format_date(date):
            if date is None:
                return 'Pas de date précisée'
            elif date=='Multiple Dates' or date=='Dates multiples':
                return 'Dates multiples'
            else:
                if type(date)==str:
                    year=getYear(date)
                    date=date.replace(year,'')
                    month=getMonth(date)
                    date=date.replace(month,'')
                    day=getDay(date)
                    date=date.replace(day,'')
                    d=day+'/'+month+'/'+year
                    return d
                return 'Pas de date précisée'

        def format_price(price):
            if price is None:
                price='Pas de prix précisé'
                return price
            else:
                price=price.strip()
            if price=='Gratuit' or price=='Free':
                price='Gratuit'
            else:
                price=price.split()
                if len(price)==1:
                    if price[0][0]=='€' or price[0][0]=='$' or price[0][0]=='R$' or price[0][0]=='£':
                        money=price[0][0]
                        price[0]=price[0][1:]
                        price.insert(0,money)
                    elif price[0][-1]=='€' or price[0][-1]=='$' or price[0][-1]=='R$' or price[0][-1]=='£':
                        money=price[0][-1]
                        price[0]=price[0][:-1]
                        price.insert(0,money)
                elif len(price)==2:
                    if price[1]=='€' or price[1]=='$' or price[1]=='R$' or price[1]=='£':
                        price[0], price[1] = price[1], price[0]
                elif len(price)==3:
                    if '–' in price:
                        ind=price.index('–')
                        if price[0][-1]=='€' or price[0][-1]=='$' or price[0][-1]=='R$' or price[0][-1]=='£':
                            money=price[0][-1]
                            price[0]=price[0][:-1]
                            price[ind+1]=price[ind+1][:-1]
                            price.insert(0,money)
                            price.insert(ind+1,money)
                    else:
                        if price[0]=='€' or price[0]=='$' or price[0]=='R$' or price[0]=='£':
                            price[2]=price[1]+price[2]
                            price.pop(1)
                        elif price[-1]=='€' or price[-1]=='$' or price[-1]=='R$' or price[-1]=='£':
                            price[0]=price[0]+price[1]
                            price.pop(1)
                            money=price[-1]
                            price.pop(-1)
                            price.insert(0,money)
                elif len(price)==5:
                    ind=price.index('–')
                    if price[1]=='€' or price[1]=='$' or price[1]=='R$' or price[1]=='£':
                        price[0], price[1] = price[1], price[0]
                        price[ind+1], price[ind+2] = price[ind+2], price[ind+1]
            price_temp=price
            price=''
            for char in price_temp:
                price=price+char
            price=price.split(' ')
            return price


        def convert_price(price):
            if price is None or price[0] is None:
                return price
            elif price[0]=='Gratuit' or price[0]=='Free':
                return price
            elif len(price[0])>0 and (price[0][0]=='$' or price[0][0]=='R' or price[0][0]=='£'):
                if ',' in price[0]:
                    price[0]=price[0].split('.')
                    temp=price[0]
                    price[0]=''
                    for nb in temp:
                        price[0]+=nb
                if '–' in price[0]:
                        price[0]=price[0].split('–')
                        found=False
                        ind=0
                        i=0
                        while found==False:
                          if price[0][0][i] in ['0','1','2','3','4','5','6','7','8','9']:
                              ind=i
                              found=True
                          i+=1
                        money=price[0][0][:ind]
                        for j in range (len(price[0])):
                            price[0][j]=price[0][j][ind:]
                            if ',' in price[0][j]:
                                price[0][j]=price[0][j].replace(",",".")
                        if money=='$':
                            for k in range (len(price[0])):
                                price[0][k]=c.convert(price[0][k],'USD','EUR')
                                price[0][k]='€'+str(price[0][k])
                                point=price[0][k].index('.')
                                price[0][k]=price[0][k][:point+3]
                        elif money=='£':
                            for k in range (len(price[0])):
                                price[0][k]=c.convert(price[0][k],'GBP','EUR')
                                price[0][k]='€'+str(price[0][k])
                                point=price[0][k].index('.')
                                price[0][k]=price[0][k][:point+3]
                        elif money=='R$':
                            for k in range (len(price[0])):
                                price[0][k]=c.convert(price[0][k],'BRL','EUR')
                                price[0][k]='€'+str(price[0][k])
                                point=price[0][k].index('.')
                                price[0][k]=price[0][k][:point+3]
                        price[0].insert(1,'–')
                        price_temp=price[0]
                        price[0]=''
                        for l in range(len(price_temp)):
                            price[0]+=price_temp[l]
                else:
                    found=False
                    ind=0
                    i=0
                    while found==False:
                        if price[0][i] in ['0','1','2','3','4','5','6','7','8','9']:
                            ind=i
                            found=True
                        i+=1
                    money=price[0][:ind]
                    price[0]=price[0][ind:]
                    if money=='$':
                        price[0]=c.convert(price[0],'USD','EUR')
                        price[0]='€'+str(price[0])
                        point=price[0].index('.')
                        price[0]=price[0][:point+3]
                    elif money=='£':
                        price[0]=c.convert(price[0],'GBP','EUR')
                        price[0]='€'+str(price[0])
                        point=price[0].index('.')
                        price[0]=price[0][:point+3]
                    elif money=='R$':
                        price[0]=c.convert(price[0],'BRL','EUR')
                        price[0]='€'+str(price[0])
                        point=price[0].index('.')
                        price[0]=price[0][:point+3]
                price[0]+=' (Prix indicatif)'
                return price
            else:
                return price

        def format_hour(hour):
            if hour is None:
                hour_form=['Pas d\'heure précisée']
                return hour_form
            else:
                hour=hour.split()
                hour_form=[]
                for i in range(len(hour)):
                        if ':' in hour[i] or hour[i]=='PM':
                           hour_form.append(hour[i])
                for wrd in hour_form:
                    if not wrd[0] in ['0','1','2','3','4','5','6','7','8','9'] and not wrd=='PM':
                        hour_form.pop(hour_form.index(wrd))
                if 'PM' in hour_form:
                    if len(hour_form)==2:
                        ind=hour_form[0].index(':')
                        h=hour_form[0][:ind]
                        hour_form[0]=hour_form[0][ind:]
                        h=str(int(h)+12)
                        hour_form[0]=h+hour_form[0]
                        hour_form.pop(-1)
                    elif len(hour_form)==4:
                        ind1=hour_form[0].index(':')
                        ind2=hour_form[2].index(':')
                        h1=hour_form[0][:ind1]
                        h2=hour_form[2][:ind2]
                        hour_form[0]=hour_form[0][ind1:]
                        hour_form[2]=hour_form[2][ind2:]
                        h1=str(int(h1)+12)
                        h2=str(int(h2)+12)
                        hour_form[0]=h1+hour_form[0]
                        hour_form[2]=h2+hour_form[2]
                        hour_form.pop(1)
                        hour_form.pop(-1)
                        hour_form.insert(1,'–')
                elif len(hour_form)==2:
                   hour_form.insert(1,'–')
                hour_temp=hour_form
                hour_form=''
                for tim in hour_temp:
                    hour_form+=tim
                hour_form=hour_form.split()
                return hour_form
            return hour_form

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

        def give_arrondissement(address):
            tabaddress=address.split()
            if len(tabaddress)<2:
                return None
            if len(tabaddress[-2])!=5:
                return None
            arrondissement=tabaddress[-2]
            return arrondissement

        def give_category(description):
            tabFestival = ['Festival']
            tabALpha = ['A','B','C','D','E','F','G','H','I','J','L','K','M','N','O','P']
            tabCulturel = ['Culture','Monuments','culturelles','culturel','culturels','conference']
            tabLoisirs = ['réalité virtuelle','Loisirs','humour','Apéro','Apéros','fête','rire','artistes','artiste','soirée']

            for word in tabCulturel:
                if word in description:
                    cat = 'Culturel'
                    return cat
            for word in tabLoisirs:
                if word in description:
                    cat= 'Loisirs'
                    return cat

            for word in tabFestival:
                if word in description:
                    cat = 'Festival'
                    return cat


        #on récolte les données brutes sur le site evenbrite

        main=response.xpath('//div[@class="event-listing__body l-sm-pad-top-0"]')
        title_list =main.xpath('.//h1[@class="listing-hero-title"]/text()').extract()
        image_url_list=main.xpath('.//picture/@content').extract_first()
        date_list=main.xpath('.//p[@class="js-date-time-first-line"]/text()').extract_first()
        hour_list=main.xpath('.//p[@class="js-date-time-second-line"]/text()').extract_first()
        all_para=main.xpath('.//div[@class="structured-content-rich-text structured-content__module l-align-left l-mar-vert-6 l-sm-mar-vert-4 text-body-medium"]/p')
        price_list=main.xpath('.//div[@class="js-display-price"]/text()').extract_first()
        address_list=main.xpath('.//div[@class="event-details__data"]/p/text()').extract()

        #on formate les données récoltées ppur ne garder que les informations utiles avec une syntaxe uniforme

        description_list=(descrip(all_para))
        description_list=format_descrip(description_list)
        address_list=format_add(address_list)
        price_list=format_price(price_list)
        price_list=convert_price(price_list)
        hour_list=format_hour(hour_list)
        date_list=format_list(date_list)
        image_url_list=format_list(image_url_list)
        url_list=format_list(url_list)
        address_coord_list=[]
        for address in address_list:
            coord=coord(address)
            address_coord_list.append(coord)
        arrondissement_list=[]
        for address in address_list:
            arr=give_arrondissement(address)
            arrondissement_list.append(arr)
        category_list=[]
        for description in description_list:
            cat=give_category(description)
            category_list.append(cat)

        #on créé un json contenant les données formatées

        i=0
        for title in title_list:
            if title is None:
                title=[]
            else :
                title=format_list(title)

            if image_url_list[i] is None:
                image_url_list[i]=[]

            if date_list[i] is None:
                date_list[i]=[]

            if title_list[i]!=None and description_list[i]!=None and address_list[i]!=None and description_list[i]!='' and str(address_coord_list[0][0]).startswith('2') and str(address_coord_list[0][1]).startswith('48') and arrondissement_list[i][0:2]=='75':
                data={
                    'url':url_list[i],
                    'title' : title_list[i],
                    'image' : image_url_list[i],
                    'date' : format_date(date_list[i]),
                    'hour' : hour_list[i],
                    'price':price_list[i],
                    'address':address_list[i],
                    'cp':arrondissement_list[i],
                    'coordinates':address_coord_list[i],
                    'description':description_list[i],
                    'category':category_list[i],
                }
                i+=1
                list_data.append(data)

        with open(filename, 'a+') as f:
            for data in list_data :
                app_json = json.dumps(data)
                f.write(app_json+"\n")

        #on construit un geojson grâce au json créé juste au-dessus

        data = [json.loads(line) for line in open('events.json', 'r')]
        geojson = {
            "type": "FeatureCollection",
            "features": [
            {
                "type": "Feature",

                "properties" : {**{'id':data.index(d)},**d},

                "geometry" : {
                    "type": "Point",
                    "coordinates": d['coordinates'],
                    },

             } for d in data
             ]
        }

        #for d in data:

        # for d in data:

            #print(d['url'])
            #print(d['address'])
            # print(d['code postal'])
            #print(d['title'])
            #print(d['price'])
            #print(d['hour'])



        output = open("../../public/js/eventsGeoJson.json","w")

        json.dump(geojson,output,indent=4)
