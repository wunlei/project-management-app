import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as Types from './apiTypes';

function getCurrentUserId() {
  const userId = localStorage.getItem('userId');
  if (!userId) throw new Error('UserId is missing in local storage');

  return userId;
}

function getToken() {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token is missing in local storage');

  return token;
}

function getBasicHeaders() {
  return {
    Authorization: `Bearer ${getToken()}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
}

const baseUrl = 'http://localhost:4000';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    singIn: builder.mutation<Types.SignInResult, Types.SignInArg>({
      query: (arg) => ({
        url: '/signin',
        method: 'POST',
        body: arg.body,
      }),
    }),
    singUp: builder.mutation<Types.SignUpResult, Types.SignUpArg>({
      query: (arg) => ({
        url: '/signup',
        method: 'POST',
        body: arg.body,
      }),
    }),
    // USERS -----
    getAllUsers: builder.query<Types.GetAllUsersResult, Types.GetAllUsersArg>({
      query: () => ({
        url: '/users',
        headers: getBasicHeaders(),
      }),
    }),
    getUser: builder.query<Types.GetUserResult, Types.GetUserArg>({
      query: (arg) => ({
        url: `/users/${arg.userId ? arg.userId : getCurrentUserId()}`,
        headers: getBasicHeaders(),
      }),
    }),
    deleteUser: builder.mutation<Types.DeleteUserResult, Types.DeleteUserArg>({
      query: (arg) => ({
        url: `users/${arg.userId ? arg.userId : getCurrentUserId()}`,
        method: 'DELETE',
        headers: getBasicHeaders(),
      }),
    }),
    updateUser: builder.mutation<Types.UpdateUserResult, Types.UpdateUserArg>({
      query: (arg) => ({
        url: `users/${arg.userId ? arg.userId : getCurrentUserId()}`,
        method: 'PUT',
        headers: getBasicHeaders(),
        body: arg.body,
      }),
    }),
    // BOARDS -----
    getAllBoards: builder.query<
      Types.GetAllBoardsResult,
      Types.GetAllBoardsArg
    >({
      query: () => ({
        url: '/boards',
        headers: getBasicHeaders(),
      }),
    }),
    getBoard: builder.query<Types.GetBoardResult, Types.GetBoardArg>({
      query: (arg) => ({
        url: `/boards/${arg.boardId}`,
        headers: getBasicHeaders(),
      }),
    }),
    createBoard: builder.mutation<
      Types.CreateBoardResult,
      Types.CreateBoardArg
    >({
      query: (arg) => ({
        url: `/boards`,
        method: 'POST',
        headers: getBasicHeaders(),
        body: arg.body,
      }),
    }),
    deleteBoard: builder.mutation<
      Types.DeleteBoardResult,
      Types.DeleteBoardArg
    >({
      query: (arg) => ({
        url: `boards/${arg.boardId}`,
        method: 'DELETE',
        headers: getBasicHeaders(),
      }),
    }),
    updateBoard: builder.mutation<
      Types.UpdateBoardResult,
      Types.UpdateBoardArg
    >({
      query: (arg) => ({
        url: `users/${arg.boardId}`,
        method: 'PUT',
        headers: getBasicHeaders(),
        body: arg.body,
      }),
    }),
    // COLUMNS -----
    getAllColumns: builder.query<
      Types.GetAllColumnsResult,
      Types.GetAllColumnsArg
    >({
      query: (arg) => ({
        url: `/boards/${arg.boardId}/columns`,
        headers: getBasicHeaders(),
      }),
    }),
    getColumn: builder.query<Types.GetColumnResult, Types.GetColumnArg>({
      query: (arg) => ({
        url: `/boards/${arg.boardId}/columns/${arg.columnId}`,
        headers: getBasicHeaders(),
      }),
    }),
    createColumn: builder.mutation<
      Types.CreateColumnResult,
      Types.CreateColumnArg
    >({
      query: (arg) => ({
        url: `/boards/${arg.boardId}/columns`,
        method: 'POST',
        headers: getBasicHeaders(),
        body: arg.body,
      }),
    }),
    deleteColumn: builder.mutation<
      Types.DeleteColumnResult,
      Types.DeleteColumnArg
    >({
      query: (arg) => ({
        url: `/boards/${arg.boardId}/columns/${arg.columnId}`,
        method: 'DELETE',
        headers: getBasicHeaders(),
      }),
    }),
    updateColumn: builder.mutation<
      Types.UpdateColumnResult,
      Types.UpdateColumnArg
    >({
      query: (arg) => ({
        url: `/boards/${arg.boardId}/columns/${arg.columnId}`,
        method: 'PUT',
        headers: getBasicHeaders(),
        body: arg.body,
      }),
    }),
    // TASKS -----
    getAllTasks: builder.query<Types.GetAllTasksResult, Types.GetAllTasksArg>({
      query: (arg) => ({
        url: `/boards/${arg.boardId}/columns/${arg.columnId}/tasks`,
        headers: getBasicHeaders(),
      }),
    }),
    getTask: builder.query<Types.GetTaskResult, Types.GetTaskArg>({
      query: (arg) => ({
        url: `/boards/${arg.boardId}/columns/${arg.columnId}/tasks/${arg.taskId}`,
        headers: getBasicHeaders(),
      }),
    }),
    createTask: builder.mutation<Types.CreateTaskResult, Types.CreateTaskArg>({
      query: (arg) => ({
        url: `/boards/${arg.boardId}/columns/${arg.columnId}/tasks`,
        method: 'POST',
        headers: getBasicHeaders(),
        body: arg.body.userId
          ? arg.body
          : { ...arg.body, userId: getCurrentUserId() },
      }),
    }),
    deleteTask: builder.mutation<Types.DeleteTaskResult, Types.DeleteTaskArg>({
      query: (arg) => ({
        url: `/boards/${arg.boardId}/columns/${arg.columnId}/tasks/${arg.taskId}`,
        method: 'DELETE',
        headers: getBasicHeaders(),
      }),
    }),
    updateTask: builder.mutation<Types.UpdateTaskResult, Types.UpdateTaskArg>({
      query: (arg) => ({
        url: `/boards/${arg.boardId}/columns/${arg.columnId}/tasks/${arg.taskId}`,
        method: 'PUT',
        headers: getBasicHeaders(),
        body: arg.body.userId
          ? arg.body
          : { ...arg.body, userId: getCurrentUserId() },
      }),
    }),
  }),
});

export const { useSingInMutation, useSingUpMutation } = apiSlice;
export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = apiSlice;
export const {
  useGetAllBoardsQuery,
  useGetBoardQuery,
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useUpdateBoardMutation,
} = apiSlice;
export const {
  useGetAllColumnsQuery,
  useGetColumnQuery,
  useCreateColumnMutation,
  useDeleteColumnMutation,
  useUpdateColumnMutation,
} = apiSlice;
export const {
  useGetAllTasksQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = apiSlice;
