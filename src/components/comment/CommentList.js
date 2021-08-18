import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { CommentContext } from './CommentProvider';
import { PostContext } from '../post/PostProvider';
import { BsFillGearFill, BsFillTrashFill } from 'react-icons/bs';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import "./Comment.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export const CommentList = () => {
    const { getPostComments, getAllComments } = useContext(CommentContext);
    const { getPostById } = useContext(PostContext);
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState({});
    const { postId } = useParams();


    useEffect(() => {
        getAllComments().then(comments => setComments(comments))
    }, [])

    useEffect(() => {
        getPostById(postId).then(post => setPost(post))
    }, [postId])

    console.log(comments)


    return (
        <div className="comments__container">
            {comments.map(comm =>
                <>
                    <div className="comment__card">
                        <div>{post.title}</div>
                        <div className="comments">{comm.id}) {comm.content}</div>
                        
                    </div>
                </>
            )}
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