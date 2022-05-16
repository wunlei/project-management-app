import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

import { setLanguage, setUserId } from 'redux/global/globalSlice';
import { Language } from 'redux/global/globalTypes';

function App() {
  const { userId, language } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedUserId = localStorage.getItem('userId');
    const savedLanguage = localStorage.getItem('language') as Language;

    if (savedUserId) {
      dispatch(setUserId(savedUserId));
    }
    if (savedLanguage) {
      dispatch(setLanguage(savedLanguage));
    }
    return () => {
      if (userId) {
        localStorage.setItem('userId', userId);
      }
      localStorage.setItem('language', language);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
