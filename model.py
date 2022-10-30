
import random as random
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

def predict(jsonOBJ): 
    result=[0,1]
    predictRes=[]
    fakeUsers=[]
    realUsers=[]
    for item in jsonOBJ['data']:
        res=random.choice(result)
        if res==0:
            fakeUsers.append(item)
        else:
            realUsers.append(item)
        predictRes.append(res)

    return [{'result':int(sum(predictRes)/len(predictRes)*100), 'fakeUsers':fakeUsers,'reakUsers':realUsers}]


    
