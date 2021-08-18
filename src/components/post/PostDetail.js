import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "./PostProvider";
import "./Post.css";

export const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const { getPost } = useContext(PostContext);

  useEffect(() => {
    getPost(postId).then(setPost);
  }, [postId]);

  return (
    <>
      {post ? (
        <>
          <h2>{post.title}</h2>
        </>
      ) : (
        <> {"...loading..."} </>
      )}
    </>
  );
};
