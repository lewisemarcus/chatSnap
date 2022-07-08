from socket import SocketIO

def initSocket(app):
    socketio = SocketIO(app)
    return socketio