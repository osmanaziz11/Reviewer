
import random as random
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
import nltk
import json

# nltk.download('stopwords')
# nltk.download("punkt")

ps = PorterStemmer()
english_stopwords = stopwords.words('english')

def tokenize(text):  # convert text into tokens
    return word_tokenize(text.lower())

def clean_text(text): # expecting tokenize sentence
    try:
        tokens=tokenize(text)
        filterText=''
        for token in tokens:
            if token not in english_stopwords and token.isalnum() and not token.isnumeric():
                filterText+=ps.stem(token)+' '
        return filterText  
    except:
        return 0
 

def concatArr(obj):
    # newArr=[[{},{}],[{}],[{},{},{}]]
    try:
        newArr=[]
        for i in range(0,len(obj)):
            for item in obj[i]: 
                newArr.append(item)
        return newArr
    except:
        return 0

def filterArr(obj,n,l):
    newArr=[]
    a=0
    for i in range(0,len(obj)):
        if obj[i]['review']['lang']==l.lower():
            a=a+1
            if a<=int(n):
                newArr.append(obj[i])
            else:
                continue
    return newArr

def FilterArray(jsonOBJ):
    try:
        arr=concatArr(jsonOBJ['data'])
        cleanArr=filterArr(arr,jsonOBJ['allowReview'],jsonOBJ['allowLang'])
        return cleanArr
    except:
        return 0
  
def preprocess(jsonOBJ):
    try:
        for item in jsonOBJ['data']:
            item['review']=clean_text(item['review']['Text']+' '    +item['title'])
            del item['title']
        return jsonOBJ['data']   
    except:
        return 0
