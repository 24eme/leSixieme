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
        
        def format_add(tab_add):
            long=len(tab_add)
            found = False
            index=0
            i=0
            adresse=''
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
            return adresse
            
        
        description=format_descrip(description)
        adresse=format_add(adresse)
            
        
        print(titre)
        print(image_url)
        print(date)
        
        if heure is None:
            print('Pas d\'heure précisée')
        else:
            print(heure.replace("CEST",""))
        
        print(description)
        print(prix.strip())
        print(adresse)
        
        