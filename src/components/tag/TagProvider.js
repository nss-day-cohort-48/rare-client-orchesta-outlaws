import React, { createContext, useState } from "react";
import { apiURL } from "../../utils/api";
import { authFetch } from "../../utils/auth";

export const TagContext = createContext()

export const TagProvider = (props) => {
    const [tags, setTags] = useState([])
    
    const getAllTags = () => {
        return authFetch(`${apiURL}/tags`)
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