import React, { useContext, useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { CommentContext } from './CommentProvider'

export const CommentForm = () => {
    const { postId } = useParams()
    const history = useHistory()
    const [comments, setComments] = useState([]);
    const { createComment, updateComment, getCommentById, getPostComments } = useContext(CommentContext);

    const [comment, setComment] = useState({
        content: "",
        author: localStorage.getItem("rare_user_id"),
        subject: 0,
        publication_date: new Date().toISOString().slice(0, 10)
    });


    useEffect(() => {
        getPostComments(parseInt(postId)).then(comments => setComments(comments))
    }, [postId]);

    useEffect(() => {
        if (postId) {
            getCommentById(parseInt(postId)).then(com => {
                setComment({
                    content: com.context,
                    author: com.author,
                    subject: com.post.title,
                    publication_date: com.publication_date
                })
            })
        }
    }, [postId])

    const handleUserInput = (event) => {
        const newCommentState = { ...comment }
        newCommentState[event.target.name] = event.target.value
        setComment(newCommentState)
    }
    
    const handleSaveComment = (event) => {
        event.preventDefault()

        const comment = {
            content: comment.content,
            author: localStorage.getItem("rare_user_id"),
            subject: postId,
            publication_date: comment.publication_date
        }

        createComment(comment)
            .then(() => history.push(`/posts/detail/${postId}`))
    }

    return (
        <form className="commentForm">
            <h2 className="commentForm__name">Update Comment:</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Comment: </label>
                    <textarea type="text" name="content" required autoFocus className="form-control"
                        value={comment.content}
                        onChange={handleUserInput}
                    />
                </div>
            </fieldset>

            {
                (postId)
                    ? <button
                        onClick={evt => {
                            evt.preventDefault()

                            const com = {
                                id: comment.id,
                                content: comment.content,
                                author: comment.author,
                                post: postId
                            }

                            updateComment(com)
                                .then(() => history.push("posts/details"))
                        }}
                        className="btn btn-primary">Edit Comment</button>
                    :
                    <button type="submit"
                        onClick={handleSaveComment}
                        className="btn btn-primary">Save Comment</button>
            }
        </form>
    )
}