import { combineReducers } from 'redux';
import searchSubreddit from './searchSubreddit';
import selectedSubreddit from './selectedSubreddit';
import postsBySubreddit from './postsBySubreddit';
import mySubreddits from './mySubreddits';


const reducer = combineReducers({
  searchSubreddit,
  selectedSubreddit,
  postsBySubreddit,
  mySubreddits,
});

export default reducer;
