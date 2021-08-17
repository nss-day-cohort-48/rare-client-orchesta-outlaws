import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CategoryContext } from './CategoryProvider';
import { BsFillGearFill, BsFillTrashFill } from 'react-icons/bs';
import Modal from 'react-bootstrap/Modal';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import "./Category.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export const CategoryList = () => {
    const { getAllCategories, addCategory, categories, updateCategory, deleteCategory } = useContext(CategoryContext)
    const [newCategoryName, setNewCategoryName] = useState({})
    const [localCat, setLocalCat] = useState({})
    const [editModalShow, setEditModalShow] = useState(false)
    const [deleteModalShow, setDeleteModalShow] = useState(false)
    const history = useHistory()

    useEffect(() => {
        getAllCategories()
    }, [])

    // Code to handle modal pop-up and saving a new category
    const handleInputChange = (event) => {
        const newCat = {}
        newCat["label"] = event.target.value
        setNewCategoryName(newCat)
    }

    const handleSaveCategory = () => {
        addCategory({
            "label": newCategoryName.label
        })
        .then(() => history.push("/categories"))
    }

    // Code to handle editing a category
    const handleEditCategory = (event) => {
        const editedCat = {...localCat}
        editedCat[event.target.name] = event.target.value
        console.log(editedCat)
        setLocalCat(editedCat)
    }

    const EditModal = (props) => {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Modal heading
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <InputGroup className="mb-3">
              <FormControl
                aria-label="Username"
                aria-describedby="basic-addon1"
                name="label" 
                defaultValue={localCat.label} 
                onChange={handleEditCategory} 
                required
              />
            </InputGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => {
                    editCategory(localCat)
                    setEditModalShow(false)
                    }}>Save</Button>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }

    const editCategory = (catObj) => {
        updateCategory({
            "id": parseInt(catObj.id),
            "label": catObj.label
        })
        .then(() => history.push("/categories"))
    }

    // Code to handle modal pop-up and deleting of category objects
    const DeleteModal = (props) => {
      
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
              <p>
                Are you sure you want to delete this category?
              </p>
            <Button onClick={() => {
              removeCategory(localCat.id)}}>Okay</Button>{' '}
            <Button onClick={props.onHide} >Cancel</Button>{' '}
            </Modal.Body>
          </Modal>
        );
      }


    const removeCategory = () => {
        deleteCategory(localCat.id)
        setDeleteModalShow(false)
    }

    return (
        <>
            <div className="categories--flex--outer">
                <div className="categories__list">
                    <h3>Categories</h3>
                    {
                        categories.map(catObj => (
                                <>
                                <div className="categories--flex--inner" value={catObj.id}>
                                
                                    <button className="invisibutton" value={catObj.id} onClick={() => setLocalCat(catObj)}>
                                    <BsFillGearFill onClick={() => setEditModalShow(true)}/>
                                    </button>
                                    <EditModal
                                    show={editModalShow}
                                    onHide={() => setEditModalShow(false)}
                                    />

                                    <button className="invisibutton" onClick={() => setLocalCat(catObj)}>
                                    <BsFillTrashFill onClick={() => {
                                      setDeleteModalShow(true)}}/>
                                    </button>
                                    <DeleteModal 
                                        show={deleteModalShow}
                                        onHide={() => setDeleteModalShow(false)}
                                    />
                                    <div className="categories__list--individual">{catObj.label}</div>
                                </div>
                                </>
                            )
                        )
                    }
                </div>
                <div className="categories__new">
                    <fieldset className="categories__new--fieldset">
                        <h3>Create a new Category</h3>
                            <input type="text" required autoFocus 
                                onChange={handleInputChange}
                                defaultValue={""}
                            />
                            <br/>
                            <button className="categories__new--button"
                                onClick={event => {
                                    event.preventDefault()
                                    handleSaveCategory()
                                    history.push("/categories")
                                }}
                            >Create</button>
                    </fieldset>
                </div>
            </div>
        </>
    )
}