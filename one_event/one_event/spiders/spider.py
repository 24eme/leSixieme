import scrapy


class SpiderSpider(scrapy.Spider):
    name = 'one_event'
    allowed_domains = ['eventbrite.fr/e/billets-coding-cake-paris-86781705417?aff=ebdssbdestsearch']
    start_urls = ['http://eventbrite.fr/e/billets-coding-cake-paris-86781705417?aff=ebdssbdestsearch/']

    def parse(self, response):
        main=response.xpath('//div[@class="event-listing__body l-sm-pad-top-0"]')
        
        titre=main.xpath('.//h1[@class="listing-hero-title"]/text()').extract_first()
        image_url=main.xpath('.//picture/@content').extract_first()
        date=main.xpath('.//p[@class="js-date-time-first-line"]/text()').extract_first()
        heure=main.xpath('.//p[@class="js-date-time-second-line"]/text()').extract_first()

        all_para=main.xpath('.//div[@class="structured-content-rich-text structured-content__module l-align-left l-mar-vert-6 l-sm-mar-vert-4 text-body-medium"]/p')
        description=''
        
        for para in all_para:
            cont= para.xpath('.//text()').extract_first();
            description=description+'\n'+cont
        
        prix=main.xpath('.//div[@class="js-display-price"]/text()').extract_first()
        adresse=main.xpath('.//div[@class="event-details__data"]/text()').extract_first()
        
        print(titre)
        print(image_url)
        print(date)
        print(heure)
        print(description)
        print(prix)
        print(adresse)