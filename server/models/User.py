import mongoengine as mongoDB
class Message(mongoDB.EmbeddedDocument):
    message = mongoDB.StringField()
    senderEmail = mongoDB.StringField()
class Chatroom(mongoDB.EmbeddedDocument):
    users = mongoDB.ListField(mongoDB.ReferenceField('User'))
    messages = mongoDB.EmbeddedDocumentListField(Message)
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
    contacts = mongoDB.EmbeddedDocumentListField(Contact)
    chatrooms = mongoDB.EmbeddedDocumentListField(Chatroom)
    meta = {'collection': 'users'}

