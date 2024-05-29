import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

// ---------------------------------------- reducers -----------------------------------------
import userReducer from './user/userReducer';
import cartReducer from './cart/cartReducer';
import modalReducer from './modal/modalReducer';
import serverSideQueriesReducer from './serverSideQueries/serverSideQueriesReducer';
import mapReducer from './map/mapReducer';
import deliveryTimeReducer from './deliveryTime/deliveryTimeReducer';
import paymentReducer from './payment/paymentReducer';
import walletReducer from './wallet/walletReducer';
import routeReducer from './routes/routeReducer';
import searchReducer from './search/searchReducer';
import notificationReducer from './notification/notificationReducer';
import eventReducer from './events/eventReducer';
// -------------------------------------------------------------------------------------------

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
const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'cart', 'mapInfo', 'wallet', 'route', 'search'],
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  modals: modalReducer,
  serverSideQueries: serverSideQueriesReducer,
  mapInfo: mapReducer,
  deliveryTime: deliveryTimeReducer,
  payment: paymentReducer,
  wallet: walletReducer,
  route: routeReducer,
  search: searchReducer,
  notification: notificationReducer,
  eventState: eventReducer,
});

export default persistReducer(persistConfig, rootReducer);
