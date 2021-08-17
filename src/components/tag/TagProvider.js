import React, { createContext, useState } from "react";

export const TagContext = createContext()

export const TagProvider = (props) => {
    const [tags, setTags] = useState([])
    const apiURL = "http://localhost:8088"
    
    const getAllTags = () => {
        return fetch(`${apiURL}/tags`)
        .then((res) => res.json())
        .then(setTags)
    }

    return (
        <TagContext.Provider
            value={{
                tags, getAllTags
            }}
        >
            {props.children}
        </TagContext.Provider>
    );
};