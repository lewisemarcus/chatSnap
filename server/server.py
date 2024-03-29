import os

from routes.userRoutes.acceptFriend import acceptAFriend
from flask import Flask, jsonify
from dotenv import load_dotenv
from flask_mongoengine import MongoEngine
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO, emit, join_room, leave_room
from socketIO.sendMessage.sendMessage import socketMessage
from socketIO.updateChat.updateChat import updateChat
from routes.userRoutes.addFriend import addAFriend
from routes.onboardingRoutes.register import register
from routes.userRoutes.getFriends import getFriends
from routes.onboardingRoutes.login import login
from routes.userRoutes.findUser import findUser
from routes.userRoutes.updateUser import updateUser
load_dotenv()

DEBUG = os.getenv('DEBUG')
MONGO_URL = os.getenv('MONGO_URL')
PORT = os.getenv('PORT')
HOST = os.getenv('HOST')
SECRET = os.getenv('SECRET')
app = Flask(__name__)

app.config['MONGODB_SETTINGS'] = {'db': 'chatSnap', 'host': MONGO_URL }
app.config["JWT_SECRET_KEY"]=SECRET
app.config['CORS_HEADERS'] = 'Content-Type'

CORS(app, supports_credentials=True, resources={
    r'/*/*': {
        'origins': '*',
        'allow_headers': ['Content-Type', 'Authorization']
    }})

jwt = JWTManager(app)

# init DB
mongoDB = MongoEngine(app)

# init socket
socketio = SocketIO(app, cors_allowed_origins="*", logger=True)

# routing 
addAFriend(app, socketio)
acceptAFriend(app, socketio)
register(app)
login(app)
findUser(app)
getFriends(app)
updateUser(app)

@socketio.on('message')
def joinRoom(content):
    join_room("chatroom")

# socket routing
socketMessage(socketio, emit)
updateChat(socketio)

if __name__ == "__main__":
    socketio.run(app, host=HOST, port=PORT, debug=DEBUG)