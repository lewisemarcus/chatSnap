from models.User import User
from flask import jsonify, request
from operator import itemgetter
def updateUser(app):
    @app.route('/updateUser', methods=['POST'])
    def update():
        try:
            keys = ['body']
            getUser = itemgetter(*keys)
            values = getUser(request.json)
            email = values['email']
            fullName = values['name']
            userImage = values['userImage']
            contacts = values['contacts']
            chatrooms = values['chatrooms']
            otherUsers = values['otherUsers']
            userList = User.objects(email=email)
            otherUserList = []
            contactEmails = []
            
            for otherUser in otherUsers:
                otherUserList.append(User.objects(otherUser)[0])
            user = userList[0]
            for contact in contacts:
                contactEmails.append(contact.email)
            for updateUser in otherUserList:
                if updateUser.email not in contactEmails:
                    updateUser.update(pull__contacts__name=user.name)
            user.update(name=fullName, userImage=userImage, contacts=contacts, chatrooms=chatrooms)
           
            user.save()
            
            return jsonify(user), 201
        except Exception as e:
            print('Exception', e, flush=True)
            return jsonify('Error logging in: ', e), 500
        
        
        