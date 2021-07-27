import React, { createContext, useState } from "react"

export const PostReactionContext = createContext()

export const PostReactionProvider = (props) => {
    const [postReactions, setPostReactions] = useState([])

    const getPostReactions = (id) => {
        return fetch(`http://localhost:8088/postreactions`)
        .then(res => res.json())
        .then(setPostReactions)
    }

    return (
        <PostReactionContext.Provider value={{
            postReactions, getPostReactions
        }}>
            {props.children}
        </PostReactionContext.Provider>
    )
}