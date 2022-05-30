import { baseUrl } from 'redux/api/apiSlice';
import getToken from './getToken';

export default function getImgUrlFromServer({
  taskId,
  filename,
}: {
  taskId: string;
  filename: string;
}) {
  return new Promise<string>((resolve, reject) => {
    fetch(`${baseUrl}/file/${taskId}/${filename}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((response) => {
        if (!response.body) throw new Error('No file');

        const reader = response.body.getReader();

        return new ReadableStream({
          start(controller) {
            return pump();

            function pump(): unknown {
              return reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close();
                  return;
                }

                controller.enqueue(value);
                return pump();
              });
            }
          },
        });
      })
      .then((stream) => new Response(stream))
      .then((response) => response.blob())
      .then((blob) => resolve(URL.createObjectURL(blob)))
      .catch((err) => reject(err));
  });
}
