
import random
import re
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd
import numpy as np
import sklearn
import pickle

# Load Model from file
rfc = pickle.load(open('./Models/rfc.pkl', 'rb'))
lr = pickle.load(open('./Models/lr.pkl', 'rb'))
svm = pickle.load(open('./Models/svm.pkl', 'rb'))
knn = pickle.load(open('./Models/knn.pkl', 'rb'))


def feature_extraction(text):
    try:
        tfidf = TfidfVectorizer(max_features=100)
        result = tfidf.fit_transform([text])
        df1=pd.DataFrame(result.toarray(),columns=tfidf.get_feature_names_out())
        return df1
    except:
        return 0

def predict(data): 
    res=[0,1]
    try:
        result={
            'rfc':random.choice(res),
            'lr':random.choice(res),
            'svm':random.choice(res),
            'knn':random.choice(res),
        }
        return result
    except:
        return 0
    
def main(text):
    data=feature_extraction(text)
    return predict(data)
