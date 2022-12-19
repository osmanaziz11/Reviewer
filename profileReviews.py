# import modules
from bs4 import BeautifulSoup,SoupStrainer
import requests
from selenium.webdriver import  Chrome
from selenium.webdriver import  ChromeOptions

# Selenium Configuration
options=ChromeOptions()
options.headless=False
options.add_argument('--log-level=1')
user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
options.add_argument(f'user-agent={user_agent}')
driver = Chrome(executable_path='C:\Program Files (x86)\chromedriver.exe',options=options)

session_object = requests.Session()

HEADERS = ({'User-Agent':
            'Mozilla/5.0 (Windows NT 11.0; Win64; x64) \
            AppleWebKit/537.36 (KHTML, like Gecko) \
            Chrome/90.0.4430.212 Safari/537.36',
            'Accept-Language': 'en-US, en;q=0.5'})

baseURL=''
# Utility Functions 
def getTitle(container):
    try:
        return container.find("h1").text
    except:
        return 0

def getText(container):
    try:
        return container.find("p").text
    except:
        return 0

# def getMainContainer(HTML):
#     try:
#         return HTML.find("div",{"id":"customer-profile-timeline"})
#     except:
#         return 0

def getContainer(main):
    try:
        return main.find("div",{"id":"profile-at-card-container"})
    except:
        return 0

def getReviewsContainer(main):
    try:
        return main.findAll("div",class_="profile-at-review-box")
    except:
        return 0

def getCounter(container):
    try:
        return container.find("div",{"id":"profile-at-feed"}).find("div",class_="impact-text").text
    except:
        return 0


# Fetch HTML Content from the given link
def getHTMLContent(url):
   try:
    #    htmlContent = session_object.get(url, headers=HEADERS)
    #    strainer = SoupStrainer("div",{"id":"customer-profile-timeline"})
       driver.get(url)
       soup = BeautifulSoup(driver.page_source, 'lxml')
    #    soup = BeautifulSoup(htmlContent.content, "lxml")
       return soup
   except:
       return 0


def parseHTML(HTML):
    bulkReviews=[]
    if HTML != 0:
        try:
           
            # MainContainer=getMainContainer(HTML)  # Retreive the main container
            counter=int(getCounter(HTML)/2) # Contain number of reviews
            container=getContainer(HTML) # Retreive the reviews container
            review=getReviewsContainer(container) # List of reviews container
            iterate=(review.length) if (counter>review.length) else int(review.length/2)
            for i in range(0,iterate):
                review={
                    'title':getTitle(review[i]),
                    'review':getText(review[i]),
                }
            bulkReviews.append(review)
            return bulkReviews
        except:
            return 0
    else:
        return 0


def Main(url):
    HTML=getHTMLContent(url)
    print(HTML)
    # return parseHTML(HTML,url)
     
Main("https://www.amazon.co.uk/gp/profile/amzn1.account.AE67KHQMG3O5C2MUCCKPHH7BJ4QQ/ref=cm_cr_arp_d_gw_btm?ie=UTF8")