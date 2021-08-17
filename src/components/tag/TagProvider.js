import React, { createContext, useState } from "react"

export const TagContext = createContext()

export const TagProvider = (props) => {
    const [tags, setTags] = useState([])

    const getAllTags = () => {
        return fetch(`http://localhost:8088/tags`)
            .then(res => res.json())
            .then(setTags)
    }

    const createTag = (newTag) => {
        return fetch("http://localhost:8088/tags", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTag)
        })
    }

    const updateTag = tagObj => {
        return fetch(`http://localhost:8088/tags/${tagObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tagObj)
        })
        .then(getTags)
    }

    const deleteTag = (tagId) => {
        return fetch(`http://localhost:8088/tags/${tagId}`, {
            method: "DELETE"
        })
        .then(getTags)
    }

    return (
        <CommentContext.Provider value=
            {{
                tags, getAllTags, createTag,
                updateTag, deleteTag, 
            }}>
            {props.children}
        </CommentContext.Provider>
    )
}