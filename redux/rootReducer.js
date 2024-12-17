import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

// Import reducers
import userReducer from './user/userReducer';
import mapReducer from './map/mapReducer';
import modalReducer from './modal/modalReducer';
import notificationReducer from './notification/notificationReducer';
import requestReducer from './requestDrugs/requestDrugsReducer';

// Create a noop storage for environments without window (e.g., server-side rendering)
const createNoopStorage = () => ({
  getItem: (_key) => Promise.resolve(null),
  setItem: (_key, value) => Promise.resolve(value),
  removeItem: (_key) => Promise.resolve(),
});

// Determine storage based on environment
const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

// Configuration for persistence
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'requestDrugs'], // Only persist these reducers
};

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
  user: userReducer,
  modals: modalReducer,
  notification: notificationReducer,
  mapInfo: mapReducer,
  requestDrugs: requestReducer,
});

// Export the persisted reducer
export default persistReducer(persistConfig, rootReducer);
