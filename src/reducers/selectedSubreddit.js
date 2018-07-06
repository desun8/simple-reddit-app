// @flow
import types from '../actions/actionsType';
import type { SelectedSubreddit } from '../actions/actionsType';

type Action =
  | SelectedSubreddit;

const selectedSubreddit = (state: string = 'popular', action: Action) => {
  switch (action.type) {
    case types.SELECTED_SUBREDDIT:
      return action.subreddit;
    default:
      return state;
  }
};

export default selectedSubreddit;
