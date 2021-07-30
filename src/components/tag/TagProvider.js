import React, { createContext } from "react";

export const TagContext = createContext()

export const TagProvider = (props) => {
    const apiURL = "http://localhost:8088"
    
    const getAllTags = () => {
        return fetch(`${apiURL}/tags`)
        .then((res) => res.json())
    }

    return (
        <TagContext.Provider
            value={{
                getAllTags
            }}
        >
            {props.children}
        </TagContext.Provider>
    );
};