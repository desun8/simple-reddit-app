import { connect } from 'react-redux';
import SearchSubreddit from '../components/SearchSubreddit';

const mapStateToProps = state => ({
  result: state.mySubreddits,
  isFetching: state.searchSubreddit.isFetching,
});

export default connect(mapStateToProps)(SearchSubreddit);
