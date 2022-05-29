import { useState } from 'react';
import axios from 'axios'
import { Backdrop, CircularProgress } from '@mui/material';
import Search from './components/Search';
import Movies from './components/Movies';
import Movie from './components/Movie';
import Footer from './components/Footer';
import { addToSearchHistory, getSearchHistory } from './utils/searchHistoryUtils';
import './App.css';

function App() {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([])
  const [searchRecommendations, setSearchRecommendations] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null);

  const onSubmit = () => {
    setIsLoading(true)
    
    axios.post("api/recommend/movies", {
      description
    })
    .then((res) => {
      setSelectedMovie(null)
      setMovies(res.data.movies)
      addToSearchHistory(description)
      setIsLoading(false)
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false)
    })
  }

  const onSelectMovie = (movie) => {
    setIsLoading(true)

    axios.get(`api/recommend/movies/movie/${movie.id}`)
      .then((res) => {
        setMovies(res.data.movies)
        setSelectedMovie(movie)
        addToSearchHistory(movie.title + " " + movie.overview + " " + movie.tagline)
        setDescription("")

        axios.post("api/recommend/movies", {
          description: getSearchHistory()
        })
        .then((res) => {
          setSearchRecommendations(res.data.movies)
          setIsLoading(false)
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false)
        })
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false)
      })
  }

  const renderScreen = () => {
    if (selectedMovie) {
      return <Movie movie={selectedMovie} recommendations={movies} searchRecommendations={searchRecommendations} onSelectMovie={onSelectMovie} onSubmit={onSubmit} description={description} setDescription={setDescription} />
    }

    return movies.length > 0 ? (
      <Movies movies={movies} description={description} setDescription={setDescription} onSubmit={onSubmit} onSelectMovie={onSelectMovie} />
    ) : (
      <Search description={description} setDescription={setDescription} onSubmit={onSubmit} />
    );
  }

  return (
    <>
      <div style={{ background: 'rgba(0, 0, 0, 0.7)' }}>
        {renderScreen()}
        {movies.length === 0 && !selectedMovie && <Footer />}
        <Backdrop open={isLoading}>
          <CircularProgress />
        </Backdrop>
      </div>
    </>
  )
}

export default App;
