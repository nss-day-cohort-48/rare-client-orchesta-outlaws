import React, {useContext, useState} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { CommentContext } from './CommentProvider'

export const CommentForm = () => {
    const { postId } = useParams()
    const history = useHistory()
    const {createComment } = useContext(CommentContext)

    const [comment, setComment] = useState({
        content: "",
        author: localStorage.getItem("rare_user_id"),
        subject: postId
    })

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
            subject: postId
        }

        createComment(comment)
            .then(() => history.push(`/posts/detail/${postId}`))
    }

    return (
        <form className="commentForm">
        <h2 className="commentForm__name">Add Comment:</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="content">Comment: </label>
                <textarea type="text" name="content" required autoFocus className="form-control"
                    value={comment.content}
                    onChange={handleUserInput}
                />
            </div>
        </fieldset>
        <button type="submit"
            onClick={handleSaveComment}
            className="btn btn-primary">Save Comment</button>
    </form>
    )
}