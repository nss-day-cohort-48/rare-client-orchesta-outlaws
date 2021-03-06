import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../user/UserProvider";
import { PostContext } from "./PostProvider";
import { PostReactionContext } from "../postReaction/PostReactionProvdier";
import { Link, useHistory, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { BsFillGearFill } from "react-icons/bs";
import "./Post.css";

export const MyPosts = () => {
  const { getMyPosts, deletePost } = useContext(PostContext);
  const [posts, setPosts] = useState([]);
  const { postReactions, getPostReactions } = useContext(PostReactionContext);
  const [modalShow, setModalShow] = useState(false);
  const history = useHistory();
  const [lastClicked, setLastClicked] = useState(null);

  useEffect(() => {
    getMyPosts().then((posts) => {
      const orderedPosts = posts.sort((a, b) => {
        return b.id - a.id;
      });
      setPosts(orderedPosts);
    });
  }, []);

  const dateConvert = (ISOdate) => {
    const date = ISOdate.split("-");
    const year = date.shift();
    date[0] = `${date[0]}/`;
    date.push(`/${year}`);
    return date.join("");
  };

  const MyVerticallyCenteredModal = (props) => {
    return (
      <Modal
        className="modal"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="modal_header" closeButton></Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this post?</p>
        </Modal.Body>
        <Modal.Footer className="modal_footer">
          <Button onClick={props => {
            deletePost(lastClicked)
            .then(() => {
              getMyPosts().then(posts => {
                const orderedPosts = posts.sort((a,b) => {
                  return (b.id - a.id)
                })
                setPosts(orderedPosts)
              });
            })
            setModalShow(false)
          }}>Yes</Button>
          <Button onClick={props.onHide}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <>
      <div className="add-post">
        <div className="add-post__icon">
          <FaPlus
            className="plus-icon"
            onClick={(e) => {
              e.preventDefault();
              history.push("/posts/create");
            }}
          />
        </div>
        <div className="add-post__text">Add Post</div>
      </div>

      <div className="posts">
        {posts.map((p) => {
          return (
            <div key="p.id" className="post">
              <div className="post__header">
                <div className="post__title">
                  <Link to={`/posts/detail/${p.id}`}>
                    <h2 className="post__title">{p.title}</h2>
                  </Link>
                </div>
                <div className="post__date">
                  Publication Date: {dateConvert(p.publication_date)}
                </div>
              </div>
              <div className="post__image--container">
                <img className="post__image" src={p.image_url} />
              </div>
              <div className="post__footer">
                <Link to={`/users/detail/${p.rare_user.id}`}>
                  <div className="post__author">
                    Author: {p.rare_user.user.first_name}{" "}
                    {p.rare_user.user.last_name}
                  </div>
                </Link>
                <div className="post__reaction-count">
                  {postReactions.length > 0
                    ? postReactions.filter((pr) => pr.post_id === p.id).length
                    : 0}{" "}
                  Reactions
                </div>
                <div className="post__edit-icon">
                  <BsFillGearFill
                    onClick={(e) => {
                      e.preventDefault();
                      history.push(`/posts/edit/${p.id}`);
                    }}
                  />
                </div>
                <div className="post__delete-icon">
                  <FaTrashAlt
                    onClick={(e) => {
                      e.preventDefault();
                      setLastClicked(p.id)
                      setModalShow(true);
                    }}
                  />
                </div>
                <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
