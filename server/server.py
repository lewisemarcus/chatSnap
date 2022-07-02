from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/members")
def members():
    return { "members": ['Member 1', 'Member 2', 'Member 3']}

@app.route('/', methods = ['GET'])
def get_articles():
    return jsonify({"Hello":"World"})

if __name__ == "__main__":
    app.run(debug=True)