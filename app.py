
from flask import Flask,jsonify,request
from flask_cors import CORS

import Boards.Amazon.reviews as reviews
import Boards.Amazon.productDetail as product

app = Flask(__name__)
CORS(app)

# ==================
# Application Endpoints 

# Extract All Reviews relevant to the Product
@app.route('/api/reviews/<id>/',methods=['GET'])
def extractReviews(id):
    resp=reviews.Main(id)
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