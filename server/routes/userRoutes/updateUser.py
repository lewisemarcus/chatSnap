from models.User import User
from flask import jsonify, request
from operator import itemgetter
def updateUser(app):
    @app.route('/updateUser', methods=['PUT'])
    def update():
        try:
            keys = ['body']
            getUser = itemgetter(*keys)
            values = getUser(request.json)
            email = values['email']
            fullName = values['fullName']
            userImage = values['userImage']
            userList = User.objects(email=email)
            user = userList[0]
            user.update(name=fullName, userImage=userImage)
            user.save()
            
            return jsonify(user), 201
        except Exception as e:
            print('Exception', e, flush=True)
            return jsonify('Error logging in: ', e), 500
        
        
        