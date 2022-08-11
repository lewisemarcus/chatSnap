from flask import jsonify
from models.User import User, Message, Chatroom, Messages
import json

def updateChat(socketio):
    @socketio.on('chat-opened')
    def update(content):
        try:
            parsedContent = json.loads(content)
            userEmail = parsedContent['userEmail']
            chatroomId = parsedContent['chatroomId']
            
            userList = User.objects(email=userEmail)
            user = userList[0]
            for i in range(len(user.chatrooms)) :
                if str(user.chatrooms[i].uid) == str(chatroomId):
                    user.chatrooms[i].newMessages = 0
                    user.save()
                    break
                
                
        except Exception as e:
            print("Error: ", e)
            return jsonify(e), 500