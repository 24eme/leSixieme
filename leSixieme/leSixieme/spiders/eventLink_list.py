import scrapy
import json
import os

filename = 'eventsLinks.txt'

class IntroSpider(scrapy.Spider):
    name = "eventLink"

    def start_requests(self):
        url='http://eventbrite.fr/d/france--paris/paris//'
        yield scrapy.Request(url=url, callback=self.parse)


    def parse(self,response):
        list_data=[]
        eventLink_list = response.xpath('.//div[@class="eds-event-card-content__content-container eds-l-pad-right-2"]/div[@class="eds-event-card-content__content"]/div[@class="eds-event-card-content__content__principal"]/div[@class="eds-event-card-content__primary-content"]/a/@href').extract()
        i=0;
        for eventLink in eventLink_list:
            data='"url : '+eventLink_list[i]+'"'
            i+=1
            list_data.append(data)


        # supprime le json s'il existe déjà

        if os.path.exists("eventsLinks.txt"):
            os.remove("eventsLinks.txt")

        with open(filename, 'a+') as f:   # Writing data in the file
            for data in list_data :
                f.write(data+'\n')


#pour lancer dans le terminal :  cd leSixieme/leSixieme$ scrapy crawl eventLink
