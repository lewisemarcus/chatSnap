import mongoengine as mongoDB

class Chatroom(mongoDB.Document):
    users = mongoDB.ListField(mongoDB.ReferenceField('User'))
    messages = mongoDB.ListField(mongoDB.StringField())
    newMessages = mongoDB.IntField()