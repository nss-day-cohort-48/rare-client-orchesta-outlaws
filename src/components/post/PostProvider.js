import React, { createContext, useState } from "react"

export const PostContext = createContext()

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([])

    const getAllPosts = () => {
        return fetch('http://localhost:8088/posts')
            .then(res => res.json())
            .then(setPosts)
    }

    const getPostById = id => {
        return fetch(`http://localhost:8088/posts/${id}`)
            .then(res => res.json())
    }

    const getUserPosts = id => {
        return fetch(`http://localhost:8088/posts?user_id=${id}`)
            .then(res => res.json())
    }

    const createPost = post => {
        return fetch("http://localhost:8088/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
    }

    const updatePost = post => {
        return fetch(`http://localhost:8088/posts/${post.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
    }

    const deletePost = id => {
        return fetch(`http://localhost:8088/posts/${id}`, {
            method: "DELETE"
        })
    }

    return (
        <PostContext.Provider value={{
            getAllPosts, getPostById, getUserPosts, createPost, updatePost, deletePost
        }}>
            {props.children}
        </PostContext.Provider>
    )
}