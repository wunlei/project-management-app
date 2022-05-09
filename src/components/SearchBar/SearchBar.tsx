import { Button, IconButton, Stack, TextField } from '@mui/material';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';

function SearchBar() {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <TextField
        id="search-input"
        label="Search"
        variant="outlined"
        type="text"
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.06)',
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
