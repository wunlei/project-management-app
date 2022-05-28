import { apiSlice } from '../apiSlice';
import * as Types from '../apiTypes';

const api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBoards: builder.query<
      Types.GetAllBoardsResult,
      Types.GetAllBoardsArg
    >({
      query: () => '/boards',
      providesTags: ['BOARDS'],
    }),
    getBoard: builder.query<Types.GetBoardResult, Types.GetBoardArg>({
      query: (arg) => `/boards/${arg.boardId}`,
      providesTags: ['BOARD'],
    }),
    createBoard: builder.mutation<
      Types.CreateBoardResult,
      Types.CreateBoardArg
    >({
      query: (arg) => ({
        url: `/boards`,
        method: 'POST',
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
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ['BOARDS', 'BOARD'],
    }),
    updateBoard: builder.mutation<
      Types.UpdateBoardResult,
      Types.UpdateBoardArg
    >({
      query: (arg) => ({
        url: `boards/${arg.boardId}`,
        method: 'PUT',
        body: arg.body,
      }),
      invalidatesTags: ['BOARDS', 'BOARD'],
    }),
  }),
});

export const {
  useGetAllBoardsQuery,
  useGetBoardQuery,
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useUpdateBoardMutation,
} = api;
