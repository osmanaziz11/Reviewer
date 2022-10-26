
from flask import Flask,jsonify,request

import Boards.Amazon.reviews as reviews
import Boards.Amazon.productDetail as product

app = Flask(__name__)

# ==================
# Application Endpoints 

# Extract All Reviews relevant to the Product
@app.route('/api/reviews',methods=['POST'])
def extractReviews():
    resp=reviews.Main(request.json)
    if resp != 0:
        return jsonify({"status":1,"reviews":resp})
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

app.run(debug=True)