// @flow
import type {
  LoadSubredditPostsFailure,
  LoadSubredditPostsRequest,
  LoadSubredditPostsSuccess,
} from '../actions/actionsType';
import types from '../actions/actionsType';


type Action =
  | LoadSubredditPostsRequest
  | LoadSubredditPostsSuccess
  | LoadSubredditPostsFailure;

type PostsState = {
  +isFetching: boolean,
  +updateAt?: string,
  items: {
    +title: string
  }[],
  +error?: string
}

type Json = {
  data: Object
}

const postsInitialState: PostsState = {
  isFetching: false,
  items: [],
};

const postsParsing = (json: Json) => json.data.children.map(el => ({
  id: el.data.id,
  title: el.data.title,
  img: el.data.thumbnail,
  subreddit: el.data.subreddit,
  subredditPrefix: el.data.subreddit_name_prefixed,
  url: `https://www.reddit.com${el.data.permalink}`,
}));

const posts = (state: PostsState = postsInitialState, action: Action): PostsState => {
  switch (action.type) {
    case types.LOAD_SUBREDDIT_POSTS_REQUEST:
      return {
        ...state,
        isFetching: true,
        updateAt: new Date().toLocaleTimeString('ru-ru', {
          hour: 'numeric',
          minute: 'numeric',
        }),
      };
    case types.LOAD_SUBREDDIT_POSTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: postsParsing(action.items),
      };
    default:
      return state;
  }
};

const postsBySubreddit = (state: Object = {}, action: Action): Object => {
  switch (action.type) {
    case types.LOAD_SUBREDDIT_POSTS_REQUEST:
    case types.LOAD_SUBREDDIT_POSTS_SUCCESS:
      return {
        ...state,
        [action.subreddit]: posts(state[action.subreddit], action),
      };
    default:
      return state;
  }
};

export default postsBySubreddit;
