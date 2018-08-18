"use strict"

import {createStore, combineReducers} from 'redux';

import viewReducer from './view';
import gameDataReducer from './gameData';

const storeCreator = () => {
  return createStore(
    combineReducers({
      viewReducer,
      gameDataReducer,
    }),
    //enable redux devtools if not in production
    (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') &&
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};

export default storeCreator;