import mongoengine as mongoDB
class Message(mongoDB.EmbeddedDocument):
    message = mongoDB.StringField()

class Chatroom(mongoDB.Document):
    users = mongoDB.ListField(mongoDB.ReferenceField('User'))
    messages = mongoDB.ListField(mongoDB.EmbeddedDocumentField(Message))
       