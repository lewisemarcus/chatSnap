import os
from flask import Flask, jsonify
from dotenv import load_dotenv
from flask_mongoengine import MongoEngine
# attrgetter for future object destructuring if needed
from operator import attrgetter
from flask_cors import CORS
from flask_jwt_extended import JWTManager
load_dotenv()

DEBUG = os.getenv('DEBUG')
MONGO_URL = os.getenv('MONGO_URL')
PORT = os.getenv('PORT')
HOST = os.getenv('HOST')
SECRET = os.getenv('SECRET')
app = Flask(__name__)

CORS(app)
app.config['MONGODB_SETTINGS'] = {'db': 'chatSnap', 'host': MONGO_URL }
app.config["JWT_SECRET_KEY"]=SECRET
jwt = JWTManager(app)
# initialize DB
mongoDB = MongoEngine(app)

from routes.userRoutes.getUsers import getUsers
from routes.onboardingRoutes.register import register

# routing example
getUsers(app)
register(app)

if __name__ == "__main__":
    app.run(host=HOST, port=PORT, debug=DEBUG)