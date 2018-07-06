// @flow
import React, { Component } from 'react';
import {
  fetchLoadSubredditPosts,
  selectedSubreddit,
  subscribeToSubreddit,
  unsubscribeToSubreddit,
} from '../../actions';
import Posts from './Posts';
import Search from './Search';
import MySubreddits from './MySubreddits';

type Props = {
  selected: string,
  posts: any,
  dispatch: any,
  searchIsFetching: boolean,
  searchResult: {
    name: string,
    description: string,
    img: string,
  }[],
  mySubreddits: {
    name: string;
    img: string,
    description: string,
  }[],
}

class MainPage extends Component<Props> {
  componentDidMount = () => {
    const { selected, dispatch } = this.props;
    dispatch(fetchLoadSubredditPosts(selected));
  };

  componentDidUpdate = (prevProps: Object) => {
    const { selected, dispatch } = this.props;

    if (selected !== prevProps.selected) {
      if (selected !== 'mySubreddits' && selected !== '_SEARCH') {
        dispatch(fetchLoadSubredditPosts(selected));
      }
    }
  };

  handleClick = (e: any) => {
    const { dispatch } = this.props;
    dispatch(selectedSubreddit(e.target.dataset.name));
  };

  handleRefresh = () => {
    const { selected, dispatch } = this.props;
    dispatch(fetchLoadSubredditPosts(selected));
  };

  handleAdd = (e: any) => {
    const { mySubreddits, dispatch } = this.props;
    if (mySubreddits.some(el => el.name === e.target.dataset.name)) {
      console.warn('You\'re already subscribed to this subreddit!');
    }

    dispatch(subscribeToSubreddit(
      e.target.dataset.name,
      e.target.dataset.img,
      e.target.dataset.description,
    ));
  };

  handleRemove = (e: any) => {
    const { dispatch } = this.props;
    dispatch(unsubscribeToSubreddit(e.target.dataset.name));
  };

  render() {
    const { selected, posts } = this.props;
    const isPosts = posts[selected] !== undefined && selected !== 'mySubreddits' && selected !== '_SEARCH';
    const isSearch = selected === '_SEARCH';
    const isMySubreddits = selected === 'mySubreddits';

    return (
      <div className="container">
        <div className="row">
          {isPosts && (
            <Posts
              {...this.props}
              handleRefresh={this.handleRefresh}
              handleClick={this.handleClick}
              handleAdd={this.handleAdd}
            />
          )}

          {isSearch && (
            <Search
              {...this.props}
              handleClick={this.handleClick}
              handleAdd={this.handleAdd}
            />
          )}

          {isMySubreddits && (
            <MySubreddits
              {...this.props}
              handleClick={this.handleClick}
              handleRemove={this.handleRemove}
            />
          )}

        </div>
      </div>
    );
  }
}

export default MainPage;