import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from model import recommend, recommend_by_description

# Creating server app instance
app = Flask(__name__, static_folder='client/build', static_url_path='/')
# Allowing API requests from other cross-domain origins on this server
CORS(app)

@app.route('/')
def hello():
	return app.send_static_file('index.html')

# API to send a list of recommendations based on a given description
@app.route('/api/recommend/movies', methods=['POST'])
def recommend_movies_by_description():
	request_data = request.get_json()
	description = request_data['description']
	return jsonify(recommend_by_description(description))

# API to send a list of recommendations similiar to a particular movie
@app.route('/api/recommend/movies/movie/<int:id>', methods=['GET'])
def recommend_movies_by_title(id):
	return jsonify(recommend(id))

# Running the app server
if __name__ == "__main__":
	app.run()