# import modules
from bs4 import BeautifulSoup
import requests

HEADERS = ({'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) \
            AppleWebKit/537.36 (KHTML, like Gecko) \
            Chrome/90.0.4430.212 Safari/537.36',
            'Accept-Language': 'en-US, en;q=0.5'})

# Utility Functions 
def getUser(container):
    try:
        return container.find("div",{"id":"imgTagWrapperId"}).findNext()['src']
    except:
        return ''

def getUserLink(container):
    try:
        return container.find("span",{"id":"productTitle"}).text
    except:
        return ''

def getTitle(container):
    try:
        return container.find('table',{"id":"productDetails_detailBullets_sections1"}).find('td',class_='prodDetAttrValue').text
    except:
        return ''

def getLocationDate(container):
    try:
        return container.find('span',{"id":"acrPopover"}).text
    except:
        return ''

def getRatingStars(container):
    try:
        return container.find('a',{"id":"acrCustomerReviewLink"}).text
    except:
        return ''

def getVerifyPurchase(container):
    try:
        return container.find('div',{"id":"productDescription"}).find('p').text
    except:
        return ''

def getReview(container):
    try:
        return container.find('div',{"id":"productDescription"}).find('p').text
    except:
        return ''



# Fetch HTML Content from the given link
def getHTMLContent(id):
   try:
       r = requests.get(f"https://www.amazon.com/product-reviews/{id}/ref=cm_cr_othr_mb_show_all_top?ie=UTF8&reviewerType=all_reviews", headers=HEADERS)
       htmlContent = r.content
       soup = BeautifulSoup(htmlContent, "html.parser")
       return soup
   except:
       return 0


def parseHTML(HTML):
    data=[]
    if HTML != 0:
        try:
            mainDiv = HTML.find("div",{"id":"cm_cr-review_list"})
            reviewsContainer=mainDiv.findAll('div',class_="aok-relative")
                mainDiv
            return data
        except:
            return 0
    else:
        return 0


def Main(id):
    HTML=getHTMLContent(id)
    return parseHTML(HTML)
     
