import React, { createContext, useState } from "react";

export const ReactionContext = createContext()

export const ReactionProvider = (props) => {
    const [reactions, setReactions] = useState([])

    const getAllReactions = () => {
        return fetch("http://localhost:8000/reactions", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(res => res.json())
        .then(setReactions)
    }

    const deleteReaction = reactionId => {
        return fetch(`http://localhost:8000/reactions/${reactionId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(getAllReactions)
    }

    const createReaction = reactObj => {
        return fetch("http://localhost:8000/reactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(reactObj)
        })
        .then(getAllReactions)
    }

    return (
        <ReactionContext.Provider value={{reactions, getAllReactions, deleteReaction, createReaction}}>
            {props.children}
        </ReactionContext.Provider>
    )
}