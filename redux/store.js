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
    if (
      state.user.user ||
      state.cart.totalCartsCount > 0 ||
      state.cart.cartTotalPrice > 0 ||
      state.mapInfo ||
      state.wallet.selectedPriceState ||
      state.route.fromRoute !== '' ||
      state.search.searchText !== '' ||
      state.search.searchBoxIsVisible
    ) {
      nextState.user = state.user;
      nextState.cart.totalCartsCount = state.cart.totalCartsCount;
      nextState.cart.cartTotalPrice = state.cart.cartTotalPrice;
      nextState.mapInfo = state.mapInfo;
      nextState.wallet = state.wallet;
      nextState.route = state.route;
      nextState.search.searchText = state.search.searchText;
      nextState.search.searchBoxIsVisible = false;
    }
    // if (state.user.user) nextState.user.user = state.user.user; // preserve count value on client side navigation
    // if (state.cart.cartItems.length > 0)
    //   nextState.cart.cartItems = state.cart.cartItems;
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
