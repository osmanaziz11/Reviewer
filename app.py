
from random import random
from flask import Flask,jsonify,request
from flask_cors import CORS


import Boards.Amazon.reviews as reviews
import Boards.Amazon.productDetail as product
import model as model
import preprocess as pp

app = Flask(__name__)
CORS(app)

# ==================
# Application Endpoints 

# Extract All Reviews relevant to the Product
@app.route('/api/reviews',methods=['POST'])
def extractReviews():
    resp=reviews.Main(request.json)
    if resp != 0:
        return jsonify({"status":1,"body":resp})
    else:
        return jsonify({"status": 0})

# Extract Product Detail 
@app.route('/api/pd',methods=['POST'])
def productDetail():
    resp=product.Main(request.json['url'])
    if resp != 0:
        return jsonify({"status":1,"product":resp})
    else:
        return jsonify({"status": 0})

# Cleaning 
# 1-FilterArray 
@app.route('/api/filterArray',methods=['POST'])
def filtering():
    resp=pp.FilterArray(request.json)
    if resp != 0:
        return jsonify({"status":1,"pp":resp})
    else:
        return jsonify({"status": 0})
        
# 2-Preprocessing
@app.route('/api/pp',methods=['POST'])
def preprocess():
   
    resp=pp.preprocess(request.json)
    if resp != 0:
        return jsonify({"status":1,"pp":resp})
    else:
        return jsonify({"status": 0})

# Predict  
@app.route('/api/predict',methods=['POST'])
def predict():
    
    resp=model.predict(request.json)
    if resp != 0:
        return jsonify({"status":1,"body":resp})
    else:
        return jsonify({"status": 0})

app.run(debug=True)


