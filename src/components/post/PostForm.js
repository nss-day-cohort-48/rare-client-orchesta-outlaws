import React from 'react'
import { useParams } from 'react-router-dom'

export const PostForm = () => {
    const { postId } = useParams()


    return (
        <>

            {postId ? <h2>Edit Post</h2> : <h2>New Post</h2>}

        </>
    )
}