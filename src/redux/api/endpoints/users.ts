import { apiSlice } from '../apiSlice';
import * as Types from '../apiTypes';
import getCurrentUserId from 'utils/api/getCurrentUserUd';

const api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<Types.GetAllUsersResult, Types.GetAllUsersArg>({
      query: () => '/users',
      providesTags: ['USERS'],
    }),
    getUser: builder.query<Types.GetUserResult, Types.GetUserArg>({
      query: (arg) => `/users/${arg.userId ? arg.userId : getCurrentUserId()}`,
      providesTags: ['USER'],
    }),
    deleteUser: builder.mutation<Types.DeleteUserResult, Types.DeleteUserArg>({
      query: (arg) => ({
        url: `users/${arg.userId ? arg.userId : getCurrentUserId()}`,
        method: 'DELETE',
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['USERS', 'USER'],
    }),
    updateUser: builder.mutation<Types.UpdateUserResult, Types.UpdateUserArg>({
      query: (arg) => ({
        url: `users/${arg.userId ? arg.userId : getCurrentUserId()}`,
        method: 'PUT',
        body: arg.body,
      }),
      invalidatesTags: ['USERS', 'USER'],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = api;
