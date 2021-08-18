import React, { useContext, useEffect, useState } from 'react';
import { PostContext } from '../post/PostProvider';
import { ReactionContext } from "./ReactionProvider";
import "./reaction_interface.css";

const post = [{
    "id": 1,
    "rare_user": {
        "id": 1,
        "user": {
            "first_name": "Steve",
            "last_name": "Brownlee",
            "username": "me@me.com"
        }
    },
    "category": {
        "id": 1,
        "label": "News"
    },
    "title": "Cassowary",
    "publication_date": "2021-07-07",
    "image_url": "https://www.guinnessworldrecords.com/Images/cassowary-side_tcm25-568936.jpg",
    "content": "cool bird",
    "approved": true,
    "isMine": true
}]

export const ReactionInterface = (post) => {
    const { reactions, getAllReactions} = useContext(ReactionContext)
    const { getPostById } = useContext(PostContext)
    const [ localPost, setLocalPost ] = useState({})

    useEffect(() => {
        getAllReactions()
    }, [])

    useEffect(() => {
        getPostById(1).then((data) => {
            setLocalPost(data)})
    }, [])
    
    useEffect(() => {
        const post_reactions = localPost.reactions
        let reaction_counter = {}
        debugger
        for (let i = 0; i < reactions.length; i++) {
            for (let n = 0; n < post_reactions.length; n++) {
                if (reactions[i].id === post_reactions[n].id) {
                    if (reaction_counter[reactions[i].id] == NaN) {
                        reaction_counter[reactions[i].id] = 1;
                    } else {
                        reaction_counter[reactions[i].id] = reaction_counter[reactions[i].id] + 1;
                    }
                }
            }
        }
        console.log(reaction_counter)
    }, [localPost])

    return (
        <>
        <h1>Example Reaction Interface (for Individual Post)</h1>
        
        <div className="reaction_interface_outline">
            {
                reactions.map(reactObj => (
                    <>
                    <button className="reaction_button">
                        <img className="reaction_image" src={reactObj.image_url} alt={reactObj.label} width="15" height="15"/>
                    </button>
                    </>
                ))
            }
        </div>
        </>
    )
}