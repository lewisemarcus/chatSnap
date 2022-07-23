import mongoengine as mongoDB
class Message(mongoDB.EmbeddedDocument):
    message = mongoDB.StringField()
    userId = mongoDB.StringField()
class Chatroom(mongoDB.EmbeddedDocument):
    users = mongoDB.ListField(mongoDB.ReferenceField('User'))
    messages = mongoDB.ListField(mongoDB.EmbeddedDocumentField(Message))
    newMessages = mongoDB.IntField()
class Contact(mongoDB.EmbeddedDocument):
    name = mongoDB.StringField()
    email = mongoDB.EmailField()
class User(mongoDB.Document):
    name = mongoDB.StringField(required=True)
    email = mongoDB.EmailField(required=True, unique=True)
    password = mongoDB.StringField(required=True)
    requests = mongoDB.ListField(mongoDB.StringField())
    sentRequests = mongoDB.ListField(mongoDB.StringField())
    contacts = mongoDB.ListField(mongoDB.EmbeddedDocumentField(Contact))
    chatrooms = mongoDB.ListField(mongoDB.EmbeddedDocumentField(Chatroom))
    meta = {'collection': 'users'}

