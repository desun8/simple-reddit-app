// @flow
import type {
  AddSubscribe,
  GetSubredditDataSuccess,
  LoadSubredditPostsFailure,
  LoadSubredditPostsRequest,
  LoadSubredditPostsSuccess, RemoveSubscribe,
} from '../actions/actionsType';
import types from '../actions/actionsType';

type Action =
  | LoadSubredditPostsRequest
  | LoadSubredditPostsSuccess
  | LoadSubredditPostsFailure
  | AddSubscribe
  | RemoveSubscribe
  | GetSubredditDataSuccess;

type PostsState = {
  +isFetching: boolean,
  +updateAt?: string,
  +img: string,
  +description: string,
  +subscribe: boolean,
  items: {
    +title: string
  }[],
  +error?: string
}

type Json = {
  data: Object
}

const defaultImg: string = 'https://img.freepik.com/free-icon/reddit-social-logo-character_318-65151.jpg?size=338&ext=jpg';

const postsInitialState: PostsState = {
  isFetching: false,
  img: defaultImg,
  description: '',
  subscribe: false,
  items: [],
};

// const img = el.data.thumbnail === 'default' ? el.data.preview.images[0].source.url;
const isPreview = (elem) => {
  if (elem.thumbnail.search(/http/) !== -1) {
    return elem.thumbnail;
  }

  if (elem.preview !== undefined) {
    return elem.preview.images[0].source.url;
  }

  return 'https://blog.stylingandroid.com/wp-content/themes/lontano-pro/images/no-image-slide.png';
};

const postsParsing = (json: Json) => json.data.children.map(el => ({
  id: el.data.id,
  title: el.data.title,
  img: isPreview(el.data),
  subreddit: el.data.subreddit,
  subredditPrefix: el.data.subreddit_name_prefixed,
  url: `https://www.reddit.com${el.data.permalink}`,
}));

// Get subreddit data
// Make search and take subreddit data from response json
const getSubredditData = (subreddit: string, json: Object, type: string): string => {
  if (subreddit === 'popular') {
    return '';
  }

  const sub = json.data.children.filter(el => el.data.display_name === subreddit);

  if (sub[0].data.icon_img === '' || sub[0].data.icon_img === null) {
    sub[0].data.icon_img = defaultImg;
  }

  if (type === 'img') {
    return sub[0].data.icon_img;
  }
  if (type === 'descr') {
    return sub[0].data.public_description;
  }

  return '';
};


const posts = (state: PostsState = postsInitialState, action: Action): PostsState => {
  switch (action.type) {
    case types.LOAD_SUBREDDIT_POSTS_REQUEST:
      return {
        ...state,
        isFetching: true,
        subscribe: action.subscribe,
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
    case types.LOAD_SUBREDDIT_POSTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case types.GET_SUBREDDIT_DATA_SUCCESS:
      return {
        ...state,
        img: getSubredditData(action.subreddit, action.json, 'img'),
        description: getSubredditData(action.subreddit, action.json, 'descr'),
      };

    case types.ADD_SUBSCRIBE:
      return {
        ...state,
        subscribe: true,
      };
    case types.REMOVE_SUBSCRIBE:
      return {
        ...state,
        subscribe: false,
      };

    default:
      return state;
  }
};

const postsBySubreddit = (state: Object = {}, action: Action): Object => {
  switch (action.type) {
    case types.LOAD_SUBREDDIT_POSTS_REQUEST:
    case types.LOAD_SUBREDDIT_POSTS_SUCCESS:
    case types.GET_SUBREDDIT_DATA_SUCCESS:
      return {
        ...state,
        [action.subreddit]: posts(state[action.subreddit], action),
      };
    case types.ADD_SUBSCRIBE:
      return {
        ...state,
        [action.name]: posts(state[action.name], action),
      };
    case types.REMOVE_SUBSCRIBE:
      return {
        ...state,
        [action.name]: posts(state[action.name], action),
      };
    default:
      return state;
  }
};

export default postsBySubreddit;
