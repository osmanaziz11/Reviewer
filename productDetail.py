# import modules
from bs4 import BeautifulSoup,SoupStrainer
import requests
import time

session_object = requests.Session()

HEADERS = ({'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) \
            AppleWebKit/537.36 (KHTML, like Gecko) \
            Chrome/90.0.4430.212 Safari/537.36',
            'Accept-Language': 'en-US, en;q=0.5'})

baseURL=''
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

def getID(baseURL):
    try:
        index=baseURL.find('/dp/')
        return baseURL[index+4:index+14]
    except:
        return 0

def getExtension(baseURL):
    try:
        check=''
        for index in range(0,len(baseURL)):
            if index>7:
                if baseURL[index]=='/':
                    break
                else:
                    check=check+baseURL[index]
        return check
    except:
        return 0


    

# Fetch HTML Content from the given link
def getHTMLContent(url):
   try:
       htmlContent = session_object.get(url, headers=HEADERS)
       strainer = SoupStrainer("div",{"id":"ppd"})
       soup = BeautifulSoup(htmlContent.content, "lxml",parse_only=strainer)
       return soup
   except:
       return 0


def parseHTML(HTML,url):
    data=[]
    if HTML != 0:
        try:
            product={
                'id':getID(url),
                'baseURL':getExtension(url),
                'title':getTitle(HTML),
                'imgSrc':getIMG(HTML),
            }
            data.append(product)
            return data
        except:
            return 0
    else:
        return 0


def Main(url):
    HTML=getHTMLContent(url)
    return parseHTML(HTML,url)
     
