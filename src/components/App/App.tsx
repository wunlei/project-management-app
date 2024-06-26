import { Outlet, useMatch } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import AppAlert from 'components/AppAlert/AppAlert';
import { team } from 'constants/appConstants';

function App() {
  const isOnBoard = useMatch('/projects/:id');
  return (
    <div className="App">
      <Stack
        sx={{
          minHeight: isOnBoard ? 'unset' : '100vh',
          height: isOnBoard ? 'calc(100vh - 17px)' : 'unset',
          // marginTop: isOnBoard ? '8.5px' : 'unset',
        }}
        justifyContent="space-between"
      >
        <Header />
        <AppAlert />
        <Outlet />
        <Footer data={team} />
      </Stack>
    </div>
  );
}

export default App;
