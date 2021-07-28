import React, { createContext, useState } from "react";

export const CategoryContext = createContext()

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([])

    const getAllCategories = () => {
        return fetch("http://localhost:8088/categories")
        .then(res => res.json())
        .then(setCategories)
    }

    const addCategory = catObj => {
        return fetch("http://localhost:8088/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(catObj)
        })
        .then(getAllCategories)
    }
 
    return (
        <CategoryContext.Provider value={{categories, getAllCategories, addCategory}}>
            {props.children}
        </CategoryContext.Provider>
    )
}