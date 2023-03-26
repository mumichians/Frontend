from flask import Flask

api = Flask(__name__)

@api.route('/profile')
def my_profile():
    response_body = {
        "name": "Nagato",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body

@api.route('/query', methods=['GET'])
def query():
    response_body = {
        "response": "Hi this is proof the api route works"
    }
    return response_body