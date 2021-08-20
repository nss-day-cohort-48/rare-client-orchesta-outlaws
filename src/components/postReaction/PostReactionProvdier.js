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

    // The .then() statement is somewhat unnecessary here, as is getPostReactions(),
    // given the recent restructuring of the server
    const createPostReaction = (postReaction) => {
        return authFetch(`${apiURL}/post_reactions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postReaction)
        }).then(getPostReactions)
    }

    return (
        <PostReactionContext.Provider value={{
            postReactions, getPostReactions, createPostReaction
        }}>
            {props.children}
        </PostReactionContext.Provider>
    )
}