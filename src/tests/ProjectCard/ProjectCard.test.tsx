import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import ProjectCard from 'components/ProjectCard/ProjectCard';

it('should render with provided data', () => {
  const data = {
    onDelete: () => {},
    onEdit: () => {},
    title: 'My Project',
    description: 'Project description',
    boardId: '1',
  };
  const card = renderer
    .create(
      <BrowserRouter>
        <ProjectCard
          onDelete={data.onDelete}
          onEdit={data.onEdit}
          title={data.title}
          description={data.description}
          boardId={data.boardId}
        />
      </BrowserRouter>
    )
    .toJSON();
  expect(card).toMatchSnapshot();
});
