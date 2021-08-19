import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { PostList } from "./PostList";
import { PostContext } from "./PostProvider";
import { PostReactionContext } from "../postReaction/PostReactionProvdier";
import { Modal, Button, Table } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import { BsFillGearFill } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import { ModalConfirm } from "../common/ModalConfirm";
import "./Post.css";

export const AllPosts = (props) => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [lastClicked, setLastClicked] = useState(null);
  const { getAllPosts, deletePost } = useContext(PostContext);
  const { postReactions, getPostReactions } = useContext(PostReactionContext);
  useEffect(() => {
    getAllPosts().then(setPosts);
  }, [lastClicked]);

  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="allposts__container">
      <Table bordered className="allposts__table">
        <thead>
          <tr>
            <th>{/* first column is for buttons */}</th>
            <th>Title</th>
            <th>Author</th>
            <th>Date</th>
            <th>Category</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.id}>
              <td>
                {p.isMine && (
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div className="post__delete-icon">
                      <FaTrashAlt
                        onClick={(e) => {
                          e.preventDefault();
                          setLastClicked(p.id);
                          setModalShow(true);
                        }}
                      />
                    </div>
                    <div className="post__edit-icon">
                      <BsFillGearFill
                        onClick={(e) => {
                          e.preventDefault();
                          history.push(`/posts/edit/${p.id}`);
                        }}
                      />
                    </div>
                  </div>
                )}
              </td>
              <td>{p.title}</td>
              <td>
                {p.rare_user.user.first_name + " " + p.rare_user.user.last_name}
              </td>
              <td>{p.publication_date}</td>
              <td>{p.category.label}</td>
              <td>TAGS</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ModalConfirm
        body="Are you sure you want to delete this post?"
        state={modalShow}
        setState={setModalShow}
        yesAction={() => {
          deletePost(lastClicked)
            .then(getAllPosts().then(setPosts))
            .then(() => {
              setLastClicked(null);
            });
        }}
      />
    </div>
  );
};
