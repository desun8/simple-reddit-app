// @flow
import { combineReducers } from 'redux';
import type { SearchSubredditRequest, SearchSubredditSuccess, SearchSubredditFailure } from '../actions/actionsType';
import SEARCH_SUBREDDIT from '../actions/actionsType';

type State = {
  +isFetching: boolean,
  +value: string,
  +result: {
    +name: string,
    +description: string,
    +title: string,
    +img: string,
  }[] | string,
  +error?: boolean,
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
}));

const searchResult = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case SEARCH_SUBREDDIT.SEARCH_SUBREDDIT_REQUEST:
      return {
        ...state,
        isFetching: true,
        value: action.subreddit,
      };
    case SEARCH_SUBREDDIT.SEARCH_SUBREDDIT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        result: result(action.result),
      };
    case SEARCH_SUBREDDIT.SEARCH_SUBREDDIT_FAILURE:
      return {
        ...state,
        isFetching: false,
        result: action.message,
        error: true,
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  searchResult,
});

export default reducer;
