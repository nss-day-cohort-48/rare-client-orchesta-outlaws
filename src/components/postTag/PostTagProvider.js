import React, { createContext } from "react";

export const PostTagContext = createContext()

export const PostTagProvider = (props) => {
    const apiURL = "http://localhost:8088"
    
    const getPostTagsByPostId = id => {
        return fetch(`${apiURL}/posttags?post_id=${id}`)
        .then((res) => res.json())
    }

    const createPostTag = postTag => {
        return fetch(`${apiURL}/posttags`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postTag)
        })
    }

    const deletePostTag = id => {
        return fetch(`${apiURL}/posttags/${id}`, {
            method: "DELETE"
        })
    }

    return (
        <PostTagContext.Provider
            value={{
                getPostTagsByPostId,
                createPostTag,
                deletePostTag
            }}
        >
            {props.children}
        </PostTagContext.Provider>
    );
};