import React, { useContext, useEffect, useState } from 'react';
import { ReactionContext } from "./ReactionProvider";
import { BsPlusCircleFill } from "react-icons/bs";
import "./reaction.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

export const ReactionBox = () => {
    const { reactions, getAllReactions, createReaction } = useContext(ReactionContext)
    const [modalShow, setModalShow] = useState(false)
    const [localReaction, setLocalReaction] = useState({})

    useEffect(() => {
        getAllReactions()
    }, [])

    const handleInputChange = (event) => {
        const newReaction = {...localReaction}
        newReaction[event.target.title] = event.target.value
        setLocalReaction(newReaction)
    }
    
    const labelInput = (props) => {
        return (
            <InputGroup className="mb-3">
            <InputGroup.Text>Label</InputGroup.Text>
            <FormControl
                aria-label="Username"
                aria-describedby="basic-addon1"
                title="label"
                defaultValue={localReaction.label}
                onChange={handleInputChange}
                required
            />
            </InputGroup>
        )
    }

    const urlInput = (props) => {
        return (
            <InputGroup className="mb-3">
            <InputGroup.Text>Image URL</InputGroup.Text>
            <FormControl
                aria-label="Username"
                aria-describedby="basic-addon1"
                title="image_url"
                defaultValue={localReaction.image_url}
                onChange={handleInputChange}
                required
            />
            </InputGroup>
        )
    }

    const ReactionModal = (props) => {
        return (
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Create new reaction
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {labelInput()}
                {urlInput()}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={(event) => {
                  event.preventDefault()
                  createReaction(localReaction)
                    }}>Save</Button>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        )
    }

    return (
        <>
            <h1>Reaction Manager</h1>
            <div className="reaction_container">
                {
                    reactions.map(reactObj => (
                        <>
                        <div className="reaction_outline">
                            <img className="reaction_image" src={reactObj.image_url} alt={reactObj.label} width="15" height="15"/>
                        </div>
                        </>
                    ))
                }
                <button className="reaction_create_new" onClick={() => {setModalShow(true)}}>
                    <BsPlusCircleFill />
                </button>
                <ReactionModal 
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>
        </>
    )
}