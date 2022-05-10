import { apiSlice } from '../apiSlice';
import * as Types from '../apiTypes';

const api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<Types.SignInResult, Types.SignInArg>({
      query: (arg) => ({
        url: '/signin',
        method: 'POST',
        body: arg.body,
      }),
    }),
    signUp: builder.mutation<Types.SignUpResult, Types.SignUpArg>({
      query: (arg) => ({
        url: '/signup',
        method: 'POST',
        body: arg.body,
      }),
      invalidatesTags: ['USERS'],
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = api;
