import React, { createContext } from "react"

export const CommentContext = createContext()

export const CommentProvider = (props) => {
    const [comments, setComments] = useState([])

    const getPostComments = (id) => {
        return fetch(`http://localhost:8088/comments?post_id=${id}`)
        .then(res => res.json())
    }

    const deleteComment = commId => {
        return fetch(`http://localhost:8088/comments/${commId}`, {
            method: "DELETE"
        })
        .then(getPostComments)
    }

    const updateComment = commObj => {
        return fetch(`http://localhost:8088/comments/${commObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(commObj)
        })
        .then(getPostComments)
    }

    return (
        <PostContext.Provider value={{
            comments, getPostComments, deleteComment, updateComment
        }}>
            {props.children}
        </PostContext.Provider>
    )
}