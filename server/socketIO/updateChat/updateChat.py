from flask import jsonify
from models.User import User, Message, Chatroom, Messages
import json

def updateChat(socketio):
    @socketio.on('chat-opened')
    def update(content):
        try:
            parsedContent = json.loads(content)
            userId = parsedContent['userId']
            chatroomId = parsedContent['chatroomId']
            
            userList = User.objects(_id=userId)
            user = userList[0]
            for i in range(len(user.chatrooms)) :
                if str(user.chatrooms[i].uid) == str(chatroomId):
                    user.chatrooms[i].newMessages = 0
                    user.reload()
                    user.save()
                    break
                
                
        except Exception as e:
            print("Error: ", e)
            return jsonify(e), 500