import ast

def convert(obj):
	L = []
	for i in ast.literal_eval(obj):
		L.append(i['name'])
	return L

def convert3(obj):
	L = []
	counter = 0
	for i in ast.literal_eval(obj):
		if counter != 3:
			L.append(i['name'])
			counter+=1
		else:
			break
	return L

def fetch_director(obj):
	L = []
	for i in ast.literal_eval(obj):
		if i['job'] == 'Director':
			L.append(i['name'])
			break
	return L

def preprocess(movies, credits):
	movies = movies.merge(credits, on='title')

	# genres, title, keywords, cast, crew, id, overview
	movies = movies[['id', 'title', 'overview','keywords','genres','cast','crew']]

	movies.dropna(inplace=True)

	movies['genres'] = movies['genres'].apply(convert)
	movies['keywords'] = movies['keywords'].apply(convert)
	movies['cast'] = movies['cast'].apply(convert3)
	movies['crew'] = movies['crew'].apply(fetch_director)
	movies['overview'] = movies['overview'].apply(lambda x:x.split())

	# movies['genres'] = movies['genres'].apply(lambda x:[i.replace(" ","") for i in x])
	# movies['keywords'] = movies['keywords'].apply(lambda x:[i.replace(" ","") for i in x])
	# movies['crew'] = movies['crew'].apply(lambda x:[i.replace(" ","") for i in x])
	# movies['cast'] = movies['cast'].apply(lambda x:[i.replace(" ","") for i in x])

	# now creating a new Tags column and which will be the concatenation of overview, genres, keywords, cast, crew
	movies['tags'] = movies['title'].apply((lambda x:x.split())) + movies['overview'] + movies['keywords'] + movies['genres'] + movies['cast'] + movies['crew']

	# creating new dataframe
	new_df = movies[['id', 'title', 'tags']]

	# now converting the list into string
	new_df['tags'] = new_df['tags'].apply(lambda x: " ".join(x))
	# converting everything into lower case -> recommended to do so
	new_df['tags'] = new_df['tags'].apply(lambda x: x.lower())

	return new_df