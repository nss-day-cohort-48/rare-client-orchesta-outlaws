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
    const [test, setComments] = useState([])
    const [comment, setComment] = useState("")
    const history = useHistory()
    const { postId } = useParams();

    
    useEffect(() => {
        getPostComments(postId).then(setComments)
    }, [postId])

    const handleInputChange = (e ()> {
           setComment(e.target.value)  }




    const handleSubmit = (e) => {
        e.preventDefault()
    }    

    return (
        <div className="comments__container">
            <Form>
                <Form.Group className="comment__form" controlId="formComment">
                    <Form.Control onChange={handleInputChange} value={comment} type="text" placeholder="Type your comment here..." />
                    <Button>Submit</Button>
                </Form.Group>
            </Form>
            <h2>Post Title's Comments</h2>
            <div class="comments">
                <div className="comment__card">Comment 1</div>
                <div className="comment__card">Comment 2</div>
                <div className="comment__card">Comment 3</div>
                <div className="comment__card">Comment 4</div>
                <div className="comment__card">Comment 5</div>
                <div className="comment__card">Comment 6</div>
            </div>
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