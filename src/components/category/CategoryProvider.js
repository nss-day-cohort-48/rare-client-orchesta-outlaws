import React, { createContext, useState } from "react";

export const CategoryContext = createContext()

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([])

    const getAllCategories = () => {
        return fetch("http://localhost:8000/categories", {
            headers: {
                "Authorization": "Token b0935533e22f91a6437fdbc3f2f54b778f349fd5"
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
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
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
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(catObj)
        })
        .then(getAllCategories)
    }

    const deleteCategory = catId => {
        return fetch(`http://localhost:8000/categories/${catId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
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