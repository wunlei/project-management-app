import grey from '@mui/material/colors/grey';

const scrollStyle = {
  scrollbarColor: `${grey[400]} ${grey[200]}`,
  scrollbarWidth: 'thin',
  '&::-webkit-scrollbar': {
    width: '10px',
    height: '10px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: grey[200],
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: grey[400],
  },
};
export default scrollStyle;
