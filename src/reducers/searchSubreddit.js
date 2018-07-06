// @flow

import type { SearchSubredditRequest, SearchSubredditSuccess, SearchSubredditFailure } from '../actions/actionsType';
import types from '../actions/actionsType';

type State = {
  +isFetching: boolean,
  +value: string,
  +result: {
    +name: string,
    +description: string,
    +title: string,
    +img: string,
    +subscribe: boolean,
  }[],
  +error?: string,
}

type Action =
  | SearchSubredditRequest
  | SearchSubredditSuccess
  | SearchSubredditFailure;

type Json = {
  data: Object,
};

const initialState: State = {
  isFetching: false,
  value: '',
  result: [],
};

const defaultImg: string = 'https://img.freepik.com/free-icon/reddit-social-logo-character_318-65151.jpg?size=338&ext=jpg';

const result = (json: Json) => json.data.children.map(el => ({
  name: el.data.display_name,
  description: el.data.public_description,
  title: el.data.title,
  img: el.data.icon_img || defaultImg,
  subscribe: false,
}));

const searchSubreddit = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case types.SEARCH_SUBREDDIT_REQUEST:
      return {
        ...state,
        isFetching: true,
        value: action.subreddit,
      };
    case types.SEARCH_SUBREDDIT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        result: result(action.result),
      };
    case types.SEARCH_SUBREDDIT_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default searchSubreddit;
