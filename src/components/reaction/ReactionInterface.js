import React, { useContext, useEffect, useState } from 'react';
import { PostContext } from '../post/PostProvider';
import { ReactionContext } from "./ReactionProvider";
import "./reaction_interface.css";


export const ReactionInterface = (post) => {
    const { reactions, getAllReactions} = useContext(ReactionContext)
    const { getPostById } = useContext(PostContext)
    const [ localPost, setLocalPost ] = useState({})

    useEffect(() => {
        getAllReactions()
    }, [])

    useEffect(() => {
        getPostById(1).then((data) => {
            setLocalPost(data.reaction_counter)})
        }, [])
        

    return (
        <>
        <h1>Example Reaction Interface (for Individual Post)</h1>
        
        <div className="reaction_interface_outline">
            {
                reactions.map(reactObj => (
                    <>
                        <button className="reaction_button">
                            <img className="reaction_image" src={reactObj.image_url} alt={reactObj.label} width="15" height="15"/>
                            <div className="reaction_count">{localPost[reactObj.id]?.count}</div>
                        </button>
                    </>
                ))
            }
        </div>
        </>
    )
}