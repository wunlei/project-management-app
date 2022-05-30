export default class ServerError extends Error {
  name = 'ServerError';
  message = `
    Server responded with an error.
    (The error is not related to authorization)
  `;
}
