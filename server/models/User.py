import mongoengine as mongoDB
class User(mongoDB.Document):
    username = mongoDB.StringField(required=True, unique=True)
    firstName = mongoDB.StringField(required=True)
    lastName = mongoDB.StringField(required=True)
    email = mongoDB.EmailField(required=True, unique=True) 
    contacts = mongoDB.ListField(mongoDB.ReferenceField('self'))
    chatrooms = mongoDB.ListField(mongoDB.ReferenceField('Chatroom'))
    meta = {'collection': 'users'}
