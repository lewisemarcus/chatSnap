from flask import jsonify
from models.User import User, Message, Chatroom
import json

def newChatFunction(user, chatters, message, recipientList):
    newChatroom = Chatroom(users=chatters)
    newChatroom.messages.append(message)
    user.chatrooms.append(newChatroom)
    for recipient in recipientList:
        recipient.chatrooms.append(newChatroom)
        recipient.save()

def updateChat(uid, message, recipientList):
    for recipient in recipientList:
        recipient.chatrooms.update(uid=uid, push__messages=[message])
        recipient.save()
            
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
                recipientEmitList.append(json.loads(recipient.to_json()))
                chatters.append(recipient)
            
            chatters.append(user)
            message = Message(message=messageText, senderEmail=user.email)
            matchingChatters = False
            if len(user.chatrooms) == 0:
                newChatFunction(user, chatters, message, recipientList)
            else:
                for chatroom in user.chatrooms:
                    if len(chatroom.users) != len(chatters):
                        matchingChatters = False
                    else:
                        for i in range(len(chatters)):
                            print(chatters[i].email, chatroom.users[i].email, flush=True)
                            if chatters[i].email != chatroom.users[i].email:
                                matchingChatters = False
                                break
                            else:
                                matchingChatters = True
                                break
                    if matchingChatters == True: 
                        chatroom.messages.append(message)
                        updateChat(chatroom.uid, message, recipientList)
                        break
                if matchingChatters == False:
                    newChatFunction(user, chatters, message, recipientList)
                        

            user.save()
            emit('sent-message', userList.to_json())
            emit('message-received', {'recipients' : recipientEmitList})
        except Exception as e:
            print("Error: ", e)
            return jsonify(e), 500