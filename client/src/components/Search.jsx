import React from 'react'
import { Container } from '@mui/material'
import { CssTextField } from './MaterialComponents'
import '../styles/search.css'

function Search({ description, setDescription, onSubmit }) {
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
      <Container maxWidth="lg" style={{ height: '100%' }}>
        <div className='search-large-container'>
          <h2 className='website-title'>MoviePedia</h2>
          <div className='search-large-inner-container'>
            <div className='input-container'>
              <CssTextField
                id='description'
                label='Search for your favourite movie'
                fullWidth
                value={description}
                onKeyUp={onKeyUp}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Search