import React, { createContext, useState } from "react";
import { apiURL } from "../../utils/api";
import { authFetch } from "../../utils/auth";

export const PostContext = createContext();

export const PostProvider = (props) => {
  const [searchTerms, setSearchTerms] = useState([]);

  const getMyPosts = () => {
    return authFetch(`${apiURL}/posts/my_posts`).then((res) => res.json());
  };


  const getAllPosts = () => {
    return authFetch(`${apiURL}/posts`).then((res) => res.json());
  };

  const getPostById = (id) => {
    return authFetch(`${apiURL}/posts/${id}`).then((res) => res.json());
  };


  const getSubbedPosts = () => {
    return authFetch(`${apiURL}/posts/subscriptions`).then((res) => res.json());

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

  return (
    <PostContext.Provider
      value={{
        getMyPosts,
        getAllPosts,
        getPost,
        getPostById,
        getSubbedPosts,
        createPost,
        updatePost,
        deletePost,
        searchTerms,
        setSearchTerms,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};
