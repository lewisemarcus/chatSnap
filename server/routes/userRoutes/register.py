from urllib import request
from models.User import User
from flask import jsonify

def register(app):
    @app.route('/register', methods=['POST'])
    def addUser():
        body = request.get_json()
        user = User(**body).save()
    
        return jsonify(user), 201