import { Outlet } from 'react-router-dom';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import Stack from '@mui/material/Stack';
import { team } from 'constants/appConstants';

function App() {
  return (
    <div className="App">
      <Stack height="100vh" justifyContent="space-between">
        <Header />
        <Outlet />
        <Footer data={team} />
      </Stack>
    </div>
  );
}

export default App;
