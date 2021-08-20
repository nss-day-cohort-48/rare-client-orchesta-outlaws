import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
                <Link to={`${postId}/comments`}><button>View All Comments for this Post</button></Link>
              </div>
              <div className="reaction_container">
                <Link to={`posts/${postId}/newcomment`}><button>Add Comment</button></Link>
              </div>
              <div className="reaction_container">
                {"reactions" in post &&
                  post.reactions.map((r) => (
                    <div className="reaction_outline">
                      <Image
                        roundedCircle
                        src={r.image_url}
                        alt={r.label}
                        width="18"
                        height="18"
                      />
                    </div>
                  ))}
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
