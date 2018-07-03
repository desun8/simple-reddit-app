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
  message: string,
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

//

export default {
  SEARCH_SUBREDDIT_REQUEST,
  SEARCH_SUBREDDIT_SUCCESS,
  SEARCH_SUBREDDIT_FAILURE,
};
