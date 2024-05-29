import { Reducer } from 'react';
import userLogoutType, { userTypes } from './userTypes';

const INITIAL_STATE = {
  user: null,
  defaultStore: {
    cityName: 'تهران',
    sectorId: 25,
    sectorName: 'میرداماد',
    storeId: 5431,
    storeName: 'تهران، میدان آرژانتین',
    sectorPartId: 255,
    sectorPartName: 'ساعی',
    storeType: ' اُمارکت ',
    storeTypeId: 0,
    imageUrl: 'https://asset.okala.com/unsigned/rs:fill/size:0:0/plain/s3:/cdn/logo/0.png',
    lat: 35.737156785003556,
    lng: 51.41540956014044,
    customerId: 8885553,
  },
  discountCode: null,
};

const userReducer: Reducer<any, any> = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case userTypes.SET_USER:
      // localStorage.setItem('token', actions.payload.token);
      return {
        ...state,
        user: actions.payload,
      };
    case userLogoutType.Logout_User:
      localStorage.removeItem('token');
      localStorage.removeItem('tokenMS');
      localStorage.removeItem('refresh_token');
      return {
        ...state,
        user: null,
      };
    case userTypes.SET_DISCOUNT_CODE:
      return {
        ...state,
        discountCode: actions.payload,
      };
    case userTypes.CLEAR_DISCOUNT_CODE:
      return {
        ...state,
        discountCode: null,
      };
    default:
      return state;
  }
};

export default userReducer;
