import { apiSlice } from '../apiSlice';
import { setUserId, setToken } from 'redux/global/globalSlice';
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
    getAllBoardsExpanded: builder.query<Types.GetBoardResult[], void>({
      async queryFn(args, { dispatch }) {
        try {
          const getAllBoardsData = await dispatch(
            api.endpoints.getAllBoards.initiate(args)
          ).unwrap();

          const arrOfPromises: Promise<Types.GetBoardResult>[] = [];

          getAllBoardsData.forEach((board) => {
            const promise = dispatch(
              api.endpoints.getBoard.initiate({ boardId: board.id })
            ).unwrap();
            arrOfPromises.push(promise);
          });

          const result = await Promise.all(arrOfPromises);

          return { data: result };
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
