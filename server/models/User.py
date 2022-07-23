import mongoengine as mongoDB
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
    chatrooms = mongoDB.ListField(mongoDB.ReferenceField('Chatroom'))
    meta = {'collection': 'users'}

