import React, { createContext } from "react";

export const PostContext = createContext();

export const PostProvider = (props) => {
  const apiURL = "http://localhost:8088";

  const getAllPosts = () => {
    return fetch(`${apiURL}/posts`).then((res) => res.json());
  };

  const getUserPosts = (id) => {
    return fetch(`${apiURL}/posts?user_id=${id}`).then((res) => res.json());
  };

  const getUserSubbedPosts = (id) => {
    return fetch(`${apiURL}/subs?follower_id=${id}`).then((res) => res.json());
  };

  return (
    <PostContext.Provider
      value={{
        getUserPosts,
        getUserSubbedPosts,
        getAllPosts,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};
