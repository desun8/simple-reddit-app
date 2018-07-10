// @flow
import type {
  SearchSubredditRequest,
  SearchSubredditSuccess,
  SearchSubredditFailure,
  SelectedSubreddit,
  LoadSubredditPostsRequest,
  LoadSubredditPostsSuccess,
  LoadSubredditPostsFailure,
  AddSubscribe,
  RemoveSubscribe,
  GetSubredditDataRequest,
  GetSubredditDataSuccess,
  IsSubredditSubscribe,
} from './actionsType';
import types from './actionsType';

type Action =
  | SearchSubredditRequest
  | SearchSubredditSuccess
  | SearchSubredditFailure
  | LoadSubredditPostsRequest
  | LoadSubredditPostsSuccess
  | LoadSubredditPostsFailure
  | GetSubredditDataRequest
  | GetSubredditDataSuccess
  | AddSubscribe
  | RemoveSubscribe
  | IsSubredditSubscribe
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
  subs: any,
): SearchSubredditSuccess => ({
  type: types.SEARCH_SUBREDDIT_SUCCESS,
  result: json,
  subreddit,
  subs,
});

export const searchSubredditFailure = (error: string): SearchSubredditFailure => ({
  type: types.SEARCH_SUBREDDIT_FAILURE,
  error,
});

const fetchSearchSubreddit = (subreddit: string, subs: any): ThunkAction => (dispatch) => {
  dispatch(searchSubredditRequest(subreddit));
  return fetch(`https://www.reddit.com/subreddits/search.json?q=${subreddit}`)
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Server not found.');
      }

      return response.json();
    })
    .then(json => dispatch(searchSubredditSuccess(subreddit, json, subs)))
    .catch(error => dispatch(searchSubredditFailure(error)));
};

const shouldFetchSearchSubreddit = (state, subreddit) => {
  const { value } = state.searchSubreddit;

  if (!subreddit || value.toLowerCase() === subreddit.toLowerCase()) {
    return false;
  }

  return true;
};


export const fetchSearchSubredditIfValid = (subreddit: string, subs: any) => (
  dispatch: Dispatch,
  getState: GetState,
) => {
  if (shouldFetchSearchSubreddit(getState(), subreddit)) {
    return dispatch(fetchSearchSubreddit(subreddit, subs));
  }

  return console.warn(
    'Search is invalid.',
    'К сожалению поиск с такой фразой невозможен. Пожалуйста измените запрос.',
  );
};


// Load subreddit
export const loadSubredditPostsRequest = (
  subreddit: string,
  subscribe: boolean,
): LoadSubredditPostsRequest => ({
  type: types.LOAD_SUBREDDIT_POSTS_REQUEST,
  subreddit,
  subscribe,
});

export const loadSubredditPostsSuccess = (
  subreddit: string,
  json: Object,
  subscribe: boolean,
): LoadSubredditPostsSuccess => ({
  type: types.LOAD_SUBREDDIT_POSTS_SUCCESS,
  items: json,
  subreddit,
  subscribe,
});

export const loadSubredditPostsFailure = (
  subreddit: string,
  error: string,
): LoadSubredditPostsFailure => ({
  type: types.LOAD_SUBREDDIT_POSTS_FAILURE,
  error,
  subreddit,
});

const fetchLoadSubredditPosts = (
  subreddit: string,
  subscribe: boolean,
): ThunkAction => (dispatch) => {
  dispatch(loadSubredditPostsRequest(subreddit, subscribe));

  return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Server not found.');
      }

      return response.json();
    })
    .then(json => dispatch(loadSubredditPostsSuccess(subreddit, json, subscribe)))
    .catch(error => dispatch(loadSubredditPostsFailure(subreddit, error)));
};

const isSubscribe = (state, subreddit) => {
  const arr = state.mySubreddits;

  return arr.some(el => el.name === subreddit);
};

export const fetchPostsBySubreddit = (subreddit: string) => (
  dispatch: Dispatch,
  getState: GetState,
) => dispatch(fetchLoadSubredditPosts(subreddit, isSubscribe(getState(), subreddit)));


// Get subreddit data
const getSubredditDataRequest = (subreddit: string): GetSubredditDataRequest => ({
  type: types.GET_SUBREDDIT_DATA_REQUEST,
  subreddit,
});

const getSubredditDataSuccess = (subreddit: string, json: Object): GetSubredditDataSuccess => ({
  type: types.GET_SUBREDDIT_DATA_SUCCESS,
  subreddit,
  json,
});

export const fetchGetSubredditData = (subreddit: string): ThunkAction => (dispatch) => {
  dispatch(getSubredditDataRequest(subreddit));

  return fetch(`https://www.reddit.com/subreddits/search.json?q=${subreddit}`)
    .then(response => response.json())
    .then(json => dispatch(getSubredditDataSuccess(subreddit, json)));
};


// Selected subreddit
export const selectedSubreddit = (subreddit: string): SelectedSubreddit => ({
  type: types.SELECTED_SUBREDDIT,
  subreddit,
});


// My subreddits
// Subscribe and unsubscribe
export const addSubscribe = (
  name: string,
  img: string,
  description: string,
): AddSubscribe => ({
  type: types.ADD_SUBSCRIBE,
  name,
  img,
  description,
});

export const removeSubscribe = (name: string): RemoveSubscribe => ({
  type: types.REMOVE_SUBSCRIBE,
  name,
});


// maybe remove
export const isSubredditSubscribe = (subreddit: string): IsSubredditSubscribe => ({
  type: types.IS_SUBREDDIT_SUBSCRIBE,
  subreddit,
});
