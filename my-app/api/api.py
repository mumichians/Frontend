from flask import Flask
from flask_cors import CORS, cross_origin
from flask import request
api = Flask(__name__)
CORS(api, support_credentials=True)



@api.route('/query', methods=['POST'])
@cross_origin(supports_credentials=True)
def query():
    query = request.json['query']
    # TODO: do stuff with query
    print(query)
    lyrics = query
    response_body = {
        "lyrics": {lyrics},
        "parsed_artist": "placeholder artist",
        "parsed_genre": "placeholder genre",
        "parsed_subject": "placeholder subject"
        
    }
    return response_body

if __name__ == '__main__':
    api.run(debug=True, port=5000)