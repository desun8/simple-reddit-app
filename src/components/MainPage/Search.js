// @flow
import React from 'react';

type Props = {
  searchIsFetching: boolean,
  searchResult: {
    name: string,
    description: string,
    img: string,
  }[],
  handleClick: any,
  handleAdd: any,
}

const Search = (props: Props) => {
  const {
    searchIsFetching,
    searchResult,
    handleClick,
    handleAdd,
  } = props;

  return (
    <div>
      {searchIsFetching && (
        <p>
          Searching...
        </p>
      )}

      {!searchIsFetching && (
        <ul className="list-group list-group-flush">
          {searchResult.map(subreddit => (
            <li className="list-group-item flex-column" key={subreddit.name}>
              <div className="d-flex">
                <img
                  className="mr-2"
                  style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                  src={subreddit.img}
                  alt={subreddit.name}
                />
                <h4 className="mb-1">
                  <button
                    className="btn btn-link"
                    type="button"
                    data-name={subreddit.name}
                    onClick={handleClick}
                  >
                    {subreddit.name}
                  </button>
                  <button
                    className="btn btn-success"
                    type="button"
                    data-name={subreddit.name}
                    data-img={subreddit.img}
                    data-description={subreddit.description}
                    onClick={handleAdd}
                  >
                    subscribe
                  </button>
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
      )}
    </div>
  );
};

export default Search;
