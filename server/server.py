import os
from flask import Flask, jsonify
from dotenv import load_dotenv
from flask_mongoengine import MongoEngine
# attrgetter for future object destructuring if needed
from operator import attrgetter
from flask_cors import CORS

load_dotenv()

DEBUG = os.getenv('DEBUG')
MONGO_URL = os.getenv('MONGO_URL')
PORT = os.getenv('PORT')
HOST = os.getenv('HOST')
app = Flask(__name__)

CORS(app)
app.config['MONGODB_SETTINGS'] = {'db': 'chatSnap', 'host': MONGO_URL }

# initialize DB
mongoDB = MongoEngine(app)

from routes.userRoutes.getUsers import getUsers
from routes.userRoutes.register import register

# routing example
getUsers(app)
register(app)

@app.route("/members")
def members():
    return { "members": ['Member 1', 'Member 2', 'Member 3']}

@app.route('/', methods = ['GET'])
def get_articles():
    return jsonify({"Hello":"World"})

if __name__ == "__main__":
    app.run(host=HOST, port=PORT, debug=DEBUG)