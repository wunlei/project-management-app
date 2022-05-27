import { useState } from 'react';
import { BoardFromServerExpanded } from 'redux/api/apiTypes';
import { useGetAllUsersQuery } from 'redux/api/endpoints/users';

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
  const { currentData: users } = useGetAllUsersQuery();

  const [filteredValues, setFilteredValues] = useState<IFilteredValues[]>([
    {
      url: `#`,
      title: 'nothing found',
      type: 'none',
      boardName: '',
    },
  ]);

  //loader and errors
  //add task view

  const handleQueryUpdate = () => {
    if (boards && users) {
      const searchResult: IFilteredValues[] = [];

      boards.forEach((board) => {
        const regex = new RegExp(searchQuery, 'gi');

        if (regex.test(board.title)) {
          searchResult.push({
            url: `${board.id}`,
            title: board.title,
            type: 'board',
            boardName: '',
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
              searchResult.push({
                url: `task/${task.id}`,
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
          title: 'nothing found',
          type: 'none',
          boardName: '',
        });
      }
      setFilteredValues(searchResult);
    } else {
      throw new Error();
    }
  };

  return { filteredValues, handleQueryUpdate };
}
export default useSearch;
