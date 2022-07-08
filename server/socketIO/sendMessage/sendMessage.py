def socketMessage(socketio, send):
    @socketio.on('message')
    def message(msg):
        try:
            print(f"\n\n{msg}\n\n")
        
            send(msg)
        except Exception as e:
            print(f"\n\n{e}\n\n")
            return jsonify(e), 500