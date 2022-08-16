from flask import request, Response, jsonify
from models.User import User
from flask_cors import cross_origin
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
# itemgetter for future object destructuring if needed
from operator import itemgetter

def login(app):
    @app.route('/Login', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def loginUser():  
        try:
            keys = ['body']
            getUser = itemgetter(*keys)
            values = getUser(request.json)
            email = values['email']
            password = values['password']
 
            checkUser = User.objects(email=email, password=password)
        
            if len(checkUser) != 0:
                token = create_access_token(identity=email)

                return jsonify(token, checkUser[0]), 201
            else:
                return jsonify('No email/password combination found.'), 401
        except Exception as e:
            print('Exception:', e, flush=True)
            return jsonify('Error logging in: ', e), 500
        