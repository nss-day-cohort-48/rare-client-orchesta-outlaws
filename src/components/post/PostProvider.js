import React, { createContext, useState } from "react"

export const PostContext = createContext();

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([])
    const apiURL = "http://localhost:8088";

    const getAllPosts = () => {
        return fetch(`${apiURL}/posts`)
            .then(res => res.json())
            .then(setPosts)
    }

    const getPostById = id => {
        return fetch(`${apiURL}/posts/${id}`)
            .then(res => res.json())
    }

    const getUserPosts = id => {
        return fetch(`${apiURL}/posts?user_id=${id}`)
            .then(res => res.json())
    }

    const getUserSubbedPosts = (id) => {
        return fetch(`${apiURL}/subs?follower_id=${id}`)
            .then((res) => res.json());
    };

    const createPost = post => {
        return fetch(`${apiURL}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
    }

    const updatePost = post => {
        return fetch(`${apiURL}/posts/${post.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
    }

    const deletePost = id => {
        return fetch(`${apiURL}/posts/${id}`, {
            method: "DELETE"
        })
    }

    return (
        <PostContext.Provider value={{
            getAllPosts, getPostById, getUserPosts, getUserSubbedPosts, createPost, updatePost, deletePost
        }}>
            {props.children}
        </PostContext.Provider>
    )
}
