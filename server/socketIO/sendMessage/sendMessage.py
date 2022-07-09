from flask import jsonify
import json
def socketMessage(socketio, emit):
    @socketio.on('message-event')
    def message(content):
        try:
            parsedContent = json.loads(content)
            print(parsedContent['user']['email'], flush=True)
            emit('message-event', content)
        except Exception as e:
            print("Error: ", e)
            return jsonify(e), 500