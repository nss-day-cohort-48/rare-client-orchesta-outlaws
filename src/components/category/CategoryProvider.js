import React, { createContext, useState } from "react";

export const CategoryContext = createContext()

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([])

    const getAllCategories = () => {
        return fetch("http://localhost:8000/categories", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(res => res.json())
        .then(setCategories)
    }

    const addCategory = catObj => {
        return fetch("http://localhost:8000/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(catObj)
        })
        .then(() => getAllCategories())
    }

    const updateCategory = catObj => {
        return fetch(`http://localhost:8000/categories/${catObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(catObj)
        })
        .then(getAllCategories)
    }

    const deleteCategory = catId => {
        return fetch(`http://localhost:8000/categories/${catId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(getAllCategories)
    }
 
    return (
        <CategoryContext.Provider value={{categories, getAllCategories, addCategory, updateCategory, deleteCategory}}>
            {props.children}
        </CategoryContext.Provider>
    )
}