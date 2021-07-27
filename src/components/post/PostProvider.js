import React, { createContext } from "react"

export const PostContext = createContext()

export const PostProvider = (props) => {

    const getUserPosts = (id) => {
        return fetch(`http://localhost:8088/posts?user_id=${id}`)
        .then(res => res.json())
    }

    return (
        <PostContext.Provider value={{
            getUserPosts
        }}>
            {props.children}
        </PostContext.Provider>
    )
}