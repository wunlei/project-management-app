export default function getToken() {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token is missing in local storage');

  return token;
}
