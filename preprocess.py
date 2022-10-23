

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
import nltk

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


def parseJSON(object):
    try:
       
        text= f"{object['job']['title']} {object['job']['companyName']} {object['job']['location']} {object['detail']}" 
       
        return clean_text(text)
    except:
        return 0
    




def main(json):
    return parseJSON(json)
    