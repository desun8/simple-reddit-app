import { connect } from 'react-redux';
import SearchSubreddit from '../components/SearchSubreddit';

const mapStateToProps = state => ({
  // subreddits: state.searchSubreddit.result,
  isFetching: state.searchSubreddit.isFetching,
});

export default connect(mapStateToProps)(SearchSubreddit);
