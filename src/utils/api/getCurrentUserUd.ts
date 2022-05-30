import UserDeletedLocalStorageError from 'utils/errors/UserDeletedLocalStorageError';

export default function getCurrentUserId() {
  const userId = localStorage.getItem('userId');
  if (!userId) throw new UserDeletedLocalStorageError();

  return userId;
}
