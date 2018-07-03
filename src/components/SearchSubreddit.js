// @flow
import React from 'react';
import { fetchSearchSubredditIfValid } from '../actions';

type Props = {
  subreddits: {
    name: string,
    description: string,
    img: string,
  }[],
  isFetching: boolean,
  dispatch: any,
}

const SearchSubreddit = (props: Props) => {
  const { subreddits, isFetching, dispatch } = props;
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
      <h1>
        Search subreddits
      </h1>
      <form
        className="input-group mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(fetchSearchSubredditIfValid(inputRef.value));
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
          className="btn btn-primary disabled"
          type="submit"
          ref={(e) => { btnRef = e; }}
        >
          Search
        </button>
      </form>

      {isFetching
        && (
          <p>
            Searching...
          </p>
        )
      }
      {!isFetching
        && (
          <ul className="list-group list-group-flush">
            {subreddits.map(subreddit => (
              <li className="list-group-item flex-column" key={subreddit.name}>
                <div className="d-flex">
                  <img
                    className="mr-2"
                    style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                    src={subreddit.img}
                    alt={subreddit.name}
                  />
                  <h4 className="mb-1">
                    {subreddit.name}
                  </h4>
                </div>

                <p className="mb-1">
                  <small>
                    {subreddit.description}
                  </small>
                </p>
              </li>
            ))}
          </ul>
        )
      }
    </div>
  );
};

export default SearchSubreddit;
