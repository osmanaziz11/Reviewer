
from flask import Flask,jsonify,request
from flask_cors import CORS

import Boards.Amazon.review as review

app = Flask(__name__)
CORS(app)

# ==================
# Routes

@app.route('/api/review/amazon/',methods=['POST'])

def extractJobs():
    resp=review.fetch(request.json['url'])
    if not resp:
        return jsonify({"status": 0})
    else:
        return jsonify({ "status": 1, "result": resp})

app.run(debug=True)