export default function getCurrentUserId() {
  const userId = localStorage.getItem('userId');
  if (!userId) throw new Error('UserId is missing in local storage');

  return userId;
}
