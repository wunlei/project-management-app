import { Button, Stack, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import grey from '@mui/material/colors/grey';
import { SearchBarProps } from './SearchBar.types';

function SearchBar(props: SearchBarProps) {
  const { query, onChange, onClick, menuRef } = props;
  const { t } = useTranslation();

  return (
    <Stack direction="row" justifyContent="center" spacing={1} width="100%">
      <TextField
        ref={menuRef}
        id="search-input"
        label={t('Search')}
        variant="outlined"
        type="text"
        value={query}
        onChange={onChange}
        sx={{
          backgroundColor: grey[200],
          maxWidth: '300px',
          width: '100%',
        }}
        size="small"
      />
      <Button variant="contained" sx={{ padding: '0.5rem' }} onClick={onClick}>
        <SearchIcon />
      </Button>
    </Stack>
  );
}

export default SearchBar;
