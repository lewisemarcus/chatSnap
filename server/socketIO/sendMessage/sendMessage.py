from flask import jsonify
from models.User import User, Message, Chatroom
import json

def newChatFunction(user, chatters, message, recipientList, allEmails, recipientEmitList):
    newChatroom = Chatroom(users=chatters, userEmails=allEmails)
    newChatroom.messages.append(message)
    user.chatrooms.append(newChatroom)
    for recipient in recipientList:
        recipient.chatrooms.append(newChatroom)
        recipient.save()
        recipientEmitList.append(json.loads(recipient.to_json()))
    return newChatroom

def updateChat(message, recipientList, recipientEmitList):
    for recipient in recipientList:
        for chatroom in recipient.chatrooms:
            chatroom.messages.append(message)
        recipient.save()
        recipientEmitList.append(json.loads(recipient.to_json()))
            
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
            chatroomId = ''
            for receiverEmail in receiversEmails:
                recipientData = User.objects(email=receiverEmail)
                recipient = recipientData[0]
                recipientList.append(recipient)
                chatters.append(recipient)
            
            chatters.append(user)
            message = Message(message=messageText, senderEmail=user.email)
            matchingChatters = False
            allEmails = parsedContent['receivers']
            allEmails.append(userEmail)
            
            if len(user.chatrooms) == 0:
                chatroomId = newChatFunction(user, chatters, message, recipientList, allEmails, recipientEmitList).uid
            else:
                for chatroom in user.chatrooms:
                    if len(chatroom.users) != len(chatters):
                        matchingChatters = False
                    else:
                        for i in range(len(chatters)):

                            if chatters[i].email != chatroom.users[i].email:
                                matchingChatters = False
                                break
                            else:
                                matchingChatters = True
                                break
                    if matchingChatters == True:
                        chatroomId = chatroom.uid 
                        chatroom.messages.append(message)
                        updateChat(message, recipientList, recipientEmitList)
                        break
                if matchingChatters == False:
                    chatroomId = newChatFunction(user, chatters, message, recipientList, allEmails, recipientEmitList).uid
                        
            print('>>>>recipientEmitList: ',recipientEmitList, flush=True)
            user.save()
            emit('sent-message'+str(user.id), userList.to_json(), room='chatroom')
            emit('message-received'+str(chatroomId), {'recipients' : recipientEmitList}, room='chatroom')
        except Exception as e:
            print("Error: ", e)
            return jsonify(e), 500