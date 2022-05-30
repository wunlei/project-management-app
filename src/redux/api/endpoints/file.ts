import { apiSlice } from '../apiSlice';
import * as Types from '../apiTypes';

const api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<Types.UploadFileResult, Types.UploadFileArg>({
      query: (arg) => {
        const body = new FormData();
        body.append('taskId', arg.taskId);
        body.append('file', arg.file);

        return {
          url: '/file',
          method: 'POST',
          body,
          responseHandler: (response) => response.text(),
        };
      },
      invalidatesTags: ['TASKS', 'TASK', 'COLUMN', 'BOARD'],
    }),
  }),
});

export const { useUploadFileMutation } = api;
