import React, { useState, createContext } from "react";
import { apiURL } from "../../utils/api";
import { authFetch } from "../../utils/auth";

export const PostContext = createContext();

export const PostProvider = (props) => {
  const getAllPosts = () => {
    return authFetch(`${apiURL}/posts`).then((res) => res.json());
  };

  const getPostById = (id) => {
    return authFetch(`${apiURL}/posts/${id}`).then((res) => res.json());
  };

  const getUserPosts = (id) => {
    return authFetch(`${apiURL}/posts?user_id=${id}`).then((res) => res.json());
  };

  const getUserSubbedPosts = (id) => {
    return authFetch(`${apiURL}/subs?follower_id=${id}`).then((res) =>
      res.json()
    );
  };

  const getPost = (id) => {
    return authFetch(`${apiURL}/posts/${id}`).then((res) => res.json());
  };

  const deletePost = (id) => {
    return authFetch(`${apiURL}/posts/${id}`, {
      method: "DELETE",
    });
  };

  const createPost = (post) => {
    return authFetch(`${apiURL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }).then((res) => res.json());
  };

  const updatePost = (post) => {
    return authFetch(`${apiURL}/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
  };

  const [post, setPost] = useState(null);

  return (
    <PostContext.Provider
      value={{
        getAllPosts,
        getPost,
        getPostById,
        getUserSubbedPosts,
        getUserPosts,
        createPost,
        updatePost,
        deletePost,
        post,
        setPost,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};
