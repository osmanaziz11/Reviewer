# import modules
from bs4 import BeautifulSoup
import requests

HEADERS = ({'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) \
            AppleWebKit/537.36 (KHTML, like Gecko) \
            Chrome/90.0.4430.212 Safari/537.36',
            'Accept-Language': 'en-US, en;q=0.5'})

# Utility Functions 
def getIMG(container):
    try:
        return container.find("div",{"id":"imgTagWrapperId"}).findNext()['src']
    except:
        return ''

def getTitle(container):
    try:
        return container.find("span",{"id":"productTitle"}).text
    except:
        return ''

def getId(container):
    try:
        return container.find('table',{"id":"productDetails_detailBullets_sections1"}).find('td',class_='prodDetAttrValue').text
    except:
        return ''

def getRatingStars(container):
    try:
        return container.find('span',{"id":"acrPopover"}).text
    except:
        return ''

def getRatingNumber(container):
    try:
        return container.find('a',{"id":"acrCustomerReviewLink"}).text
    except:
        return ''

def getDesc(container):
    try:
        return container.find('div',{"id":"productDescription"}).find('p').text
    except:
        return ''



# Fetch HTML Content from the given link
def getHTMLContent(url):
   try:
       r = requests.get(url, headers=HEADERS)
       htmlContent = r.content
       soup = BeautifulSoup(htmlContent, "html.parser")
       return soup
   except:
       return 0


def parseHTML(HTML):
    data=[]
    if HTML != 0:
        try:
            mainDiv = HTML.find("div",{"id":"ppd"})
            idDiv=HTML.find("div",{"id":"productDetails2_feature_div"})
            descDiv=HTML.find("div",{"id":"productDescription_feature_div"})
            product={
                'id':getId(idDiv),
                'title':getTitle(mainDiv),
                'imgSrc':getIMG(mainDiv),
                'stars':getRatingStars(mainDiv),
                'rating':getRatingNumber(mainDiv),
                'desc':getDesc(descDiv),
            }
            data.append(product)
            return data
        except:
            return 0
    else:
        return 0


def Main(url):
    HTML=getHTMLContent(url)
    return parseHTML(HTML)
     
