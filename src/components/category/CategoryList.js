import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CategoryContext } from './CategoryProvider';
import { BsFillGearFill, BsFillTrashFill } from 'react-icons/bs';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import "./Category.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export const CategoryList = () => {
    const { getAllCategories, addCategory, categories, updateCategory, deleteCategory } = useContext(CategoryContext)
    const [newCategoryName, setNewCategoryName] = useState({})
    const [editModalShow, setEditModalShow] = useState(false)
    const [deleteModalShow, setDeleteModalShow] = useState(false)
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

    const editButton = () => {
        return (
            <>
            <BsFillGearFill onClick={() => setEditModalShow(true)}/>
            <EditModal
            show={editModalShow}
            onHide={() => setEditModalShow(false)}
            /></>
        )
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
              <h4>Centered Modal</h4>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }

    const editCategory = (catObj) => {
        // TODO: needs to be invoked on click within modal box with input
        updateCategory({
            "id": parseInt(catObj.id),
            "label": newCategoryName.label
        })
        .then(() => history.push("/categories"))
    }

    const deleteButton = (catId) => {
        return (
            <>
                <BsFillTrashFill onClick={() => setDeleteModalShow(true)}/>
                <DeleteModal 
                    show={deleteModalShow}
                    onHide={() => setDeleteModalShow(false)}
                    id={catId}
                />
            </>
        )
    }

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
              removeCategory(props.id)}}>Okay</Button>{' '}
            <Button onClick={props.onHide} >Cancel</Button>{' '}
            </Modal.Body>

          </Modal>
        );
      }


    const removeCategory = (catId) => {
        deleteCategory(catId.toString())
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
                                <div className="categories--flex--inner">
                                    {editButton()}
                                    {deleteButton(catObj.id)}
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