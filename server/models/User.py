import mongoengine as mongoDB
class User(mongoDB.Document):
    name = mongoDB.StringField(required=True)
    email = mongoDB.EmailField(required=True, unique=True)
    password = mongoDB.StringField(required=True)
    contacts = mongoDB.ListField(mongoDB.ReferenceField('self'))
    chatrooms = mongoDB.ListField(mongoDB.ReferenceField('Chatroom'))
    meta = {'collection': 'users'}
