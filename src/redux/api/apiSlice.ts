import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getToken from 'utils/api/getToken';

export const baseUrl = 'http://localhost:4000';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { endpoint }) => {
      const endpointsWithoutToken = ['signIn', 'signUp'];

      if (endpointsWithoutToken.includes(endpoint)) {
        return headers;
      }

      headers.set('authorization', `Bearer ${getToken()}`);
      return headers;
    },
  }),
  tagTypes: [
    'USER',
    'USERS',
    'BOARD',
    'BOARDS',
    'COLUMN',
    'COLUMNS',
    'TASK',
    'TASKS',
  ],
  endpoints: () => ({}),
});
