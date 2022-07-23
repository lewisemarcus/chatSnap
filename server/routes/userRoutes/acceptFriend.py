from operator import itemgetter
from models.User import User
from flask import jsonify, request
from flask_cors import cross_origin

def acceptAFriend(app, socketio): 
    @app.route('/acceptFriend', methods=['POST'])
    @cross_origin()
    def acceptFriend():
        try:
            keys = ['body']
            getRequest = itemgetter(*keys)
            values = getRequest(request.json)
            userList = User.objects(email=values['userEmail'])
            user = userList[0]
            contactList = User.objects(email=values['contact'])
            newContact = contactList[0]
            newContact.contacts.append(name=user.name, email=user.email)
            user.contacts.append(name=newContact.name, email=newContact.email)
            user.update(pull__contacts=newContact.email)
            newContact.update(pull__sentRequests=user.email)
            newContact.save()
            user.save()
            socketio.emit('request-accepted', contactList.to_json())
            socketio.emit('accepted-request', userList.to_json())
            return jsonify(friendAdded=user), 201
        except Exception as e:
            print("Error: ", e, flush=True)
            return e, 500