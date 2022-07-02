def User(mongoDB):
    class User(mongoDB.Document):
        username = mongoDB.StringField(required=True, unique=True)
        firstName = mongoDB.StringField(required=True)
        lastName = mongoDB.StringField(required=True)
        email = mongoDB.EmailField(required=True, unique=True)