// @flow
import React from 'react';

type Props = {
  selected: string,
  posts: any,
  handleRefresh: any,
  handleClick: any,
  handleAdd: any,
  handleRemove: any,
}

const Posts = (props: Props) => {
  const {
    selected,
    posts,
    handleRefresh,
    handleClick,
    handleAdd,
    handleRemove,
  } = props;

  return (
    <div className="w-100">
      <div className="w-100 mb-3">
        <h4>
          {selected}
        </h4>
        <div className="d-flex justify-content-end">
          {selected !== 'popular' && (
            <button
              className={posts[selected].subscribe ? 'btn btn-danger' : 'btn btn-success'}
              type="button"
              data-name={selected}
              data-img={posts[selected].img}
              data-description={posts[selected].description}
              onClick={posts[selected].subscribe ? handleRemove : handleAdd}
            >
              {posts[selected].subscribe ? 'unsubscribe' : 'subscribe'}
            </button>
          )}
          <button
            className="btn btn-sm btn-primary"
            type="button"
            onClick={handleRefresh}
          >
            Refresh
          </button>
        </div>
        <div className="d-flex justify-content-end">
          <small>
            {`Last update: ${posts[selected].updateAt}`}
          </small>
        </div>
      </div>

      {posts[selected].isFetching && (
        <p>
          Loading...
        </p>
      )}

      <ul className="list-group">
        {
          posts[selected].items.map(el => (
            <li
              className="list-group-item"
              key={el.id}
            >
              <img
                className="float-left"
                style={{
                  width: '80px',
                  maxHeight: '100px',
                }}
                src={el.img}
                alt="Post preview"
              />
              <div className="row">
                <a
                  className="col-12"
                  href={el.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {
                    el.title.length > 100 && window.innerWidth < 700
                      ? `${el.title.slice(0, 100)}...` : el.title
                  }
                </a>
                <button
                  className="btn btn-light btn-sm ml-3"
                  type="button"
                  data-name={el.subreddit}
                  onClick={handleClick}
                >
                  {el.subredditPrefix}
                </button>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default Posts;
