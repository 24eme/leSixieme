import scrapy
import json

filename = 'export.json'

class IntroSpider(scrapy.Spider):
    name = "eventLink"

    def start_requests(self):
        url='https://www.eventbrite.fr'
        yield scrapy.Request(url=url, callback=self.parse)

#eds-event-card-content__action-link class pour les liens

    def parse(self,response):
        list_data=[]
        eventLink_list = response.css('eds-event-card-content__action-link > h3 > a::attr(title)').extract()

        for eventLink in eventLink_list:
            data=[eventLink_list[i]]
            i=i+1
            list_data.append(data)

        # print(list_data)
        with open(filename, 'a+') as f:   # Writing data in the file
            for data in list_data :
                app_json = json.dumps(data)
                f.write(app_json+"\n")
