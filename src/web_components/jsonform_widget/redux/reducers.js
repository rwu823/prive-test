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

export const suggestionList = (state = [], { type, payload }) =>
  switchCase(type, state)(
    [FETCH_SUGGESTION_LIST_SUCCESS, payload],
    [TYPING, () => (payload ? state : [])],
  );

export const value = (state = '', { type, payload }) =>
  switchCase(type, state)([TYPING, payload]);

export const isLoading = (state = false, { type, payload }) =>
  switchCase(type, state)(
    [FETCH_SUGGESTION_LIST_STARTING, true],
    [FETCH_SUGGESTION_LIST_FAILED, FETCH_SUGGESTION_LIST_SUCCESS, false],
    [TYPING, () => (payload ? state : false)]
  );

export const isBackFromAPI = (state = false, { type, payload }) =>
  switchCase(type, state)(
    [TYPING, false],
    [FETCH_SUGGESTION_LIST_SUCCESS, FETCH_SUGGESTION_LIST_FAILED, true],
  );
