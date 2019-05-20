import { combineReducers, createStore, applyMiddleware } from 'redux';

import {
  jsonformsReducer,
} from '@jsonforms/core';

import * as autoCompleteReducers from './reducers';

const logger = ({ getState }) => {
  console.log('[redux-logger] @@INIT', getState());
  return next => action => {
    const returnValue = next(action);
    console.log('[redux-logger]', action, '→', getState());

    return returnValue;
  };
};

export default (initState = {}) => {
  return createStore(
    combineReducers({
      jsonforms: jsonformsReducer(),
      autoComplete: combineReducers(autoCompleteReducers),
    }),
    initState,
    applyMiddleware(logger)
  );
};
