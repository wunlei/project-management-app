import { Button, Stack, TextField } from '@mui/material';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import grey from '@mui/material/colors/grey';

function SearchBar() {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <TextField
        id="search-input"
        variant="outlined"
        type="text"
        sx={{
          backgroundColor: grey[200],
          maxWidth: '300px',
          width: '100%',
        }}
        size="small"
      />
      <Button variant="contained" sx={{ padding: '0.5rem' }}>
        <SearchIcon />
      </Button>
    </Stack>
  );
}

export default SearchBar;
