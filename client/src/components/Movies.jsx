import React from 'react'
import { Container, Grid } from '@mui/material'
import { CssTextField } from './MaterialComponents'
import MovieCard from './MovieCard'
import '../styles/movies.css'

function Movies({ movies, description, setDescription, onSubmit, onSelectMovie }) {
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
        <div className='movies-input-search-container'>
          <CssTextField
            id='description'
            label='Search for your favourite movie'
            fullWidth
            value={description}
            onKeyUp={onKeyUp}
            onChange={onChange}
          />
        </div>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          rowSpacing={4}
          columnSpacing={8}
        >
          {movies.map((movie, index) => (
            <Grid key={index} item lg={4} md={6} sm={12} xs={12}>
              <MovieCard movie={movie} onSelectMovie={onSelectMovie} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default Movies;