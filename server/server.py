import os
from flask import Flask, jsonify
from dotenv import load_dotenv
from flask_mongoengine import MongoEngine
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO, send
from socketIO.sendMessage.sendMessage import socketMessage
from routes.userRoutes.getUsers import getUsers
from routes.onboardingRoutes.register import register
from routes.onboardingRoutes.login import login

load_dotenv()

DEBUG = os.getenv('DEBUG')
MONGO_URL = os.getenv('MONGO_URL')
PORT = os.getenv('PORT')
HOST = os.getenv('HOST')
SECRET = os.getenv('SECRET')
app = Flask(__name__)

CORS(app, support_credentials=True)
app.config['MONGODB_SETTINGS'] = {'db': 'chatSnap', 'host': MONGO_URL }
app.config["JWT_SECRET_KEY"]=SECRET
app.config['CORS_HEADERS'] = 'Content-Type'
jwt = JWTManager(app)

# init DB
mongoDB = MongoEngine(app)

# init socket
socketio = SocketIO(app)

# routing 
getUsers(app)
register(app)
login(app)

# socket routing
socketMessage(socketio, send)

if __name__ == "__main__":
    socketio.run(app, host=HOST, port=PORT, debug=DEBUG)