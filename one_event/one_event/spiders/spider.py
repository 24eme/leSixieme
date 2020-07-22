import scrapy


class SpiderSpider(scrapy.Spider):
    name = 'one_event'
    
    def start_requests(self):
        url = 'https://www.eventbrite.co.uk/e/fashion-masterclass-paris-tickets-110725982394?aff=ebdssbdestsearch'
        yield scrapy.Request(url=url, callback=self.parse)
    

    def parse(self, response):
        main=response.xpath('//div[@class="event-listing__body l-sm-pad-top-0"]')
        
        titre=main.xpath('.//h1[@class="listing-hero-title"]/text()').extract_first()
        image_url=main.xpath('.//picture/@content').extract_first()
        date=main.xpath('.//p[@class="js-date-time-first-line"]/text()').extract_first()
        heure=main.xpath('.//p[@class="js-date-time-second-line"]/text()').extract_first()
        
        def descrip(select):
            description=[]
            for data in select:
                cont= data.xpath('.//text()').extract();
                description=description+['\n']+cont
            return(description)

        all_para=main.xpath('.//div[@class="structured-content-rich-text structured-content__module l-align-left l-mar-vert-6 l-sm-mar-vert-4 text-body-medium"]/p')
        
        description=(descrip(all_para))
        
        prix=main.xpath('.//div[@class="js-display-price"]/text()').extract_first()
        adresse=main.xpath('.//div[@class="event-details__data"]/p/text()').extract()
        
        def format_descrip(tab_descrip):
            long=len(tab_descrip)
            description=''
            for i in range (long):
                description=description+tab_descrip[i]
            return description
        
        description=format_descrip(description)
            
        
        print(titre)
        print(image_url)
        print(date)
        print(heure)
        print(description)
        print(prix)
        print(adresse)
        print(type(description))
        