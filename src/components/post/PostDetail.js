import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { PostContext } from "./PostProvider";
import { PostReactionContext } from "../postReaction/PostReactionProvdier";
import { Image } from "react-bootstrap";
import "./PostDetail.css";

export const PostDetail = () => {
  const { postId } = useParams();
  const { getPost, post, setPost } = useContext(PostContext);
  const [refresh, setRefresh] = useState(false);
  const { createPostReaction } = useContext(PostReactionContext);

  useEffect(() => {
    getPost(postId).then(setPost);
  }, [postId, refresh]);

  // modified implementation of reaction interface
  const newReactionCounter = () => {
    const reactions = post.reaction_counter;
    let reactionArray = [];
    for (let key in reactions) {
      reactionArray.push({
        id: key,
        count: reactions[key].count,
        image_url: reactions[key].image_url,
      });
    }
    return reactionArray.map((reactObj) => (
      <div className="reaction_display">
        <button
          className="reaction_button"
          onClick={(event) => {
            event.preventDefault();
            createPostReaction({ post: postId, reaction: reactObj.id });
            if (refresh) {
              setRefresh(false);
            } else {
              setRefresh(true);
            }
          }}
        >
          <div className="reaction_image_container">
            <Image
              className="reaction_image"
              src={reactObj.image_url}
              alt={reactObj.label}
              width="15"
              height="15"
            />
          </div>
          <div className="reaction_counter">{reactObj.count}</div>
        </button>
      </div>
    ));
  };

  // TODO backend should be doing this
  const author = (post) => {
    return `${post.rare_user.user.first_name} ${post.rare_user.user.last_name}`;
  };

  return (
    <>
      {post ? (
        <div className="post-detail__container">
          <div>
            <div className="post-detail__row-container">
              <h2 className="post-detail__title" children={post.title} />
              <div
                children={post.category.label}
                className="post-detail__category"
              />
            </div>
            <Image className="post-detail__image" src={post.image_url} fluid />
            <div className="post-detail__row-container">
              <div className="post-detail__author">By {author(post)} </div>
              <div className="reaction_container">
                <Link to={`${postId}/comments`}>
                  <button>View All Comments for this Post</button>
                </Link>
              </div>
              <div className="reaction_container">
                <Link to={`${postId}/newcomment`}>
                  <button>Add Comment</button>
                </Link>
              </div>
              <div className="reaction_interface_outline">
                {newReactionCounter()}
              </div>
            </div>
            <p>{post.content}</p>
          </div>
          <div className="post-detail__tag-container">
            <div style={{ minHeight: "2rem" }} />
            {"tags" in post &&
              post.tags.map((t) => (
                <div className="reaction_container" children={t.label} />
              ))}
          </div>
        </div>
      ) : (
        <> {"...loading..."} </>
      )}
    </>
  );
};
