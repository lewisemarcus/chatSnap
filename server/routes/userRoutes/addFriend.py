from operator import itemgetter
from models.User import User
from flask import jsonify, request
from flask_cors import cross_origin

def addAFriend(app, emit): 
    @app.route('/addFriend', methods=['POST'])
    @cross_origin()
    def addFriend():
        try:
            keys = ['body']
            getRequest = itemgetter(*keys)
            values = getRequest(request.json)
            user = User.objects(email=values['user']['email'])
            newContact = User.objects(email=values['contact'])
            if values['user']['email'] in newContact.requests:
                return jsonify(error='Friend request already sent.'), 500
            else:  
                newContact.requests.append(values['user']['email'])
                user.sentRequests.append(values['contact'])
                newContact.save()
                user.save()
                emit('request-received', jsonify(user))
                return jsonify(friendAdded=user), 201
        except Exception as e:
            print("Error: ", e, flush=True)
            return jsonify(e), 500