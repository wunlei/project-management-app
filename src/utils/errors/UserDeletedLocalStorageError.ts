export default class UserDeletedLocalStorageError extends Error {
  name = 'UserDeletedLocalStorageError';
  message = `
    User deleted userId/token from the local storage.
    User will be logged out.
  `;
}
