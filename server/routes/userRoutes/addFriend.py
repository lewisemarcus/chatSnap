from operator import itemgetter
from models.User import User
from flask import jsonify, request
from flask_cors import cross_origin

def addAFriend(app, socketio): 
    @app.route('/addFriend', methods=['POST'])
    @cross_origin()
    def addFriend():
        try:
            keys = ['body']
            getRequest = itemgetter(*keys)
            values = getRequest(request.json)
            userList = User.objects(email=values['user']['email'])
            user= userList[0]
            contactList = User.objects(email=values['contact']['email'])
            newContact = contactList[0]
            if values['user']['email'] in newContact.requests:
                return jsonify(error='Friend request already sent.'), 500
            else:  
                newContact.requests.append(values['user']['email'])
                user.sentRequests.append(values['contact']['email'])
                newContact.save()
                user.save()
                socketio.emit('request-received'+str(newContact.id), contactList.to_json())
                socketio.emit('request-sent'+str(user.id), userList.to_json())
                return jsonify(friendAdded=user), 201
        except Exception as e:
            print("Error: ", e, flush=True)
            return e, 500