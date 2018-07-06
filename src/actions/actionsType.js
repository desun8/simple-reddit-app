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
}

export type LoadSubredditPostsSuccess = {
  type: 'LOAD_SUBREDDIT_POSTS_SUCCESS',
  items: Object,
  subreddit: string,
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

// My subreddits
export type SubscribeToSubreddit = {
  type: 'SUBSCRIBE_TO_SUBREDDIT',
  name: string,
  img: string,
  description: string,
}

export type UnsubscribeToSubreddit = {
  type: 'UNSUBSCRIBE_TO_SUBREDDIT',
  name: string,
}

const [
  SUBSCRIBE_TO_SUBREDDIT,
  UNSUBSCRIBE_TO_SUBREDDIT,
] = [
  'SUBSCRIBE_TO_SUBREDDIT',
  'UNSUBSCRIBE_TO_SUBREDDIT',
];


export default {
  SEARCH_SUBREDDIT_REQUEST,
  SEARCH_SUBREDDIT_SUCCESS,
  SEARCH_SUBREDDIT_FAILURE,
  LOAD_SUBREDDIT_POSTS_REQUEST,
  LOAD_SUBREDDIT_POSTS_SUCCESS,
  LOAD_SUBREDDIT_POSTS_FAILURE,
  SUBSCRIBE_TO_SUBREDDIT,
  UNSUBSCRIBE_TO_SUBREDDIT,
  SELECTED_SUBREDDIT,
};
