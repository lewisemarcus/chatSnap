from flask import jsonify
from models.User import User, Message, Chatroom
import json

def newChatFunction(user, chatters, message, recipientList, allEmails):
    newChatroom = Chatroom(users=chatters, userEmails=allEmails)
    newChatroom.messages.append(message)
    user.chatrooms.append(newChatroom)
    for recipient in recipientList:
        recipient.chatrooms.append(newChatroom)
        recipient.save()
    return newChatroom

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
            chatroomId = ''
            for receiverEmail in receiversEmails:
                recipientData = User.objects(email=receiverEmail)
                recipient = recipientData[0]
                recipientList.append(recipient)
                recipientEmitList.append(json.loads(recipient.to_json()))
                chatters.append(recipient)
            
            chatters.append(user)
            message = Message(message=messageText, senderEmail=user.email)
            matchingChatters = False
            allEmails = parsedContent['receivers']
            allEmails.append(userEmail)
            
            if len(user.chatrooms) == 0:
                chatroom = newChatFunction(user, chatters, message, recipientList, allEmails).uid
                print('>>>>', chatroom, flush=True)
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
                        updateChat(chatroom.uid, message, recipientList)
                        break
                if matchingChatters == False:
                    newChatFunction(user, chatters, message, recipientList, allEmails)
                        
            print(str(user.id),chatroomId, flush=True)
            user.save()
            emit('sent-message'+str(user.id), userList.to_json())
            emit('message-received'+str(chatroomId), {'recipients' : recipientEmitList})
        except Exception as e:
            print("Error: ", e)
            return jsonify(e), 500