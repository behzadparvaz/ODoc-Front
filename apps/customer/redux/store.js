import { createStore, applyMiddleware, compose } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { persistStore } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './rootReducer';
import modalHistoryMiddleWare from '@redux/middlewares/modalHistoryMiddleware';
import cookiePersist from '@redux/middlewares/cookiePersistMiddleware';

const middleWare = [thunkMiddleware, cookiePersist, modalHistoryMiddleWare];
if (process.env.NODE_ENV !== 'production') {
  let logger = (store) => (next) => (action) => {
    typeof window !== 'undefined' && console.log('dispatching: ', action);
    let newState = next(action);
    typeof window !== 'undefined' && console.log('state is: ', store.getState());
    return newState;
  };
  middleWare.push(logger);
}

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.user.user) {
      nextState.user = state.user;
    }
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};
const initStore = () => {
  const store = createStore(reducer, compose(applyMiddleware(...middleWare)));
  store.__PERSISTOR = persistStore(store);
  return store;
};

export const wrapper = createWrapper(initStore);
