import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "./PostProvider";
import { Image } from "react-bootstrap";
import "./PostDetail.css";

export const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const { getPost } = useContext(PostContext);

  useEffect(() => {
    getPost(postId).then(setPost);
  }, [postId]);

  // TODO backend should be doing this
  const author = (post) => {
    return `${post.rare_user.user.first_name} ${post.rare_user.user.last_name}`;
  };

  return (
    <>
      {post ? (
        <div className="post-detail__container">
          <div>
            <h2 className="post-detail__title">{post.title}</h2>
            <div
              children={post.category.label}
              className="post-detail__category"
            />
            <div className="post-detail__image-container">
              <Image
                className="post-detail__image"
                src={post.image_url}
                fluid
              />
            </div>
            <div className="post-detail__row-container">
              <div className="post-detail__author">By {author(post)} </div>
              <div className="reaction_container">
                I am the comments button!
              </div>
              <div className="reaction_container">I am a reaction!</div>
            </div>
            <p>{post.content}</p>
          </div>
          <div className="post-detail__tag-container">
            <div style={{ minHeight: "2rem" }} />
            <div className="reaction_container">I am a tag!</div>{" "}
          </div>
        </div>
      ) : (
        <> {"...loading..."} </>
      )}
    </>
  );
};
