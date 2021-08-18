import React, { createContext } from "react";
import { apiURL } from "../../utils/api";
import { authFetch } from "../../utils/auth";

export const PostContext = createContext();

export const PostProvider = (props) => {
  const getAllPosts = () => {
    return authFetch(`${apiURL}/posts`).then((res) => res.json());
  };

  const getUserPosts = (id) => {
    return authFetch(`${apiURL}/posts?user_id=${id}`).then((res) => res.json());
  };

  const getUserSubbedPosts = (id) => {
    return authFetch(`${apiURL}/subs?follower_id=${id}`).then((res) =>
      res.json()
    );
  };

  const deletePost = (id) => {
    return authFetch(`${apiURL}/posts/${id}`, {
      method: "DELETE",
    });
  };

  return (
    <PostContext.Provider
      value={{
        getUserPosts,
        getUserSubbedPosts,
        getAllPosts,
        deletePost,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};
