# import modules
import random as random
from bs4 import BeautifulSoup, SoupStrainer
import requests
from googletrans import Translator
import time

session_object = requests.Session()
translator = Translator()

HEADERS = ({'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) \
            AppleWebKit/537.36 (KHTML, like Gecko) \
            Chrome/90.0.4430.212 Safari/537.36',
            'Accept-Language': 'en-US, en;q=0.5'})


# Utility Functions 

def getName(container):
    try:
        return container.find('div',class_='a-row').find('div',class_='a-profile-content').text
    except:
        0
        
def getTitle(container):
    try:
        res=container.find('span',class_='review-title-content')
        return container.find('a',class_='review-title-content').text if res == None else res.text
    except:
        0

def getStatus(container):
    try:
        return 1
    except:
        0

def checkLang(text):
    try:
        return translator.detect(text).lang
    except:
        return 'en'

def getReview(container,obj):
    try:
        main=container.find('div',class_='a-spacing-small')
        # check=main.find('span',class_='a-declarative')
        # if check != None:
        #      # Going for next page
        #     r = requests.get(f"https://{obj['url']}{check.find('a')['href']}", headers=HEADERS)
        #     htmlContent = r.content
        #     soup = BeautifulSoup(htmlContent, "html.parser")
        #     text=soup.find('div',class_='cm_cr-review_list').find('div',class_="review-text").text
        #     return {'Text':text,'lang':checkLang(text)}
        # else:
        #     reviewText=main.find('div',class_='review-text-sub-contents')
        #     a=main.find('div',class_='review-text-content').text if reviewText == None else reviewText.text
        return {'Text':main.text,'lang':checkLang(main.text)}
    except:
        0
def getLink(container,obj):
    return f"https://{obj['url']}{container.find('a')['href']}"

def get_number_of_reviews(obj):
    temp=''
    numbers=''
    try:
        htmlContent = session_object.get(f"https://{obj['url']}/product-reviews/{obj['id']}/ref=cm_cr_dp_d_show_all_btm?ie=UTF8&reviewerType=all_reviews&pageNumber=1", headers=HEADERS)
        strainer = SoupStrainer("div",{"id":"filter-info-section"})
        soup = BeautifulSoup(htmlContent.content, "lxml",parse_only=strainer)
        text = soup.text
        for char in text:
            if char!=' ' and char!='\n':
                temp=temp+char
        for index in range(0,len(temp)):
            if index>temp.find('ratings,')+7:
                if temp[index]!='w':
                    numbers=numbers+temp[index]
                else:
                    break
        return numbers.replace(',','')
    except:
        return 0

# Fetch HTML Content from the given link
def getHTMLContent(obj,page):
   try:
       htmlContent = session_object.get(f"https://{obj['url']}/product-reviews/{obj['id']}/ref=cm_cr_dp_d_show_all_btm?ie=UTF8&reviewerType=all_reviews&pageNumber={page}", headers=HEADERS)
       strainer = SoupStrainer("div",{"id":"cm_cr-review_list"})
       soup = BeautifulSoup(htmlContent.content, "lxml",parse_only=strainer)
       return soup
   except:
       return 0

def parseHTML(HTML,obj):
    data=[]
    if HTML != 0:
        try:
            mainDiv = HTML.findAll('div',class_='aok-relative')
            for container in mainDiv:
                data.append({
                "username": getName(container),
                "vp": getStatus(container),
                "title": getTitle(container),
                "review": getReview(container,obj),
                "link": getLink(container,obj),
            })

            return data
        except:
            return 0
    else:
        return 0


def Main(obj):
#    obj={
#     url:'www.example.com',
#     id:'B*******'
#    }
    pageData=[]
    pages=1
    num=int(get_number_of_reviews(obj))
    if num>10:
        if isinstance(num/10,float):
            pages=int(num/10)+1
        else:
            pages=num/10
    
    if pages>0:
        for i in range(1,pages+1):
            HTML=getHTMLContent(obj,i)  
            res=parseHTML(HTML,obj)
            pageData.append(res)
           
    return pageData