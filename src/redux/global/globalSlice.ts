import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GlobalSlice, Language } from './globalTypes';

const initialState: GlobalSlice = {
  userId: localStorage.getItem('userId'),
  language: (localStorage.getItem('language') as Language) || 'en',
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string | null>) => {
      if (action.payload) {
        localStorage.setItem('userId', action.payload);
      } else {
        localStorage.removeItem('userId');
      }
      state.userId = action.payload;
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      localStorage.setItem('language', action.payload);
      state.language = action.payload;
    },
  },
});

const { reducer, actions } = globalSlice;

export const { setLanguage, setUserId } = actions;

export default reducer;
