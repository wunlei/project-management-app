import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Menu,
  MenuItem,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from '@mui/material';

import { useGetAllBoardsExpandedQuery } from 'redux/api/endpoints/boards';
import useSearch from 'components/SearchBar/useSearch';
import grey from '@mui/material/colors/grey';

import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { ReactComponent as BoardIcon } from 'assets/icons/clipboard.svg';
import { ReactComponent as TaskIcon } from 'assets/icons/file-text.svg';

function getMenuItemIcon(type: string) {
  switch (type) {
    case 'task':
      return <TaskIcon />;
    case 'board':
      return <BoardIcon />;
    case 'none':
      return null;
  }
}

function SearchBar() {
  const { t } = useTranslation();

  const { currentData: boards, refetch } = useGetAllBoardsExpandedQuery();

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { filteredValues, handleQueryUpdate } = useSearch({
    boards,
    searchQuery,
  });

  const isMenuOpen = Boolean(menuAnchorEl);
  const menuRefEl = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    if (searchQuery) {
      refetch();
      handleQueryUpdate();
      setMenuAnchorEl(menuRefEl.current);
    }
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter') {
      if (searchQuery) {
        refetch();
        handleQueryUpdate();
        setMenuAnchorEl(menuRefEl.current);
      }
    }
  };

  return (
    <>
      <Stack direction="row" justifyContent="center" spacing={1} width="100%">
        <TextField
          id="search-input"
          label={t('Search')}
          type="text"
          variant="outlined"
          value={searchQuery}
          ref={menuRefEl}
          onChange={(e) => {
            setSearchQuery(e.target.value.trim());
          }}
          onKeyUp={handleKeyUp}
          sx={{
            backgroundColor: grey[200],
            maxWidth: '300px',
            width: '100%',
          }}
          size="small"
        />
        <Button
          variant="contained"
          sx={{ padding: '0.5rem' }}
          onClick={handleSearchClick}
        >
          <SearchIcon />
        </Button>
      </Stack>
      <Menu
        id="search-menu"
        open={isMenuOpen}
        onClose={handleMenuClose}
        anchorEl={menuAnchorEl}
        MenuListProps={{
          'aria-labelledby': 'search-button',
        }}
        sx={{
          '& .MuiMenu-paper': {
            maxWidth: '370px',
            width: '90%',
            boxShadow: 4,
          },
        }}
      >
        {filteredValues &&
          filteredValues.map((el) => (
            <MenuItem
              key={el.url}
              component={Link}
              to={el.url}
              disableRipple
              onClick={handleMenuClose}
              sx={{
                columnGap: 3,
              }}
            >
              <SvgIcon>{getMenuItemIcon(el.type)}</SvgIcon>
              <Typography
                fontWeight={700}
                sx={{ overflowWrap: 'anywhere', whiteSpace: 'normal' }}
              >
                {el.title}
              </Typography>
              <Typography
                sx={{ overflowWrap: 'anywhere', whiteSpace: 'normal' }}
              >
                {el.boardName}
              </Typography>
            </MenuItem>
          ))}
      </Menu>
    </>
  );
}

export default SearchBar;
