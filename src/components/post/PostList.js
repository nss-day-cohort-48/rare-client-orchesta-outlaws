import React from "react";

export const PostList = ({ postsArray, postReactions, author }) => (
  <div className="posts">
    {postsArray.map((p) => {
      return (
        <div key="p.id" className="post">
          <div className="post__header">
            <div className="post__title">
              <Link to={`/posts/detail/${p.id}`}>
                <h2 className="post__title">{p.title}</h2>
              </Link>
            </div>
            <div className="post__date">
              Publication Date: {dateConvert(p.publication_date)}
            </div>
          </div>
          <div className="post__image--container">
            <img className="post__image" src={p.image_url} />
          </div>
          <div className="post__footer">
            <div className="post__author">
              {author ? (
                <>
                  Author: {author.first_name} {author.last_name}
                </>
              ) : (
                <>
                  Author: {p.user.first_name} {p.user.last_name}
                </>
              )}
            </div>
            <div className="post__reaction-count">
              {postReactions.length > 0
                ? postReactions.filter((pr) => pr.post_id === p.id).length
                : 0}
              Reactions
            </div>
            {author && (
              <>
                <div className="post__edit-icon">
                  <BsFillGearFill
                    onClick={(e) => {
                      e.preventDefault();
                      history.push(`/posts/edit/${p.id}`);
                    }}
                  />
                </div>
                <div className="post__delete-icon">
                  <FaTrashAlt
                    onClick={(e) => {
                      e.preventDefault();
                      setModalShow(true);
                    }}
                  />
                </div>
              </>
            )}
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
        </div>
      );
    })}
  </div>
);
