// @flow

// Search subreddit
export type SearchSubredditRequest = {
  type: 'SEARCH_SUBREDDIT_REQUEST',
  subreddit: string,
};

export type SearchSubredditSuccess = {
  type: 'SEARCH_SUBREDDIT_SUCCESS',
  result: Object,
  subreddit: string,
  subs: any,
};

export type SearchSubredditFailure = {
  type: 'SEARCH_SUBREDDIT_FAILURE',
  error: string,
};

const [
  SEARCH_SUBREDDIT_REQUEST,
  SEARCH_SUBREDDIT_SUCCESS,
  SEARCH_SUBREDDIT_FAILURE,
] = [
  'SEARCH_SUBREDDIT_REQUEST',
  'SEARCH_SUBREDDIT_SUCCESS',
  'SEARCH_SUBREDDIT_FAILURE',
];

// Selected subreddit
export type SelectedSubreddit = {
  type: 'SELECTED_SUBREDDIT',
  subreddit: string,
}

const SELECTED_SUBREDDIT = 'SELECTED_SUBREDDIT';

// Load subreddit posts
export type LoadSubredditPostsRequest = {
  type: 'LOAD_SUBREDDIT_POSTS_REQUEST',
  subreddit: string,
  subscribe: boolean,
}

export type LoadSubredditPostsSuccess = {
  type: 'LOAD_SUBREDDIT_POSTS_SUCCESS',
  items: Object,
  subreddit: string,
  subscribe: boolean,
}

export type LoadSubredditPostsFailure = {
  type: 'LOAD_SUBREDDIT_POSTS_FAILURE',
  error: string,
  subreddit: string,
}

const [
  LOAD_SUBREDDIT_POSTS_REQUEST,
  LOAD_SUBREDDIT_POSTS_SUCCESS,
  LOAD_SUBREDDIT_POSTS_FAILURE,
] = [
  'LOAD_SUBREDDIT_POSTS_REQUEST',
  'LOAD_SUBREDDIT_POSTS_SUCCESS',
  'LOAD_SUBREDDIT_POSTS_FAILURE',
];

//
const [
  GET_SUBREDDIT_DATA_REQUEST,
  GET_SUBREDDIT_DATA_SUCCESS,
] = [
  'GET_SUBREDDIT_DATA_REQUEST',
  'GET_SUBREDDIT_DATA_SUCCESS',
];

export type GetSubredditDataRequest = {
  type: 'GET_SUBREDDIT_DATA_REQUEST',
  subreddit: string,
}

export type GetSubredditDataSuccess = {
  type: 'GET_SUBREDDIT_DATA_SUCCESS',
  json: Object,
  subreddit: string,
}
//


// My subreddits
export type AddSubscribe = {
  type: 'ADD_SUBSCRIBE',
  name: string,
  img: string,
  description: string,
}

export type RemoveSubscribe = {
  type: 'REMOVE_SUBSCRIBE',
  name: string,
}

const [
  ADD_SUBSCRIBE,
  REMOVE_SUBSCRIBE,
] = [
  'ADD_SUBSCRIBE',
  'REMOVE_SUBSCRIBE',
];

// Check for subscribe
export type IsSubredditSubscribe = {
  type: 'IS_SUBREDDIT_SUBSCRIBE',
  subreddit: string,
};

const IS_SUBREDDIT_SUBSCRIBE = 'IS_SUBREDDIT_SUBSCRIBE';

export default {
  SEARCH_SUBREDDIT_REQUEST,
  SEARCH_SUBREDDIT_SUCCESS,
  SEARCH_SUBREDDIT_FAILURE,
  LOAD_SUBREDDIT_POSTS_REQUEST,
  LOAD_SUBREDDIT_POSTS_SUCCESS,
  LOAD_SUBREDDIT_POSTS_FAILURE,
  ADD_SUBSCRIBE,
  REMOVE_SUBSCRIBE,
  SELECTED_SUBREDDIT,
  IS_SUBREDDIT_SUBSCRIBE,
  GET_SUBREDDIT_DATA_REQUEST,
  GET_SUBREDDIT_DATA_SUCCESS,
};
