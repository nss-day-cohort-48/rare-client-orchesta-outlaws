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
            <Link to={`/posts/${postId}/comments`}><button>
                View Comments</button>
            </Link>
            </div>
            <div>
            <button onClick={() => {
               history.push(`/posts/${postId}/newcomment`) 
            }}><button>
                Add Comment</button>
            </button>
            </div>
        </>
    )
}