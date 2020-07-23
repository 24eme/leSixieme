import scrapy
import json
import requests

filename = "book.json"  # To save store data

class IntroSpider(scrapy.Spider):
    name = "book_spider"     # Name of the scraper

    def start_requests(self):
        urls = [
            'https://www.eventbrite.fr/d/online/community--events/?page={x}'.format(x=x) for x in range(1, 2)   # x denotes page number
        ]

        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        list_data=[]

        book_list = response.css('article.product_pod > h3 > a::attr(title)').extract()  # accessing the titles
        link_list = response.css('article.product_pod > h3 > a::attr(href)').extract()  # accessing the titles
        price_list = response.css('article.product_pod > div.product_price > p.price_color::text').extract()
        image_link = response.css('article.product_pod > div.image_container > a > img::attr(src)').extract()  # accessing the titles

        i=0;
        for book_title in book_list:
            data={
                'name' : book_title,
                'date' : image_link[i],
                'address' : price_list[i],
                'category' : image_link[i],
                'url' : link_list[i]
            }
            i+=1
            list_data.append(data)

        with open(filename, 'w') as f:   # Writing data in the file
            for data in list_data :
                app_json = json.dumps(data)
                f.write(app_json+"\n")

        data = [json.loads(line) for line in open('book.json', 'r')]





        # Remplacer par adresse
        address = event_address[i]
        tabAddress = address.split(' ')
        response = requests.get("https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port")
        result= response.json()
        lon = result['features'][0]['geometry']['coordinates'][0]
        lat = result['features'][0]['geometry']['coordinates'][1]
#          Fin pour API pour addresse

        geojson = {
            "type": "FeatureCollection",
            "features": [
            {
                "type": "Feature",
                "properties": {
                        "name": d["long"],
                        "address": d["long"],
                        "field": d["long"],
                        "popupContent": d["long"]
                },
                "geometry" : {
                    "type": "Point",
                    "coordinates": [d["long"], d["lat"]],
                    },
                "properties" : d,
             } for d in data]
        }

        output = open("scops.json","w")

        json.dump(geojson,output,indent=4)
