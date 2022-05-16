import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GlobalSlice, Language } from './globalTypes';

const initialState: GlobalSlice = {
  userId: null,
  language: 'en',
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload;
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
  },
});

const { reducer, actions } = globalSlice;

export const { setLanguage, setUserId } = actions;

export default reducer;
