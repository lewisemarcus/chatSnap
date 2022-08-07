from operator import itemgetter
from models.User import User, Contact
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
            contactList = User.objects(email=values['contact'])
            user = userList[0]
            newContact = contactList[0]
            
            userContactDoc = Contact(name=user.name, email=user.email)
            newContactDoc = Contact(name=newContact.name, email=newContact.email)
            
            newContact.contacts.append(userContactDoc)
            user.contacts.append(newContactDoc)
            
            user.update(pull__requests=newContact.email)
            newContact.update(pull__sentRequests=user.email)
            
            newContact.save()
            user.save()
            socketio.emit('request-accepted'+newContact._id, contactList.to_json())
            socketio.emit('accepted-request'+user._id, userList.to_json())
            return jsonify(friendAdded=user), 201
        except Exception as e:
            print("Error: ", e, flush=True)
            return e, 500