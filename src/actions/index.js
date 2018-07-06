// @flow
import type {
  SearchSubredditRequest,
  SearchSubredditSuccess,
  SearchSubredditFailure,
  SelectedSubreddit,
  LoadSubredditPostsRequest,
  LoadSubredditPostsSuccess,
  LoadSubredditPostsFailure,
  SubscribeToSubreddit,
  UnsubscribeToSubreddit,
} from './actionsType';
import types from './actionsType';

type Action =
  | SearchSubredditRequest
  | SearchSubredditSuccess
  | SearchSubredditFailure
  | LoadSubredditPostsRequest
  | LoadSubredditPostsSuccess
  | LoadSubredditPostsFailure
  | SubscribeToSubreddit
  | UnsubscribeToSubreddit
  | SelectedSubreddit;

/* eslint-disable */
// flow for thunk action
type GetState = () => Object;
type PromiseAction = Promise<Action>;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any
/* eslint-enable */

// Search subreddit
export const searchSubredditRequest = (subreddit: string): SearchSubredditRequest => ({
  type: types.SEARCH_SUBREDDIT_REQUEST,
  subreddit,
});

export const searchSubredditSuccess = (
  subreddit: string,
  json: Object,
): SearchSubredditSuccess => ({
  type: types.SEARCH_SUBREDDIT_SUCCESS,
  result: json,
  subreddit,
});

export const searchSubredditFailure = (error: string): SearchSubredditFailure => ({
  type: types.SEARCH_SUBREDDIT_FAILURE,
  error,
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
  const { value } = state.searchSubreddit;

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

// Load subreddit
export const loadSubredditPostsRequest = (subreddit: string): LoadSubredditPostsRequest => ({
  type: types.LOAD_SUBREDDIT_POSTS_REQUEST,
  subreddit,
});

export const loadSubredditPostsSuccess = (
  subreddit: string,
  json: Object,
): LoadSubredditPostsSuccess => ({
  type: types.LOAD_SUBREDDIT_POSTS_SUCCESS,
  items: json,
  subreddit,
});

export const loadSubredditPostsFailure = (
  subreddit: string,
  error: string,
): LoadSubredditPostsFailure => ({
  type: types.LOAD_SUBREDDIT_POSTS_FAILURE,
  error,
  subreddit,
});

export const fetchLoadSubredditPosts = (subreddit: string): ThunkAction => (dispatch) => {
  dispatch(loadSubredditPostsRequest(subreddit));
  return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Server not found.');
      }

      return response.json();
    })
    .then(json => dispatch(loadSubredditPostsSuccess(subreddit, json)))
    .catch(error => dispatch(loadSubredditPostsFailure(subreddit, error)));
};

// Selected subreddit
export const selectedSubreddit = (subreddit: string): SelectedSubreddit => ({
  type: types.SELECTED_SUBREDDIT,
  subreddit,
});

// My subreddits
// Subscribe and unsubscribe
export const subscribeToSubreddit = (
  name: string,
  img: string,
  description: string,
): SubscribeToSubreddit => ({
  type: types.SUBSCRIBE_TO_SUBREDDIT,
  name,
  img,
  description,
});

export const unsubscribeToSubreddit = (name: string): UnsubscribeToSubreddit => ({
  type: types.UNSUBSCRIBE_TO_SUBREDDIT,
  name,
});
