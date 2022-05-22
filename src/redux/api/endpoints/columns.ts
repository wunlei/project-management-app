import { apiSlice } from '../apiSlice';
import * as Types from '../apiTypes';

const api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllColumns: builder.query<
      Types.GetAllColumnsResult,
      Types.GetAllColumnsArg
    >({
      query: (arg) => `/boards/${arg.boardId}/columns`,
      providesTags: ['COLUMNS'],
      transformResponse: (response: Types.GetAllColumnsResult) =>
        response.sort((a, b) => a.order - b.order),
    }),
    getColumn: builder.query<Types.GetColumnResult, Types.GetColumnArg>({
      query: (arg) => `/boards/${arg.boardId}/columns/${arg.columnId}`,
      providesTags: ['COLUMN'],
    }),
    createColumn: builder.mutation<
      Types.CreateColumnResult,
      Types.CreateColumnArg
    >({
      query: (arg) => ({
        url: `/boards/${arg.boardId}/columns`,
        method: 'POST',
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
        responseHandler: (response) => response.text(),
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
        body: arg.body,
      }),
      invalidatesTags: ['COLUMNS', 'COLUMN', 'BOARD'],
    }),
  }),
});

export const {
  useGetAllColumnsQuery,
  useGetColumnQuery,
  useCreateColumnMutation,
  useDeleteColumnMutation,
  useUpdateColumnMutation,
} = api;
