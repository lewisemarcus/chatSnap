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
            userList = User.objects(email=email)
            user = userList[0]
            user.update(name=fullName, userImage=userImage, contacts=contacts)
            user.save()
            
            return jsonify(user), 201
        except Exception as e:
            print('Exception', e, flush=True)
            return jsonify('Error logging in: ', e), 500
        
        
        