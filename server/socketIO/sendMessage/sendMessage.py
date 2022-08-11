
from flask import jsonify
from models.User import User, Message, Chatroom, Messages
import json
import uuid

def newChatFunction(user, chatters, message, recipientList, allEmails, recipientEmitList, recipientImages):
    messages = Messages(messages=[message], uid=uuid.uuid4())
    newChatroom = Chatroom(users=chatters, userEmails=allEmails, uid=uuid.uuid4(), userImages=recipientImages, messages=messages)
    user.chatrooms.append(newChatroom)
    chatroomExists = False
    for recipient in recipientList:
        for chatroom in recipient.chatrooms:
            if chatroom.userEmails == allEmails:
                chatroom.messages.messages.append(message)
                chatroom.newMessages += 1
                chatroomExists = True
            else:
                chatroomExists = False
        if chatroomExists == False:
            recipient.chatrooms.append(newChatroom)
            recipient.chatrooms[len(recipient.chatrooms) - 1].newMessages +=1
        recipient.save()
        recipientEmitList.append(json.loads(recipient.to_json()))
    return newChatroom

def updateChat(uid, message, recipientList, recipientEmitList, recipientImages, chatters, allEmails):
    for recipient in recipientList:
        chatroomIds = []
        for i in range(len(recipient.chatrooms)):
            chatroomIds.append(recipient.chatrooms[i].uid)
            if(recipient.chatrooms[i].uid == uid):
                recipient.chatrooms[i].newMessages +=1
                recipient.chatrooms[i].messages.messages.append(message)

        if uid not in chatroomIds:
            newChatFunction(recipient, chatters, message, recipientList, allEmails, recipientEmitList, recipientImages)
        recipient.save()
        recipientEmitList.append(json.loads(recipient.to_json()))
            
def socketMessage(socketio, emit):
    @socketio.on('message-sent')
    def message(content):
        try:
            parsedContent = json.loads(content)
            userEmail = parsedContent['user']['email']
            receiversEmails = parsedContent['receivers'].copy()
            messageText = parsedContent['message']
            userList = User.objects(email=userEmail)
            user = userList[0]
            recipientList = []
            recipientEmitList = []
            chatters = []
            recipientImages = []
            chatroomId = ''
            for receiverEmail in receiversEmails:
                recipientData = User.objects(email=receiverEmail)
                recipient = recipientData[0]
                recipientList.append(recipient)
                recipientImages.append(recipient.userImage)
                chatters.append(recipient)
            
            chatters.append(user)
            
            message = Message(message=messageText, senderEmail=user.email, uid=uuid.uuid4())
            matchingChatters = False
            allEmails = parsedContent['receivers'].copy()
            allEmails.append(userEmail)
            
            if len(user.chatrooms) == 0:
                chatroomId = newChatFunction(user, chatters, message, recipientList, allEmails, recipientEmitList, recipientImages).uid
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
                        chatroom.messages.messages.append(message)
                        chatroom.userImages = recipientImages
                        updateChat(chatroomId, message, recipientList, recipientEmitList, recipientImages, chatters, allEmails)
                        break
                if matchingChatters == False:
                    chatroomId = newChatFunction(user, chatters, message, recipientList, allEmails, recipientEmitList, recipientImages).uid
                        
            user.save()
            for i in range(len(receiversEmails)):
                if receiversEmails[i] == user.email:
                    receiversEmails = receiversEmails.pop(i)
                    
            
            
            for receiver in parsedContent['receivers']:
                emit('message-received'+receiver, {'recipients' : recipientEmitList, 'chatroomId' : str(chatroomId), 'sender': userEmail, 'message': messageText}, room='chatroom')
                
            emit('sent-message'+str(user.id), {'user': userList.to_json(), 'chatroomId': str(chatroomId)}, room='chatroom')
           
        except Exception as e:
            print("Error: ", e)
            return jsonify(e), 500