// @flow
import React from 'react';

type Props = {
  mySubreddits: {
    name: string;
    img: string,
    description: string,
  }[],
  handleClick: any,
  handleRemove: any,
}

const MySubreddits = (props: Props) => {
  const { mySubreddits, handleClick, handleRemove } = props;
  const isEmpty = mySubreddits.length < 1;

  return (
    <div>
      {isEmpty && (
        <p>
          You are not subscribed any subreddits.
        </p>
      )}

      {!isEmpty && (
        <ul className="list-group list-group-flush">
          {mySubreddits.map(subreddit => (
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
                </h4>
                <button
                  className="btn btn-danger btn-sm"
                  type="button"
                  data-name={subreddit.name}
                  onClick={handleRemove}
                >
                  unsubscribe
                </button>
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

export default MySubreddits;
