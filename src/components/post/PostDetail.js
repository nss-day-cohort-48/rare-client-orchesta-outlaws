import React from 'react'
import { useParams } from 'react-router-dom'

export const PostDetail = () => {
    const { postId } = useParams()

    return (
        <>

            <h2>Post Id {parseInt(postId)}</h2>

        </>
    )
}