# =============================================
# extract article using slug
# base URL https://www.bbc.com/urdu/
# =============================================

from bs4 import BeautifulSoup
import requests

HEADERS = ({'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) \
            AppleWebKit/537.36 (KHTML, like Gecko) \
            Chrome/90.0.4430.212 Safari/537.36',
            'Accept-Language': 'en-US, en;q=0.5'})


# Fetch HTML Content from the given link
def getHTMLContent(url):
   try:
       r = requests.get(url, headers=HEADERS)
       htmlContent = r.content
       soup = BeautifulSoup(htmlContent, "html.parser")
       return soup
   except:
       return 0

def extractFromTheSource(url):
    dict={}
    images=[]
    soup=getHTMLContent(url)

    if soup != 0:
        mainDiv = soup.find("div",{"id":"ppd"})
        ImgCol=mainDiv.find("div",{"id":"leftCol"})
        DescCol=mainDiv.find("div",{"id":"centerCol"})

        title=DescCol.find("span",{"id":"productTitle"}).text
        reviews=soup.find("div",{"id":"cm-cr-dp-review-list"}).findAll('div',recursive=False)
        nfr=len(reviews)
        rating=DescCol.find("span",{"id":"acrCustomerReviewText"}).text
        img=ImgCol.find("div",{"id":"imgTagWrapperId"}).findNext()['src']
        dict={"title":title,"imgSrc":img,"rating":rating,"reviews":nfr}
    return dict

def fetch(url):
    res=extractFromTheSource(url)
    return res
