import { apiSlice } from '../apiSlice';
import * as Types from '../apiTypes';
import getCurrentUserId from 'utils/api/getCurrentUserUd';

const api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTasks: builder.query<Types.GetAllTasksResult, Types.GetAllTasksArg>({
      query: (arg) => `/boards/${arg.boardId}/columns/${arg.columnId}/tasks`,
      providesTags: ['TASKS'],
    }),
    getTask: builder.query<Types.GetTaskResult, Types.GetTaskArg>({
      query: (arg) =>
        `/boards/${arg.boardId}/columns/${arg.columnId}/tasks/${arg.taskId}`,
      providesTags: ['TASK'],
    }),
    createTask: builder.mutation<Types.CreateTaskResult, Types.CreateTaskArg>({
      query: (arg) => ({
        url: `/boards/${arg.boardId}/columns/${arg.columnId}/tasks`,
        method: 'POST',
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
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['TASKS', 'TASK', 'COLUMN', 'BOARD'],
    }),
    updateTask: builder.mutation<Types.UpdateTaskResult, Types.UpdateTaskArg>({
      query: (arg) => ({
        url: `/boards/${arg.boardId}/columns/${arg.columnId}/tasks/${arg.taskId}`,
        method: 'PUT',
        body: arg.body.userId
          ? arg.body
          : { ...arg.body, userId: getCurrentUserId() },
      }),
      invalidatesTags: ['TASKS', 'TASK', 'COLUMN', 'BOARD'],
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = api;
