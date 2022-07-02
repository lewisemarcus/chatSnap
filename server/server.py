import os
from flask import Flask, jsonify
from dotenv import load_dotenv
from flask_mongoengine import MongoEngine
from operator import attrgetter
from routes.userRoutes.getFriends import getFriends
from routes.userRoutes.newUser import register
from models.User import User
load_dotenv()

DEBUG = os.getenv('DEBUG')
MONGO_URL = os.getenv('MONGO_URL')

app = Flask(__name__)

app.config["MONGODB_SETTINGS"] = { 'host': MONGO_URL }
mongoDB = MongoEngine(app)

# routing example
getFriends(app)
register(app)

# model init example
User(mongoDB)

@app.route("/members")
def members():
    return { "members": ['Member 1', 'Member 2', 'Member 3']}

@app.route('/', methods = ['GET'])
def get_articles():
    return jsonify({"Hello":"World"})

if __name__ == "__main__":
    app.run(debug=DEBUG)