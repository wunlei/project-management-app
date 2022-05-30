import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import BoardTask from 'components/BoardTask/BoardTask';
import { TaskFromServerExpanded } from 'redux/api/apiTypes';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

it('should render with provided data', () => {
  const data = {
    user: 'Name',
    task: {},
    handleTaskEditModalOpen: () => {},
    handleTaskDeleteConfirmOpen: () => {},
  };
  const card = renderer
    .create(
      <BrowserRouter>
        <BoardTask
          user={data.user}
          task={data.task as TaskFromServerExpanded}
          handleTaskEditModalOpen={data.handleTaskEditModalOpen}
          handleTaskDeleteConfirmOpen={data.handleTaskDeleteConfirmOpen}
        />
      </BrowserRouter>
    )
    .toJSON();
  expect(card).toMatchSnapshot();
});
