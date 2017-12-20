from flask import Flask, jsonify, request
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config['MONGO_DBNAME'] = 'an-api-per-day'
app.config['MONGO_URI'] = 'mongodb://<dbuser>:<dbpassword>@ds161016.mlab.com:61016/an-api-per-day'
mongo = PyMongo(app)

@app.route('/posts', methods=['GET'])
def PostList():
    posts = mongo.db.posts
    output = []
    for p in posts.find():
        output.append({'title': p['title'], 'content': p['content']})
    return jsonify({'result': output})
