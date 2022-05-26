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
import { useGetAllUsersQuery } from 'redux/api/endpoints/users';

interface IFilteredValues {
  url: string;
  title: string;
  type: string;
  where: string;
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

  const [filteredValues, setFilteredValues] = useState<
    null | IFilteredValues[]
  >(null);

  const {
    data: boards,
    isFetching,
    isLoading,
    isSuccess,
  } = useGetAllBoardsExpandedQuery();

  const { data: users } = useGetAllUsersQuery();

  //todo: user names by id
  //loader and errors
  //add task view

  const handleQueryUpdate = () => {
    if (searchQuery === '') {
      return;
    }
    if (boards && users) {
      const array: IFilteredValues[] = [];
      boards.forEach((board) => {
        const regex = new RegExp(searchQuery, 'gi');
        if (regex.test(board.title)) {
          array.push({
            url: `${board.id}`,
            title: board.title,
            type: 'board',
            where: '',
          });
          return;
        }
        // const descr = regex.test(el.description)

        for (const column of board.columns) {
          for (const task of column.tasks) {
            const user = users.find((el) => el.id === task.userId);
            const username = user?.name || '';
            const userlogin = user?.login || '';
            if (
              regex.test(task.title) ||
              regex.test(task.description) ||
              regex.test(username) ||
              regex.test(userlogin)
            ) {
              array.push({
                url: `task/${task.id}`,
                title: task.title,
                type: 'task',
                where: board.title,
              });
              return;
            }
          }
        }
      });

      console.log(array);
      if (array.length === 0) {
        array.push({
          url: ``,
          title: 'nothing found',
          type: '',
          where: '',
        });
      }
      setFilteredValues(array);
    } else {
      throw new Error();
    }
  };

  return (
    <Container component="main" sx={{ flexGrow: 1 }}>
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
                  <SvgIcon>
                    {el.type === 'board' ? <BoardIcon /> : null}
                    {el.type === 'task' ? <TaskIcon /> : null}
                  </SvgIcon>
                  <Typography fontWeight={700}>{el.title}</Typography>
                  <Typography>{el.where}</Typography>
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
