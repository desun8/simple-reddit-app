// @flow
import type {
  SubscribeToSubreddit,
  UnsubscribeToSubreddit,
} from '../actions/actionsType';
import types from '../actions/actionsType';

type Action =
  | SubscribeToSubreddit
  | UnsubscribeToSubreddit;

type State = {
  +name: string,
  +img?: string,
  +description?: string,
}[];

const mySubreddits = (state: State = [], action: Action): State => {
  switch (action.type) {
    case types.SUBSCRIBE_TO_SUBREDDIT:
      if (state.some(el => el.name === action.name)) {
        return state;
      }

      return [...state, {
        name: action.name,
        img: action.img,
        description: action.description,
      }];
    case types.UNSUBSCRIBE_TO_SUBREDDIT:
      return state.filter(el => el.name !== action.name);
    default:
      return state;
  }
};

export default mySubreddits;
