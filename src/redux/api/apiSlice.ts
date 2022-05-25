import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import getToken from 'utils/api/getToken';
import { setUserId } from '../global/globalSlice';

export const baseUrl = 'http://localhost:4000';

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { endpoint }) => {
    const endpointsWithoutToken = ['signIn', 'signUp'];

    if (endpointsWithoutToken.includes(endpoint)) {
      return headers;
    }

    headers.set('authorization', `Bearer ${getToken()}`);
    return headers;
  },
});

const baseQueryWithErrorHandlers: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(setUserId(null));
    localStorage.removeItem('token');
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithErrorHandlers,
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
