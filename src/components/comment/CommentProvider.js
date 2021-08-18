import React, { createContext, useState } from "react"
import { authFetch } from "../../utils/auth";
import { apiURL } from "../../utils/api";

export const CommentContext = createContext()

export const CommentProvider = (props) => {
    const [comments, setComments] = useState([])
   

    const getAllComments = () => {
        return authFetch(`${apiURL}/comments`)
        .then(res => res.json())
    }

    const getPostComments = (id) => {
        return authFetch(`${apiURL}/comments?post=${id}`)
        .then(res => res.json())
    }

    const createComment = (newComm) => {
        return authFetch(`${apiURL}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newComm)
        })}

    const deleteComment = (commId) => {
        return authFetch(`${apiURL}/comments/${commId}`, {
            method: "DELETE"
        })
        /*.then(getPostComments)*/
    }

    const updateComment = commObj => {
        return authFetch(`${apiURL}/comments/${commObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(commObj)
        })
        /*.then(getPostComments)*/
    }

    return (
        <CommentContext.Provider value={{
            comments, getPostComments, getAllComments, deleteComment, updateComment, createComment
        }}>
            {props.children}
        </CommentContext.Provider>
    )
}