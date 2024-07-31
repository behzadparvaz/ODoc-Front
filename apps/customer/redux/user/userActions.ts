import { Action } from 'redux';
import userLogoutType, { userTypes } from './userTypes';

export const setUserAction = (user) => async (dispatch) =>
  dispatch({
    type: userTypes.SET_USER,
    payload: user,
  });

export const setDiscountCode = (payload) => async (dispatch) =>
  dispatch({
    type: userTypes.SET_DISCOUNT_CODE,
    payload,
  });

export const clearDiscountCode = () => async (dispatch) =>
  dispatch({
    type: userTypes.CLEAR_DISCOUNT_CODE,
  });

type LogoutUser = Action<userLogoutType.Logout_User>;
export const logoutUser = (): LogoutUser => ({
  type: userLogoutType.Logout_User,
});

export type LogoutUserAction = LogoutUser;
