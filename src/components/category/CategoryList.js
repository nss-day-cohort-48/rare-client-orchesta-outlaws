import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CategoryContext } from './CategoryProvider';
import { BsFillGearFill, BsFillTrashFill } from 'react-icons/bs';
import "./Category.css";

export const CategoryList = () => {
    const { getAllCategories, addCategory, categories, updateCategory, deleteCategory } = useContext(CategoryContext)
    const [newCategoryName, setNewCategoryName] = useState({})
    const history = useHistory()

    useEffect(() => {
        getAllCategories()
    }, [])

    const handleInputChange = (event) => {
        const newCat = {}
        newCat.label = event.target.value
        setNewCategoryName(newCat)
    }

    const handleSaveCategory = () => {
        addCategory({
            "label": newCategoryName.label
        })
        .then(() => history.push("/categories"))
    }

    const removeCategory = (catId) => {
        // TODO: needs to be within a modal box
        deleteCategory(parseInt(catId))
    }

    const editCategory = (catObj) => {
        // TODO: needs to be invoked on click within modal box with input
        updateCategory({
            "id": parseInt(catObj.id),
            "label": newCategoryName.label
        })
        .then(() => history.push("/categories"))
    }

    return (
        <>
            <div className="categories--flex--outer">
                <div className="categories__list">
                    <h3>Categories</h3>
                    {
                        categories.map(catObj => {
                            return (
                                <>
                                <div className="categories--flex--inner">
                                    <BsFillGearFill/>
                                    <button id={catObj.id} onClick={
                                        deleteCategory((catObj.id).toString())
                                        }>
                                        <BsFillTrashFill />
                                    </button>
                                    <div className="categories__list--individual">{catObj.label}</div>
                                </div>
                                </>
                            )
                        })
                    }
                </div>
                <div className="categories__new">
                    <fieldset className="categories__new--fieldset">
                        <h3>Create a new Category</h3>
                            <input type="text" required autoFocus 
                                onChange={handleInputChange}
                                defaultValue="Add text"
                            />
                            <br/>
                            <button className="categories__new--button"
                                onClick={event => {
                                    event.preventDefault()
                                    handleSaveCategory()
                                }}
                            >Create</button>
                    </fieldset>
                </div>
            </div>
        </>
    )
}