from flask import Flask
import _json

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
        "test": "Hi this is proof the api route works",
        "parsed_artist": "placeholder artist",
        "parsed_genre": "placeholder genre",
        "parsed_subject": "placeholder subject"
        
    }
    return response_body