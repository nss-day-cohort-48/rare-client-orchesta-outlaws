import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { CommentContext } from './CommentProvider';
import { PostContext } from '../post/PostProvider';
import { UserContext } from '../user/UserProvider';
import { BsFillGearFill, BsFillTrashFill } from 'react-icons/bs';
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import "./Comment.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export const CommentList = () => {
    const { getPostComments, getAllComments, deleteComment } = useContext(CommentContext);
    const [comments, setComments] = useState([]);
    const { getPostById } = useContext(PostContext);
    const [modalShow, setModalShow] = useState(false);
    const [lastClicked, setLastClicked] = useState(null);
    const history = useHistory()
    const [post, setPost] = useState({});
    const { postId } = useParams();


    useEffect(() => {
        getPostComments(parseInt(postId)).then(comments => setComments(comments))
    }, [])

    useEffect(() => {
        getPostById(postId).then(post => setPost(post))
    }, [postId])

    console.log(comments)
    

    const MyVerticallyCenteredCommentModal = (props) => {
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
                    <p>Are you sure you want to delete this comment?</p>
                </Modal.Body>
                <Modal.Footer className="modal_footer">
                    <Button
                        onClick={() => {
                            deleteComment(lastClicked).then(() => {
                                setLastClicked(null);
                                getPostComments(parseInt(postId)).then(setComments);
                                props.onHide();
                            });
                        }}
                    >
                        Yes
                    </Button>
                    <Button onClick={props.onHide}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    };


    return (
        <>
            <div className="comments__container">
                {comments.map(comm =>

                    <div className="comment__card">
                        <div>{post.title}</div>
                        <div>{comm.author.user}</div>
                        <div className="comments">{comm.content} {comm.publication_date}</div>
                        <div className="comment__edit-icon">
                            <BsFillGearFill
                                onClick={(e) => {
                                    e.preventDefault();
                                    history.push(`/posts/detail/${comm.id}/edit`);
                                }}
                            />
                        </div>
                        <div className="comment__delete-icon">
                            <FaTrashAlt
                                onClick={(e) => {
                                    setLastClicked(comm.id)
                                    e.preventDefault();
                                    setModalShow(true);
                                }}
                            />
                        </div>
                    </div>

                )}
                <MyVerticallyCenteredCommentModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>
        </>
    )
}

