// @flow
import type {
  AddSubscribe,
  RemoveSubscribe,
} from '../actions/actionsType';
import types from '../actions/actionsType';

type Action =
  | AddSubscribe
  | RemoveSubscribe;

type State = {
  +name: string,
  +img?: string,
  +description?: string,
}[];

const mySubreddits = (state: State = [], action: Action): State => {
  switch (action.type) {
    case types.ADD_SUBSCRIBE:
      if (state.some(el => el.name === action.name)) {
        return state;
      }

      return [...state, {
        name: action.name,
        img: action.img,
        description: action.description,
      }];
    case types.REMOVE_SUBSCRIBE:
      return state.filter(el => el.name !== action.name);
    default:
      return state;
  }
};

export default mySubreddits;
