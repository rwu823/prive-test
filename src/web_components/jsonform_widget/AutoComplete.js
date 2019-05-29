import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useEventCallback } from 'rxjs-hooks';
import { ajax } from 'rxjs/ajax';
import {
  catchError,
  debounceTime,
  filter,
  map,
  switchMap,
  withLatestFrom,
  takeUntil,
} from 'rxjs/operators';
import styled, { css } from 'styled-components';
import Loading from './components/Loading';
import { useInput } from './hooks';
import {
  FETCH_SUGGESTION_LIST_FAILED,
  FETCH_SUGGESTION_LIST_STARTING,
  FETCH_SUGGESTION_LIST_SUCCESS,
  TYPING,
  SELECT_ITEM,
} from './redux/reducers';
import { act, escap } from './utils';

const Div = styled.div`
  ${ () => css`
    position: relative;
  ` }
`;

const SuggestionList = styled.div`
  position: absolute;
  top: 126px;
  left: 0;
  background: #eee;
  z-index: 9;
  width: 300px;
  padding: 8px;

  :after {
    content: '';
    position: absolute;
    background: #eee;
    width: 12px;
    height: 12px;
    transform: rotate(45deg);
    left: 5%;
    top: -6px;
  }

  ul {
    max-height: 130px;
    overflow: auto;
    padding: 0;
    color: #ccc;
  }

  li {
    margin-left: 22px;
    line-height: 1.6;
  }
`;

const Error = styled.p`
  background: #fcf3f4;
  color: #cb162c;
  padding: 8px;
`;

const Input = styled.input`
  border: none;
  :focus {
    outline: none;
  }

  width: 100%;
  border-bottom: 2px solid #ddd;
  font-size: 1em;
  padding-bottom: 7px;
`;

const Light = styled.span`
  color: #000;
`;

const AutoComplete = ({
  dispatch,
  suggestionList,
  value,
  isLoading,
  isBackFromAPI,
  ...props
}) => {
  const [isCaseSensitive, onChangeCaseSensitive] = useInput(false, 'checkbox');

  const [onChange] = useEventCallback(
    (e$, i$) =>
      e$.pipe(
        map(e => {
          const value = e.currentTarget.value.trim();
          dispatch(act(TYPING, value));
          return value;
        }),
        debounceTime(600),
        filter(v => !!v),
        withLatestFrom(i$),
        map(([value, [isCaseSen]]) => ({ value, isCaseSen })),
        switchMap(({ value, isCaseSen }) => {
          dispatch(act(FETCH_SUGGESTION_LIST_STARTING));

          return ajax('https://api.spacexdata.com/v3/launches').pipe(
            map(({ response }) => {
              const top10List = response
                .filter(launch => {
                  if (isCaseSen) return launch.mission_name.startsWith(value);

                  return launch.mission_name
                    .toLowerCase()
                    .startsWith(value.toLowerCase());
                })
                .slice(0, 10);
              dispatch(act(FETCH_SUGGESTION_LIST_SUCCESS, top10List));
            }),
            takeUntil(e$),
            catchError(err => dispatch(act(FETCH_SUGGESTION_LIST_FAILED, err))),
          );
        }),
      ),
    null,
    [isCaseSensitive],
  );

  const $input = React.useRef(null);

  if (isBackFromAPI)
    AutoComplete.highlightWordsRE = new RegExp(`^(${ escap(value) })`, 'i');

  useEffect(() => $input.current.focus(), []);
  useEffect(() => {
    onChange({ currentTarget: $input.current });
    $input.current.focus();
  }, [isCaseSensitive]);

  const selectItem = index => ev => {
    dispatch(act(SELECT_ITEM, suggestionList[index].mission_name));
    $input.current.focus();
  };

  return (
    <Div>
      <form>
        <div>
          <label>
            <input
              type="checkbox"
              onChange={onChangeCaseSensitive}
              checked={isCaseSensitive}
            />
            case sensitive
          </label>
        </div>
        <label>
          <h2>Underlyings</h2>
          <Input
            ref={$input}
            type="text"
            onChange={onChange}
            placeholder={'Type something...'}
            value={value}
          />
        </label>
      </form>

      {(suggestionList.length || isLoading) && (
        <SuggestionList>
          {isLoading ? (
            <Loading color={'#fff'} style={{ padding: '1em' }} />
          ) : (
            <ul>
              {suggestionList.map((launch, i) => {
                const others = launch.mission_name.replace(
                  AutoComplete.highlightWordsRE,
                  '',
                );

                return (
                  <li
                    key={launch.flight_number}
                    tabIndex={i}
                    onClick={selectItem(i)}
                  >
                    <Light>{RegExp.$1}</Light>
                    {others}
                  </li>
                );
              })}
            </ul>
          )}
        </SuggestionList>
      )}

      {isBackFromAPI && value && !isLoading && !suggestionList.length && (
        <Error>Didn't match any result.</Error>
      )}
    </Div>
  );
};

export default connect(s => s.autoComplete)(AutoComplete);
