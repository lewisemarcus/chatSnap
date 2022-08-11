import mongoengine as mongoDB
import datetime
class Message(mongoDB.EmbeddedDocument):
    message = mongoDB.StringField()
    senderEmail = mongoDB.StringField()
    createdAt = mongoDB.DateTimeField(required=True, default=datetime.datetime.now)
    
class Messages(mongoDB.EmbeddedDocument):
    uid = mongoDB.UUIDField(binary=False)
    messages = mongoDB.EmbeddedDocumentListField(Message)
class Chatroom(mongoDB.EmbeddedDocument):
    uid = mongoDB.UUIDField(binary=False, required=True)
    users = mongoDB.ListField(mongoDB.ReferenceField('User'))
    userEmails = mongoDB.ListField(mongoDB.StringField())
    userImages = mongoDB.ListField(mongoDB.StringField(allow_blank=True,allow_null=True))
    messages = mongoDB.EmbeddedDocumentField(Messages)
    newMessages = mongoDB.IntField()
class Contact(mongoDB.EmbeddedDocument):
    name = mongoDB.StringField()
    email = mongoDB.EmailField()
class User(mongoDB.Document):
    name = mongoDB.StringField(required=True)
    userImage = mongoDB.StringField(allow_blank=True,allow_null=True, default='')
    email = mongoDB.EmailField(required=True, unique=True)
    password = mongoDB.StringField(required=True)
    requests = mongoDB.ListField(mongoDB.StringField())
    sentRequests = mongoDB.ListField(mongoDB.StringField())
    contacts = mongoDB.EmbeddedDocumentListField(Contact)
    chatrooms = mongoDB.EmbeddedDocumentListField(Chatroom)
    expoToken = mongoDB.StringField()
    meta = {'collection': 'users'}

