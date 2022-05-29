import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from preprocess import preprocess
import requests

# Reading movies and credits datasets as pandas dataframes
movies = pd.read_csv('./datasets/tmdb_5000_movies.csv')
credits = pd.read_csv('./datasets/tmdb_5000_credits.csv')

# Preprocessing starts
result_df = preprocess(movies, credits)

# Creating the model

# Creating a Vectorizer object
cv = CountVectorizer(max_features=5000,stop_words='english')
# CountVectorizer runs a sparse matrix so we will convert it into a numpy array
vectors = cv.fit_transform(result_df['tags']).toarray()

similarity = cosine_similarity(vectors)

def fetch_poster(movie_id):
	url = "https://api.themoviedb.org/3/movie/{}?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US".format(movie_id)
	data = requests.get(url)
	data = data.json()
	poster_path = data['poster_path']

	if poster_path == None:
		return ""
	
	full_path = "https://image.tmdb.org/t/p/w500/" + poster_path
	return full_path

def recommend(id, df=result_df, similarity=similarity):
	L = { 'movies': [] }
	movie_index = df.index.get_loc(df[df['id'] == id].index[0])
	distances = similarity[movie_index]
	movies_list = sorted(list(enumerate(distances)),reverse=True,key=lambda x: x[1])[1:11]

	for i in movies_list:
		index = movies[movies['id'] == df.loc[i[0]].id].index[0]
		movie_poster = fetch_poster(movies.loc[index].id)

		if movie_poster == "":
			continue

		L['movies'].append({
			'id': int(movies.loc[index].id),
			'title': str(movies.loc[index].title),
			'image': movie_poster,
			'overview': str(movies.loc[index].overview),
			'genres': movies.loc[index].genres,
			'runtime': int(movies.loc[index].runtime),
			'revenue': int(movies.loc[index].revenue),
			'releaseDate': str(movies.loc[index].release_date),
			'tagline': str(movies.loc[index].tagline)
			})
	
	return L

def recommend_by_description(description):
	description = description.lower()
	new_df = {'id': -1, 'title': 'user_defined_description', 'tags': description}

	main_df = result_df.append(new_df, ignore_index=True)

	# Creating a Vectorizer object
	cv = CountVectorizer(max_features=2500,stop_words='english')
	# CountVectorizer runs a sparse matrix so we will convert it into a numpy array
	vectors = cv.fit_transform(main_df['tags']).toarray()
	
	similarity = cosine_similarity(vectors)

	return recommend(-1, main_df, similarity)