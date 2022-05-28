import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material'

export const CssTextField = styled(TextField)({
  '& label': {
    color: 'white'
  },
  '& label.Mui-focused': {
    color: '#E50914',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#E50914',
  },
  '& .MuiOutlinedInput-root': {
    color: 'white',
    '& fieldset': {
      borderColor: '#E50914',
      borderRadius: '50px',
    },
    '&:hover fieldset': {
      borderColor: '#E50914',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#E50914',
    },
  },
});