import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__({ name: 'travelApp' })
      : f => f,
  ),
);

export default store;
