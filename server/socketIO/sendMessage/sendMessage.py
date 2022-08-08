from flask import jsonify
from models.User import User, Message, Chatroom
import json
import uuid

def newChatFunction(user, chatters, message, recipientList, allEmails, recipientEmitList):
    newChatroom = Chatroom(users=chatters, userEmails=allEmails, uid=uuid.uuid4())
    newChatroom.messages.append(message)
    user.chatrooms.append(newChatroom)
    for recipient in recipientList:
        recipient.chatrooms.append(newChatroom)
        recipient.save()
        recipientEmitList.append(json.loads(recipient.to_json()))
    return newChatroom

def updateChat(uid, message, recipientList, recipientEmitList):
    for recipient in recipientList:
        for chatroom in recipient.chatrooms:
            if(chatroom.uid == uid):
                chatroom.messages.append(message)
        recipient.save()
        recipientEmitList.append(json.loads(recipient.to_json()))
            
def socketMessage(socketio, emit):
    @socketio.on('message-sent')
    def message(content):
        try:
            parsedContent = json.loads(content)
            userEmail = parsedContent['user']['email']
            receiversEmails = parsedContent['receivers'].copy()
            print(receiversEmails, flush=True)
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
            allEmails = parsedContent['receivers'].copy()
            allEmails.append(userEmail)
            
            if len(user.chatrooms) == 0:
                chatroomId = newChatFunction(user, chatters, message, recipientList, allEmails, recipientEmitList).uid
            else:
                for chatroom in user.chatrooms:
                    if len(chatroom.users) != len(chatters):
                        matchingChatters = False
                    else:
                        for i in range(len(chatters)):
                            if chatters[i].email not in chatroom.userEmails:
                                matchingChatters = False
                                break
                            else:
                                matchingChatters = True
                    if matchingChatters == True:
                        chatroomId = chatroom.uid 
                        chatroom.messages.append(message)
                        updateChat(chatroomId, message, recipientList, recipientEmitList)
                        break
                if matchingChatters == False:
                    chatroomId = newChatFunction(user, chatters, message, recipientList, allEmails, recipientEmitList).uid
                        
            user.save()
            for i in range(len(receiversEmails)):
                if receiversEmails[i] == user.email:
                    receiversEmails = receiversEmails.pop(i)
                    
            emit('sent-message'+str(user.id), {'user': userList.to_json(), 'chatroomId': str(chatroomId)}, room='chatroom')
    
            emit('message-received'+",".join(receiversEmails), {'recipients' : recipientEmitList, 'chatroomId' : str(chatroomId)}, room='chatroom')
           
        except Exception as e:
            print("Error: ", e)
            return jsonify(e), 500