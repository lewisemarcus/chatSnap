from models.User import User
from flask import jsonify
from flask_cors import cross_origin

def addAFriend(app): 
    @app.route('/addFriend', methods=['POST'])
    @cross_origin()
    def addFriend(content):
        try:
            user = User.objects(email=content['user']['email'])
            newContact = User.objects(email=content['contact'])
            user.contacts.append(newContact)
            user.save()
            return jsonify(friendAdded=user), 201
        except Exception as e:
            print("Error: ", e, flush=True)
            return jsonify(e), 500