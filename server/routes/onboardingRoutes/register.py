from flask import request, Response
import pymongo
import os
from models.User import User
from flask import jsonify
from flask_cors import cross_origin
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
# itemgetter for future object destructuring if needed
from operator import itemgetter
MONGO_URL = os.getenv('MONGO_URL')
mongoClient = pymongo.MongoClient(MONGO_URL)
mongoDB = mongoClient['chatSnap']
userCollection = mongoDB['users']
def register(app):
    @app.route('/Register', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def registerUser():
        try: 
            keys = ['body']
            getUser = itemgetter(*keys)
            values = getUser(request.json)
            name = values['name']
            email = values['email']
            password = values['password']
            expoToken = values['userExpoToken']
            checkEmail = User.objects(email=email)
        
            if len(checkEmail) == 0:
                user = User(name=name, email=email, password=password, expoToken=expoToken).save()
                print(user, flush=True)
                token = create_access_token(identity=email)
                return jsonify(token, user), 201
            else:
                return jsonify('Email already in use.'), 401
    
        except Exception as e:
            print('Exception:', e, flush=True)
            return jsonify('Error registering: ', e), 500