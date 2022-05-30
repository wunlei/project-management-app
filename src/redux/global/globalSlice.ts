import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserFromServer } from 'redux/api/apiTypes';
import { GlobalSlice, IAlertState, IUsers, Language } from './globalTypes';

const initialState: GlobalSlice = {
  userId: localStorage.getItem('userId'),
  token: localStorage.getItem('token'),
  language: (localStorage.getItem('language') as Language) || 'en',
  alertState: null,
  users: {},
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
    setToken: (state, action: PayloadAction<string | null>) => {
      if (action.payload) {
        localStorage.setItem('token', action.payload);
      } else {
        localStorage.removeItem('token');
      }
      state.token = action.payload;
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      localStorage.setItem('language', action.payload);
      state.language = action.payload;
    },
    setAlertState: (state, action: PayloadAction<IAlertState | null>) => {
      state.alertState = action.payload;
    },
    setUsersState: (state, action: PayloadAction<UserFromServer[]>) => {
      state.users = action.payload.reduce((acc: IUsers, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {});
    },
  },
});

const { reducer, actions } = globalSlice;

export const {
  setLanguage,
  setUserId,
  setToken,
  setAlertState,
  setUsersState,
} = actions;

export default reducer;
