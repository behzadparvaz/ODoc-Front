import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import userReducer from './user/userReducer';
import mapReducer from './map/mapReducer';
import modalReducer from './modal/modalReducer';
import notificationReducer from './notification/notificationReducer';
import requestReducer from './requestDrugs/requestDrugsReducer';

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};
const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'requestDrugs'],
};

const rootReducer = combineReducers({
  user: userReducer,
  modals: modalReducer,
  notification: notificationReducer,
  mapInfo: mapReducer,
  requestDrugs: requestReducer,
});

export default persistReducer(persistConfig, rootReducer);
