import { switchCase } from '../utils';

const typing = s => `AUTO_COMPLETE/${ s }`;

export const TYPING = typing('TYPING');
export const FETCH_SUGGESTION_LIST_STARTING = typing(
  'FETCH_SUGGESTION_LIST_STARTING',
);
export const FETCH_SUGGESTION_LIST_SUCCESS = typing(
  'FETCH_SUGGESTION_LIST_SUCCESS',
);
export const FETCH_SUGGESTION_LIST_FAILED = typing(
  'FETCH_SUGGESTION_LIST_FAILED',
);

export const SELECT_ITEM = typing(
  'SELECT_ITEM',
);

export const suggestionList = (state = [], { type, payload }) =>
  switchCase(type, state)(
    [FETCH_SUGGESTION_LIST_SUCCESS, payload],
    [TYPING, () => (payload ? state : [])],
    [SELECT_ITEM, []],
  );

export const value = (state = '', { type, payload }) =>
  switchCase(type, state)(
    [TYPING, SELECT_ITEM, payload],
  );

export const isLoading = (state = false, { type, payload }) =>
  switchCase(type, state)(
    [FETCH_SUGGESTION_LIST_STARTING, true],
    [FETCH_SUGGESTION_LIST_FAILED, FETCH_SUGGESTION_LIST_SUCCESS, false],
    [TYPING, () => (payload ? state : false)]
  );

export const isBackFromAPI = (state = false, { type, payload }) =>
  switchCase(type, state)(
    [TYPING, SELECT_ITEM, false],
    [FETCH_SUGGESTION_LIST_SUCCESS, FETCH_SUGGESTION_LIST_FAILED, true],
  );
