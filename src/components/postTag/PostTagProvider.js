import React, { createContext } from "react";
import { apiURL } from "../../utils/api";
import { authFetch } from "../../utils/auth";


export const PostTagContext = createContext()

export const PostTagProvider = (props) => {
    
    const getPostTagsByPostId = id => {
        return authFetch(`${apiURL}/posttags?post_id=${id}`)
        .then((res) => res.json())
    }

    const createPostTag = postTag => {
        return authFetch(`${apiURL}/posttags`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postTag)
        })
    }

    const deletePostTag = id => {
        return authFetch(`${apiURL}/posttags/${id}`, {
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