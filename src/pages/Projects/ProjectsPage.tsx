import {
  Box,
  Container,
  Menu,
  MenuItem,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ProjectCard from 'components/ProjectCard/ProjectCard';
import SearchBar from 'components/SearchBar/SearchBar';
import { useGetAllBoardsExpandedQuery } from 'redux/api/endpoints/boards';
import { useRef, useState } from 'react';

import { Link } from 'react-router-dom';

import { ReactComponent as BoardIcon } from 'assets/icons/clipboard.svg';
import { ReactComponent as TaskIcon } from 'assets/icons/file-text.svg';
import useSearch from './useSearch';

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

function ProjectsPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const menuRef = useRef<HTMLInputElement>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = () => {
    setAnchorEl(menuRef.current);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    data: boards,
    isFetching,
    isLoading,
    isSuccess,
  } = useGetAllBoardsExpandedQuery();

  const { filteredValues, handleQueryUpdate } = useSearch({
    boards,
    searchQuery,
  });

  return (
    <Container
      component="main"
      sx={{ flexGrow: 1 }}
      fixed={false}
      maxWidth={false}
    >
      <Stack spacing={3} alignItems="center">
        <Typography variant="h3" fontWeight="bold">
          {t('Projects')}
        </Typography>
        <SearchBar
          query={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          onClick={() => {
            handleQueryUpdate();
            handleClick();
          }}
          menuRef={menuRef}
        />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
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
                onClick={handleClose}
                disableRipple
                key={el.url}
                component={Link}
                to={el.url}
              >
                <Stack direction={'row'} spacing={3}>
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
                    {el.where}
                  </Typography>
                </Stack>
              </MenuItem>
            ))}
        </Menu>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            columnGap: '1rem',
            rowGap: '1rem',
            width: '100%',
          }}
        >
          {boards &&
            boards.map((el) => (
              <ProjectCard
                key={el.id}
                title={el.title}
                description={'desc'}
                boardId={el.id}
                onDelete={() => {}}
              ></ProjectCard>
            ))}
        </Box>
      </Stack>
    </Container>
  );
}

export default ProjectsPage;
