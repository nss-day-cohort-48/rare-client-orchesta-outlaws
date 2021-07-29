import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "../user/UserProvider";
import { PostContext } from "./PostProvider"
import { PostReactionContext } from "../postReaction/PostReactionProvdier"
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { BsFillGearFill } from "react-icons/bs";
import './Post.css'

export const MyPosts = () => {
    const { getUserById } = useContext(UserContext)
    const [user, setUser] = useState({})
    const { getUserPosts } = useContext(PostContext)
    const [posts, setPosts] = useState([])
    const { postReactions, getPostReactions } = useContext(PostReactionContext)

    useEffect(() => {
        getUserById(parseInt(localStorage.getItem('rare_user_id')))
            .then(setUser)
    }, [])

    useEffect(() => {
        getUserPosts(parseInt(localStorage.getItem('rare_user_id')))
            .then(setPosts)
    }, [])

    useEffect(() => {
        getPostReactions()
    }, [])

    const dateConvert = (ISOdate) => {
        const date = ISOdate.split("-")
        const year = date.shift()
        date[0] = `${date[0]}/`
        date.push(`/${year}`)
        return date.join("")
    }

    return (
        <>

            <div className="add-post">
                <div className="add-post__icon"><FaPlus className="plus-icon" /></div>
                <div className="add-post__text">Add Post</div>
            </div>

            <div className="posts">
                {posts.map(p => {
                    return (
                        <div key="p.id" className="post">
                            <div className="post__header">
                                <div className="post__title"><h2 className="post__title">{p.title}</h2></div>
                                <div className="post__date">Publication Date: {dateConvert(p.publication_date)}</div>
                            </div>
                            <div className="post__image--container">
                                <img className="post__image" src={p.image_url} />
                            </div>
                            <div className="post__footer">
                                <div className="post__author">Author: {user.first_name} {user.last_name}</div>
                                <div className="post__reaction-count">{
                                    postReactions.length > 0 ?
                                        postReactions.filter(pr => pr.post_id === p.id).length
                                        :
                                        0
                                } Reactions
                                </div>
                                <div className="post__edit-icon"><BsFillGearFill /></div>
                                <div className="post__delete-icon"><FaTrashAlt /></div>
                            </div>
                        </div>
                    )
                })}

            </div>

        </>
    )
}