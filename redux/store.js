import { createStore, applyMiddleware } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { persistStore } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './rootReducer';
import modalHistoryMiddleWare from '@redux/middlewares/modalHistoryMiddleware';
import cookiePersist from '@redux/middlewares/cookiePersistMiddleware';
import { composeWithDevTools } from 'redux-devtools-extension';

const logger = (store) => (next) => (action) => {
  if (process.env.NODE_ENV !== 'production') {
    // console.log('dispatching: ', action);
    let newState = next(action);
    // console.log('state is: ', store.getState());
    return newState;
  }
  return next(action);
};

const middleWare = [
  thunkMiddleware,
  cookiePersist,
  modalHistoryMiddleWare,
  ...(process.env.NODE_ENV !== 'production' ? [logger] : []),
];

// Create a reducer that handles hydration
const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
      user: state.user.user ? state.user : action.payload.user,
    };
  }
  return rootReducer(state, action);
};

// Initialize the Redux store
const initStore = () => {
  const middlewareEnhancer =
    process.env.NODE_ENV !== 'production'
      ? composeWithDevTools(applyMiddleware(...middleWare))
      : applyMiddleware(...middleWare);

  const store = createStore(reducer, middlewareEnhancer);

  store.__PERSISTOR = persistStore(store);
  return store;
};

// Create the Redux wrapper
export const wrapper = createWrapper(initStore);
