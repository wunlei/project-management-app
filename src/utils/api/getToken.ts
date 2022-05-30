import UserDeletedLocalStorageError from 'utils/errors/UserDeletedLocalStorageError';

export default function getToken() {
  const token = localStorage.getItem('token');
  if (!token) throw new UserDeletedLocalStorageError();

  return token;
}
