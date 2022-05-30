import { apiSlice } from '../apiSlice';
import { setUserId, setToken } from 'redux/global/globalSlice';
import * as Types from '../apiTypes';
import { baseUrl } from '../apiSlice';
import getToken from 'utils/api/getToken';

const api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBoards: builder.query<
      Types.GetAllBoardsResult,
      Types.GetAllBoardsArg
    >({
      query: () => '/boards',
      providesTags: ['BOARDS'],
    }),
    getAllBoardsExpanded: builder.query<Types.GetBoardResult[], void>({
      async queryFn(_, { dispatch }) {
        try {
          const getAllBoardsDataResponse = await fetch(`${baseUrl}/boards`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          });

          const getAllBoardsData =
            (await getAllBoardsDataResponse.json()) as Types.GetAllBoardsResult;

          const arrOf_PromiseResponseGetBoard: Promise<Response>[] = [];

          getAllBoardsData.forEach((board) => {
            const promise = fetch(`${baseUrl}/boards/${board.id}`, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${getToken()}`,
              },
            });
            arrOf_PromiseResponseGetBoard.push(promise);
          });

          const arrOf_ResponseGetBoard = await Promise.all(
            arrOf_PromiseResponseGetBoard
          );

          const arrOf_ResponseToJSGetBoard = arrOf_ResponseGetBoard.map(
            async (response) =>
              response.json() as Promise<Types.BoardFromServerExpanded>
          );

          const arrOf_GetBoard = await Promise.all(arrOf_ResponseToJSGetBoard);

          arrOf_GetBoard.forEach((board) => {
            board.columns.sort((a, b) => a.order - b.order);
            board.columns.forEach((column) =>
              column.tasks.sort((a, b) => a.order - b.order)
            );
          });

          return { data: arrOf_GetBoard };
        } catch (error: unknown) {
          if (
            error &&
            typeof error === 'object' &&
            error.hasOwnProperty('status')
          ) {
            const errorWithStatus = error as { status: number };

            if (errorWithStatus.status === 401) {
              dispatch(setUserId(null));
              dispatch(setToken(null));
              window.location.reload();

              throw new Error(`
              Expired token detected.
              You will be logged out
              `);
            }
          }
          throw new Error('Server responded with an error');
        }
      },
      providesTags: ['BOARDS', 'BOARD'],
    }),
    getBoard: builder.query<Types.GetBoardResult, Types.GetBoardArg>({
      query: (arg) => `/boards/${arg.boardId}`,
      providesTags: ['BOARD'],
      transformResponse: (response: Types.GetBoardResult) => {
        response.columns.sort((a, b) => a.order - b.order);
        response.columns.forEach((column) =>
          column.tasks.sort((a, b) => a.order - b.order)
        );
        return response;
      },
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
  useGetAllBoardsExpandedQuery,
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useUpdateBoardMutation,
} = api;
