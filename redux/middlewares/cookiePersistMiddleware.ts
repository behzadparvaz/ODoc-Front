import userLogoutType, { userTypes } from '../user/userTypes';
import Cookies from 'js-cookie';

const LongTimeCookies = Cookies.withAttributes({
  expires: 365,
});

const persistAction = [
  'persist/REHYDRATE',
  userTypes.SET_USER,
  userTypes.LOGOUT_USER,
  userLogoutType.Logout_User,
];

let cookiePersist = (store) => (next) => (action) => {
  if (typeof window === 'undefined' || !persistAction.includes(action.type)) return next(action);
  let newAction = next(action);
  const state = store.getState();
  if (action.type === userLogoutType.Logout_User) {
    Cookies.remove('user');
    Cookies.remove('token');
  } else if (state.user.user) {
    const { token, ...rest } = state.user.user;
    LongTimeCookies.set('user', JSON.stringify(rest));
    LongTimeCookies.set('token', token);
  }
  return newAction;
};
export default cookiePersist;
