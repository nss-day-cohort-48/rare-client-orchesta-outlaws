import React, { useState, useContext, useEffect } from "react";
import { PostReactionContext } from "../postReaction/PostReactionProvdier";
import { PostList } from "./PostList";
import { PostContext } from "./PostProvider";

export const SubbedPosts = (props) => {
  const [posts, setPosts] = useState([]);
  const { getSubbedPosts } = useContext(PostContext);
  const { postReactions, getPostReactions } = useContext(PostReactionContext);
  useEffect(() => {
    getSubbedPosts().then(setPosts);
  }, []);
  return <PostList postsArray={posts} postReactions={postReactions} />;
};
