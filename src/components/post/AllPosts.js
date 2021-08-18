import React, { useState, useContext, useEffect } from "react";
import { PostList } from "./PostList";
import { PostContext } from "./PostProvider";
import { PostReactionContext } from "../postReaction/PostReactionProvdier";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Post.css";

export const AllPosts = (props) => {
  const [posts, setPosts] = useState([]);
  const { getAllPosts } = useContext(PostContext);
  const { postReactions, getPostReactions } = useContext(PostReactionContext);
  useEffect(() => {
    getAllPosts().then(setPosts);
  }, []);
  return (
    <div className="allposts__container">
      <Table bordered className="allposts__table">
        <thead>
          <th>Title</th>
          <th>Author</th>
          <th>Date</th>
          <th>Category</th>
          <th>Tags</th>
        </thead>
        {posts.map((p) => (
          <tr key={p.id}>
            <td>{p.title}</td>
            <td>
              {p.rare_user.user.first_name + " " + p.rare_user.user.last_name}
            </td>
            <td>{p.publication_date}</td>
            <td>{p.category.label}</td>
            <td>TAGS</td>
          </tr>
        ))}
      </Table>
    </div>
  );
};
