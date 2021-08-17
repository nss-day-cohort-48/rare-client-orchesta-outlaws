import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { CommentContext } from './CommentProvider';
import { BsFillGearFill, BsFillTrashFill } from 'react-icons/bs';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import "./Comment.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export const CommentList = () => {
    const { getPostComments, comments, updateComment, deleteComment, createComment } = useContext(CommentContext)
    const [comments, setComments] = useState([])
    const history = useHistory()
    const { postId } = useParams();

    
    useEffect(() => {
        getPostComments(postId).then(comments => setComments(comments))
    }, [postId])


    return (
        <div className="comments__container">
            {comments.map(comm => {
                <>
                    <div>{comm.content}</div>
                </>
            })}
            {/*<Form>
                <Form.Group className="comment__form" controlId="formComment">
                    <Form.Control onChange={handleInputChange} value={comment} type="text" placeholder="Type your comment here..." />
                    <Button>Submit</Button>
                </Form.Group>
            </Form>*/}
            </div>
    )
};

/* FORM EXAMPLE (mostly taken from https://react-bootstrap.github.io/components/forms/)
        -- the Form.Label is omitted as per the wireframe

<Form>
    <Form.Group className="comment__form" controlId="formComment">
        <Form.Control type="text" placeholder="Type your comment here...e />
        <Button>Submit</Button>"
    </Form.Group>
</Form>


*/