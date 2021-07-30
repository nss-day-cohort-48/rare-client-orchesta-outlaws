import React, { createContext, useState } from "react"

export const CommentContext = createContext()

export const CommentProvider = (props) => {
    const [comments, setComments] = useState([])
   

    const getPostComments = (id) => {
        return fetch(`http://localhost:8088/comments?post_id=${id}`)
        .then(res => res.json())
    }

    const createComment = (newComm) => {
        return fetch("http://localhost:8088/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newComm)
        })}

    const deleteComment = (commId) => {
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
        <CommentContext.Provider value={{
            comments, getPostComments, deleteComment, updateComment, createComment
        }}>
            {props.children}
        </CommentContext.Provider>
    )
}