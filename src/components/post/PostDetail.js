import React, {useContext, useEffect, useState} from 'react'
import "./Post.css"
import { useParams, useHistory, Link } from 'react-router-dom'

export const PostDetail = () => {
    const { postId } = useParams();
    const history = useHistory();
    

    return (
        <>

            <h2>Post Id {parseInt(postId)}</h2>
            <div>
            <Link to={`/comments/${postId}`}><button>
                View Comments</button>
            </Link>
            </div>
        </>
    )
}