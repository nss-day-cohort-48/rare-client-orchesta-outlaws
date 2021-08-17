import React, { useState, useContext, useEffect } from "react";
import { PostList } from "./PostList";
import { PostContext } from "./PostProvider";
import { PostReactionContext } from "../postReaction/PostReactionProvdier";
import { Table } from "react-bootstrap";

export const AllPosts = (props) => {
  const [posts, setPosts] = useState([]);
  const { getAllPosts } = useContext(PostContext);
  const { postReactions, getPostReactions } = useContext(PostReactionContext);
  useEffect(() => {
    getAllPosts().then(setPosts);
  }, []);
  return (
    <Table bordered>
      <thead></thead>
    </Table>
  );
};
