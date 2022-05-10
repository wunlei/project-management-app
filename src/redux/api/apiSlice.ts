import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as Types from './apiTypes';

function getCurrentUserId() {
  const userId = localStorage.getItem('userId');
  if (!userId) throw new Error('UserId is missing in local storage');

  return userId;
}

export function getToken() {
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

export const baseUrl = 'http://localhost:4000';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
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
      invalidatesTags: ['USERS'],
    }),
    // USERS -----
    getAllUsers: builder.query<Types.GetAllUsersResult, Types.GetAllUsersArg>({
      query: () => ({
        url: '/users',
        headers: getBasicHeaders(),
      }),
      providesTags: ['USERS'],
    }),
    getUser: builder.query<Types.GetUserResult, Types.GetUserArg>({
      query: (arg) => ({
        url: `/users/${arg.userId ? arg.userId : getCurrentUserId()}`,
        headers: getBasicHeaders(),
      }),
      providesTags: ['USER'],
    }),
    deleteUser: builder.mutation<Types.DeleteUserResult, Types.DeleteUserArg>({
      query: (arg) => ({
        url: `users/${arg.userId ? arg.userId : getCurrentUserId()}`,
        method: 'DELETE',
        headers: getBasicHeaders(),
      }),
      invalidatesTags: ['USERS', 'USER'],
    }),
    updateUser: builder.mutation<Types.UpdateUserResult, Types.UpdateUserArg>({
      query: (arg) => ({
        url: `users/${arg.userId ? arg.userId : getCurrentUserId()}`,
        method: 'PUT',
        headers: getBasicHeaders(),
        body: arg.body,
      }),
      invalidatesTags: ['USERS', 'USER'],
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
      providesTags: ['BOARDS'],
    }),
    getBoard: builder.query<Types.GetBoardResult, Types.GetBoardArg>({
      query: (arg) => ({
        url: `/boards/${arg.boardId}`,
        headers: getBasicHeaders(),
      }),
      providesTags: ['BOARD'],
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
      invalidatesTags: ['BOARDS'],
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
      invalidatesTags: ['BOARDS', 'BOARD'],
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
      invalidatesTags: ['BOARDS', 'BOARD'],
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
      providesTags: ['COLUMNS'],
    }),
    getColumn: builder.query<Types.GetColumnResult, Types.GetColumnArg>({
      query: (arg) => ({
        url: `/boards/${arg.boardId}/columns/${arg.columnId}`,
        headers: getBasicHeaders(),
      }),
      providesTags: ['COLUMN'],
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
      invalidatesTags: ['COLUMNS', 'BOARD'],
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
      invalidatesTags: ['COLUMNS', 'COLUMN', 'BOARD'],
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
      invalidatesTags: ['COLUMNS', 'COLUMN', 'BOARD'],
    }),
    // TASKS -----
    getAllTasks: builder.query<Types.GetAllTasksResult, Types.GetAllTasksArg>({
      query: (arg) => ({
        url: `/boards/${arg.boardId}/columns/${arg.columnId}/tasks`,
        headers: getBasicHeaders(),
      }),
      providesTags: ['TASKS'],
    }),
    getTask: builder.query<Types.GetTaskResult, Types.GetTaskArg>({
      query: (arg) => ({
        url: `/boards/${arg.boardId}/columns/${arg.columnId}/tasks/${arg.taskId}`,
        headers: getBasicHeaders(),
      }),
      providesTags: ['TASK'],
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
      invalidatesTags: ['TASKS', 'COLUMN', 'BOARD'],
    }),
    deleteTask: builder.mutation<Types.DeleteTaskResult, Types.DeleteTaskArg>({
      query: (arg) => ({
        url: `/boards/${arg.boardId}/columns/${arg.columnId}/tasks/${arg.taskId}`,
        method: 'DELETE',
        headers: getBasicHeaders(),
      }),
      invalidatesTags: ['TASKS', 'TASK', 'COLUMN', 'BOARD'],
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
      invalidatesTags: ['TASKS', 'TASK', 'COLUMN', 'BOARD'],
    }),
    // FILE -----
    uploadFile: builder.mutation<string, Types.UploadFileArg>({
      query: (arg) => {
        const body = new FormData();
        body.append('taskId', arg.taskId);
        body.append('file', arg.file);

        return {
          url: '/file',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
          body,
        };
      },
      invalidatesTags: ['TASKS', 'TASK', 'COLUMN', 'BOARD'],
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
export const { useUploadFileMutation } = apiSlice;
