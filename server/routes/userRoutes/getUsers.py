from models.User import User
from flask import jsonify

def getUsers(app): 
    @app.route('/users')
    def users():
        users = User.objects()
        return jsonify(users), 200