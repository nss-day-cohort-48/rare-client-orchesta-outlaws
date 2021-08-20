import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { dateConvert } from "../utils/HumanDate";
import { BsFillGearFill } from "react-icons/bs";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
import "./Post.css";

export const PostList = ({ postsArray, author }) => {
  const history = useHistory();
  const [modalShow, setModalShow] = useState(false);
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
          <Button onClick={props.onHide}>Yes</Button>
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
        {postsArray
          .sort((postA, postB) => {
            return (
              new Date(postB.publication_date) -
              new Date(postA.publication_date)
            );
          })
          .map((p) => (
            <div key={p.id} className="post">
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
                <div className="post__author">
                  <>
                    Author: {p.rare_user.user.first_name}{" "}
                    {p.rare_user.user.last_name}
                  </>
                </div>
                {/*<div className="post__reaction-count">
                  {postReactions.length > 0
                    ? postReactions.filter((pr) => pr.post_id === p.id).length
                    : 0}{" "}
                  Reactions
				</div>*/}
                {author && (
                  <>
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
                          setModalShow(true);
                        }}
                      />
                    </div>
                  </>
                )}
                <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
