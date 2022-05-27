import { useState } from 'react';
import { BoardFromServerExpanded } from 'redux/api/apiTypes';
import { useGetAllUsersQuery } from 'redux/api/endpoints/users';

interface IFilteredValues {
  url: string;
  title: string;
  type: string;
  where: string;
}

interface useSearchProps {
  boards: BoardFromServerExpanded[] | undefined;
  searchQuery: string;
}

function useSearch({ boards, searchQuery }: useSearchProps) {
  const [filteredValues, setFilteredValues] = useState<
    null | IFilteredValues[]
  >(null);
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
          url: `#`,
          title: 'nothing found',
          type: 'none',
          where: '',
        });
      }
      setFilteredValues(array);
    } else {
      throw new Error();
    }
  };

  return { filteredValues, handleQueryUpdate };
}
export default useSearch;
