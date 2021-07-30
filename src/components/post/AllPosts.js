import React, { useState, useContext, useEffect } from "react";
import { PostList } from "./PostList";
import { PostContext } from "./PostProvider";
import { PostReactionContext } from "../postReaction/PostReactionProvdier";

export const AllPosts = (props) => {
  const [posts, setPosts] = useState([]);
  const { getAllPosts } = useContext(PostContext);
  const { postReactions, getPostReactions } = useContext(PostReactionContext);
  useEffect(() => {
    getAllPosts()
      .then(setPosts)
      .then(() => getPostReactions());
  }, []);
  return <PostList postsArray={posts} postReactions={postReactions} />;
};
