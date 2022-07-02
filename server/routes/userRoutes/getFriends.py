from models.User import User
from flask import jsonify

def getFriends(app): 
    @app.route('/hi')
    def hi():
        users = User.objects()
        return jsonify(users), 200