import React, { useContext, useEffect, useState } from "react"
import { PostReactionContext } from "../postReaction/PostReactionProvdier"
import { PostContext } from "./PostProvider"

export const MyPosts = () => {
    const [posts, setPosts] = useState([])
    const { getUserPosts } = useContext(PostContext)
    const { postReactions, getPostReactions } = useContext(PostReactionContext)

    useEffect(() => {
        getUserPosts(parseInt(localStorage.getItem('rare_user_id')))
        .then(setPosts)
    }, [])

    useEffect(() => {
        getPostReactions()
    })



    return (
        <>

            <h2>My Posts</h2>

        </>
    )
}