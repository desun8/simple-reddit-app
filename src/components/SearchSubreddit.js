// @flow
import React from 'react';
import { fetchSearchSubredditIfValid, selectedSubreddit } from '../actions';

type Props = {
  isFetching: boolean,
  dispatch: any,
}

const SearchSubreddit = (props: Props) => {
  const { isFetching, dispatch } = props;
  let inputRef: any;
  let btnRef: any;

  const cl = (value) => {
    if (value) {
      return 'btn btn-primary';
    }

    return 'btn btn-primary disabled';
  };

  return (
    <div className="container">
      <div className="row">
        <h1>
          Search subreddits
        </h1>
        <form
          className="input-group mb-4"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(fetchSearchSubredditIfValid(inputRef.value));
            dispatch(selectedSubreddit('_SEARCH'));
          }}
        >
          <input
            className="form-control"
            type="text"
            ref={(e) => { inputRef = e; }}
            onChange={(e) => {
              btnRef.className = cl(e.target.value);
            }}
          />
          <button
            className={isFetching ? 'btn btn-primary active' : 'btn btn-primary disabled'}
            type="submit"
            ref={(e) => { btnRef = e; }}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchSubreddit;
