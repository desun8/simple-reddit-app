import { connect } from 'react-redux';
import MainPage from '../components/MainPage';


const mapStateToProps = state => ({
  selected: state.selectedSubreddit,
  posts: state.postsBySubreddit,
  searchIsFetching: state.searchSubreddit.isFetching,
  searchResult: state.searchSubreddit.result,
  mySubreddits: state.mySubreddits,
});

export default connect(mapStateToProps)(MainPage);
