import React, { useState, useContext, useEffect } from "react";
import { PostReactionContext } from "../postReaction/PostReactionProvdier";
import { PostList } from "./PostList";
import { PostContext } from "./PostProvider";

export const SubbedPosts = (props) => {
  const [posts, setPosts] = useState([]);
  const { getUserSubbedPosts } = useContext(PostContext);
  const { postReactions, getPostReactions } = useContext(PostReactionContext);
  useEffect(() => {
    getUserSubbedPosts(localStorage.getItem("rare_user_id"))
      .then(setPosts)
      .then(() => getPostReactions());
  }, []);
  return <PostList postsArray={posts} postReactions={postReactions} />;
};
