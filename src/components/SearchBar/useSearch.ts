import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BoardFromServerExpanded } from 'redux/api/apiTypes';
import { useGetAllUsersQuery } from 'redux/api/endpoints/users';
import { setAlertState, setUsersState } from 'redux/global/globalSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

interface IFilteredValues {
  url: string;
  title: string;
  type: string;
  boardName: string;
}

interface useSearchProps {
  boards: BoardFromServerExpanded[] | undefined;
  searchQuery: string;
}

function useSearch({ boards, searchQuery }: useSearchProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { currentData: users } = useGetAllUsersQuery();
  const usersMap = useAppSelector((state) => state.global.users);

  const [filteredValues, setFilteredValues] = useState<IFilteredValues[]>([
    {
      url: `#`,
      title: t('Nothing found'),
      type: 'none',
      boardName: '',
    },
  ]);

  useEffect(() => {
    if (users) {
      dispatch(setUsersState(users));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  const handleQueryUpdate = () => {
    if (boards && users) {
      const searchResult: IFilteredValues[] = [];

      boards.forEach((board) => {
        const regex = new RegExp(searchQuery, 'gi');

        if (regex.test(board.title) || regex.test(board.description)) {
          searchResult.push({
            url: `${board.id}`,
            title: board.title,
            type: 'board',
            boardName: '',
          });
          return;
        }

        for (const column of board.columns) {
          for (const task of column.tasks) {
            const user = task.userId ? usersMap[task.userId] : null;
            const username = user?.name || '';
            const userlogin = user?.login || '';
            if (
              regex.test(task.title) ||
              regex.test(task.description) ||
              regex.test(username) ||
              regex.test(userlogin)
            ) {
              searchResult.push({
                url: `${board.id}`,
                title: task.title,
                type: 'task',
                boardName: board.title,
              });
              return;
            }
          }
        }
      });

      if (searchResult.length === 0) {
        searchResult.push({
          url: `#`,
          title: t('Nothing found'),
          type: 'none',
          boardName: '',
        });
      }
      setFilteredValues(searchResult);
    } else {
      dispatch(
        setAlertState({
          alertMessage: 'Something went wrong!',
          alertType: 'error',
        })
      );
    }
  };

  return { filteredValues, handleQueryUpdate };
}
export default useSearch;
