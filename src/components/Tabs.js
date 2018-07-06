// @flow
import React, { Component } from 'react';
import { selectedSubreddit } from '../actions';

type Props = {
  selected: string,
  dispatch: any,
}

class Tabs extends Component<Props> {
  handleClick = (e: any) => {
    const { dispatch } = this.props;
    dispatch(selectedSubreddit(e.target.dataset.name));
  };

  render() {
    const { selected } = this.props;
    const activeTab: string = selected;

    return (
      <div className="container mb-3">
        <div className="row d-flex justify-content-center">
          <div className="btn-group">

            <button
              className={activeTab === 'popular' ? 'btn btn-secondary active' : 'btn btn-secondary'}
              type="button"
              data-name="popular"
              onClick={this.handleClick}
            >
              Popular
            </button>
            <button
              className={activeTab === 'mySubreddits' ? 'btn btn-secondary active' : 'btn btn-secondary'}
              type="button"
              data-name="mySubreddits"
              onClick={this.handleClick}
            >
              My subreddits
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Tabs;
