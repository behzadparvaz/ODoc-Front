import Cookies from 'js-cookie';

export const getLocalStorageToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const setLocalStorageToken = (token: string | null): void => {
  if (typeof window !== 'undefined') {
    if (token) {
      localStorage.setItem('token', token);
      Cookies.set('token', token, { expires: 365 });
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('persist:root')
      Cookies.remove('token');
    }
  }
};