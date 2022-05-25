import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { alertType, GlobalSlice, Language } from './globalTypes';

const initialState: GlobalSlice = {
  userId: localStorage.getItem('userId'),
  token: localStorage.getItem('token'),
  language: (localStorage.getItem('language') as Language) || 'en',
  isAlerts: false,
  alertMessage: 'Something went wrong!',
  alertType: 'error',
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
    setIsAlert: (state, action: PayloadAction<boolean>) => {
      state.isAlerts = action.payload;
    },
    setAlertMessage: (state, action: PayloadAction<string>) => {
      state.alertMessage = action.payload;
    },
    setAlertType: (state, action: PayloadAction<alertType>) => {
      state.alertType = action.payload;
    },
  },
});

const { reducer, actions } = globalSlice;

export const {
  setLanguage,
  setUserId,
  setToken,
  setIsAlert,
  setAlertType,
  setAlertMessage,
} = actions;

export default reducer;
