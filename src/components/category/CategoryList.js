import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CategoryContext } from './CategoryProvider';
import "./Category.css";

export const CategoryList = () => {
    const { getAllCategories, addCategory, categories } = useContext(CategoryContext)
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

    return (
        <>
            <div className="categories--flex--outer">
                <div className="categories__list">
                    <h3>Categories</h3>
                    {
                        categories.map(catObj => {
                            return <div className="categories__list--individual">{catObj.label}</div>
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