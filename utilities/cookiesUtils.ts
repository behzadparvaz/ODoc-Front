import Cookies from 'js-cookie';

export const getDataFromCookies = (key: string) => (Cookies.get(key) ? Cookies.get(key) : null);