import { connect } from 'react-redux';
import Tabs from '../components/Tabs';

const mapStateToProps = state => ({
  selected: state.selectedSubreddit,
});

export default connect(mapStateToProps)(Tabs);
