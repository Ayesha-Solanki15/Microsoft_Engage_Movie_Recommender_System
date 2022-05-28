import React from 'react'
import { Card } from '@mui/material'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import useWindowDimensions from '../hooks/useWindowDimensions'
import { convertTime, convertGenres } from '../utils/convertUtils'
import '../styles/moviecard.css'

function MovieCard({ movie, onSelectMovie, minWidth, height }) {
  const { title, image, runtime, releaseDate, genres } = movie
  const { width } = useWindowDimensions()

  return (
    <>
      <div className='movie-card-container' onClick={() => onSelectMovie(movie)}>
        <Card sx={{ minWidth: minWidth || '80%' }}>
          <div className='movie-card-inner-body' style={{ background: `url(${image}) no-repeat center center/cover`, height: height || '22rem' }}>
            <div className='movie-card-overlay'>
              <div>
                <h4 className='card-title'>{title}</h4>
                <p className='card-overview'>Genres: <em>{convertGenres(genres)}</em></p>
              </div>
              <div className='card-icon-area'>
                <PlayCircleOutlineIcon sx={{ fontSize: width > 768 ? '4rem' : '2rem' }} />
              </div>
              <div className='card-duration-area'>
                <div>
                  <p>Release Date:</p>
                  <p>{releaseDate}</p>
                </div>
                <div>
                  <p>Movie Duration:</p>
                  <p>{convertTime(runtime)}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}

export default MovieCard;