from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
app.config['MONGO_DBNAME'] = 'an-api-per-day'
app.config['MONGO_URI'] = 'mongodb://<dbusername>:<dbpassword>@ds161016.mlab.com:61016/an-api-per-day'
mongo = PyMongo(app)
CORS(app)

@app.route('/posts', methods=['GET'])
def PostList():
    posts = mongo.db.posts
    output = []
    for p in posts.find():
        output.append({'title': p['title'], 'content': p['content']})
    return jsonify({'result': output})
