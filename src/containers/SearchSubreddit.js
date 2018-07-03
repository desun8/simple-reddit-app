import { connect } from 'react-redux';
import SearchSubreddit from '../components/SearchSubreddit';

const mapStateToProps = state => ({
  subreddits: state.searchResult.result,
  isFetching: state.searchResult.isFetching,
});

export default connect(mapStateToProps)(SearchSubreddit);
