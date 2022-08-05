from flask import jsonify
from models.User import User, Message, Chatroom
import json
def socketMessage(socketio, emit):
    @socketio.on('message-sent')
    def message(content):
        try:
            parsedContent = json.loads(content)
            userEmail = parsedContent['user']['email']
            receiversEmails = parsedContent['receivers']
            messageText = parsedContent['message']
            userList = User.objects(email=userEmail)
            user = userList[0]
            recipientList = []
            recipientEmitList = []
            chatters = []
            for receiverEmail in receiversEmails:
                recipientData = User.objects(email=receiverEmail)
                recipient = recipientData[0]
                recipientList.append(recipient)
                chatters.append(recipient)
            
            chatters.append(user)
            message = Message(message=messageText, senderEmail=user.email)
            
            for chatroom in user.chatrooms:
                if chatroom.users != chatters:
                    newChatroom = Chatroom(users=chatters)
                    newChatroom.messages.append(message)
                    user.chatrooms.append(newChatroom)
                    for recipient in recipientList:
                        recipient.chatrooms.append(newChatroom)
                        recipientEmitList.append(json.loads(recipient.to_json()))
                        recipient.save()
                else:
                    chatroom.append(message)
                    for recipient in recipientList:
                        for chat in recipient.chatrooms:
                            chat.append(message)
                            recipientEmitList.append(json.loads(recipient.to_json()))
                            recipient.save()

            user.save()
            emit('sent-message', userList.to_json())
            emit('message-received', {'recipients' : recipientEmitList})
        except Exception as e:
            print("Error: ", e)
            return jsonify(e), 500