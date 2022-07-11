from flask import jsonify
import json
def socketMessage(socketio, emit):
    @socketio.on('message-sent')
    def message(content):
        try:
            parsedContent = json.loads(content)
            print(parsedContent['user']['email'], flush=True)
            emit('message-received', content)
        except Exception as e:
            print("Error: ", e)
            return jsonify(e), 500