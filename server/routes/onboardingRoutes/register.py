from flask import request, Response
from models.User import User
from flask import jsonify

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

def register(app):
    @app.route('/Register', methods=['POST'])
    def addUser():
        
        
        print(request.json)
        name = 1
        email = 2
        password = 3
       
        checkEmail = User.objects(email=email)
        
        if len(checkEmail) == 0:
            # user = User(name=name, email=email, password=password).save()
            token = create_access_token(identity=name)
            resp = Response(token)
            resp.headers['Access-Control-Allow-Origin'] = '*'
            return resp
        else:
            return jsonify('Email already in use.'), 401
    
        