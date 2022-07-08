def socketMessage(socketio, send):
    @socketio.on('message')
    def message(msg):
        print(f"\n\n{msg}\n\n")
        
        send(msg)