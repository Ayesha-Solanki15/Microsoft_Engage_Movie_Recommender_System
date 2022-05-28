import React from 'react'
import { Container, Grid } from '@mui/material'
import { CssTextField } from './MaterialComponents'
import MovieCard from './MovieCard'
import useWindowDimensions from '../hooks/useWindowDimensions'
import { convertTime, convertGenres, convertRevenue } from '../utils/convertUtils'
import '../styles/movie.css'

function Movie({ movie, recommendations, searchRecommendations, onSelectMovie, description, setDescription, onSubmit }) {
  const { title, image, overview, genres, runtime, releaseDate, revenue } = movie
  const { width } = useWindowDimensions()

  const onKeyUp = (e) => {
    if (e.keyCode === 13 && description.length > 0) {
      onSubmit()
    }
  }

  const onChange = (e) => {
    setDescription(e.target.value)
  }

  return (
    <>
      <Container maxWidth="lg">
        <div className='movie-input-search-container'>
          <CssTextField
            id='description'
            label='Search for your favourite movie'
            fullWidth
            value={description}
            onKeyUp={onKeyUp}
            onChange={onChange}
          />
        </div>
        <div className='movie-container'>
          <img src={image} alt={title} className='movie-image' />
          <div className='movie-details-container'>
            <div className='movie-title-container'>
              <h2 className='movie-title red'>{title}</h2>
              <p className='movie-overview'>Genres: <em>{convertGenres(genres)}</em></p>
            </div>
            <p className='movie-overview'><em>{overview}</em></p>
            <p className='movie-overview'>Revenue: <em>{convertRevenue(revenue)}</em></p>
            <p className='movie-overview'>Release Date: <em>{releaseDate}</em></p>
            <p className='movie-overview'>Runtime: <em>{convertTime(runtime)}</em></p>
          </div>
        </div>
        <div className='movie-recommendation-container'>
          <h2 className='recommendation-title'>Movies You May Like</h2>
          <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          rowSpacing={4}
          columnSpacing={8}
          >
            {recommendations.slice(0, 8).map((movie, index) => (
              <Grid key={index} item lg={3} md={6} sm={6} xs={6}>
                <MovieCard movie={movie} onSelectMovie={onSelectMovie} minWidth="100%" height={width > 768 ? "18rem" : "12rem"} />
              </Grid>
            ))}
          </Grid>
        </div>
        <div className='movie-recommendation-container'>
          <h2 className='recommendation-title'>Based On Your Search History</h2>
          <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          rowSpacing={4}
          columnSpacing={8}
          >
            {searchRecommendations.slice(0, 8).map((movie, index) => (
              <Grid key={index} item lg={3} md={6} sm={6} xs={6}>
                <MovieCard movie={movie} onSelectMovie={onSelectMovie} minWidth="100%" height={width > 768 ? "18rem" : "12rem"} />
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </>
  )
}

export default Movie;