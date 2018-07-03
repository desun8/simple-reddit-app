// @flow
import type { SearchSubredditRequest, SearchSubredditSuccess, SearchSubredditFailure } from './actionsType';
import SEARCH_SUBREDDIT from './actionsType';

type Action =
  | SearchSubredditRequest
  | SearchSubredditSuccess
  | SearchSubredditFailure;

/* eslint-disable */
// flow for thunk action
type GetState = () => Object;
type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any
/* eslint-enable */

// action creators for SearchSubreddit
export const searchSubredditRequest = (subreddit: string): SearchSubredditRequest => ({
  type: SEARCH_SUBREDDIT.SEARCH_SUBREDDIT_REQUEST,
  subreddit,
});

export const searchSubredditSuccess = (
  subreddit: string,
  json: Object,
): SearchSubredditSuccess => ({
  type: SEARCH_SUBREDDIT.SEARCH_SUBREDDIT_SUCCESS,
  result: json,
  subreddit,
});

export const searchSubredditFailure = (error: string): SearchSubredditFailure => ({
  type: SEARCH_SUBREDDIT.SEARCH_SUBREDDIT_FAILURE,
  message: error,
});

const fetchSearchSubreddit = (subreddit: string): ThunkAction => (dispatch) => {
  dispatch(searchSubredditRequest(subreddit));
  return fetch(`https://www.reddit.com/subreddits/search.json?q=${subreddit}`)
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Server not found.');
      }

      return response.json();
    })
    .then(json => dispatch(searchSubredditSuccess(subreddit, json)))
    .catch(error => dispatch(searchSubredditFailure(error)));
};

const shouldFetchSearchSubreddit = (state, subreddit) => {
  const { value } = state.searchResult;

  if (!subreddit || value.toLowerCase() === subreddit.toLowerCase()) {
    return false;
  }

  return true;
};

export const fetchSearchSubredditIfValid = (subreddit: string) => (
  dispatch: Dispatch,
  getState: GetState,
) => {
  if (shouldFetchSearchSubreddit(getState(), subreddit)) {
    return dispatch(fetchSearchSubreddit(subreddit));
  }

  return console.warn(
    'Search is invalid.',
    'К сожалению поиск с такой фразой невозможен. Пожалуйста измените запрос.',
  );
};
