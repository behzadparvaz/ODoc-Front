export const getLocalStorageToken = () => {
  if (typeof localStorage !== 'undefined') {
    return localStorage?.getItem('token');
  }
  return null;
};
