from socket import send

def socketMessage(socketio):
    @socketio.on('message')
    def message(msg):
        print(f"\n\n{msg}\n\n")
        
        send(msg)