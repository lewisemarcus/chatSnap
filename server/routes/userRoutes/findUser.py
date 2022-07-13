from models.User import User
from flask import jsonify, request
from operator import itemgetter

def findUser(app): 
    @app.route('/user', methods=['POST'])
    def user():
        try:
            keys = ['body']
            getUser = itemgetter(*keys)
            values = getUser(request.json)
            email = values['email']
            user = User.objects(email=email)
        
            return jsonify(user), 200
        except Exception as e:
            print('error:', e, flush=True)
            return jsonify(e), 500