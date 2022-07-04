class Message(mongoDB.EmbeddedDocument):
    message = StringField()

class Chatroom(mongoDB.Document):
    users = mongoDB.ListField(ReferenceField(User))
    messages = mongoDB.ListField(EmbeddedDocumentField(Message))