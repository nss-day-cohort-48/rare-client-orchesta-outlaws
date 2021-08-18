import React, { createContext, useState } from "react"
import { apiURL } from "../../utils/api";
import { authFetch } from "../../utils/auth";


export const PostReactionContext = createContext()

export const PostReactionProvider = (props) => {
    const [postReactions, setPostReactions] = useState([])

    const getPostReactions = () => {
        return authFetch(`${apiURL}`)
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