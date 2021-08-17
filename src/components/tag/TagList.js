import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { TagContext } from './TagProvider';
import { BsFillGearFill, BsFillTrashFill } from 'react-icons/bs';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const TagList = () => {
    const { getAllTags, tags, updateTag, deleteTag, createTag } = useContext(TagContext)
    const [tags, setTags] = useState([])
    const history = useHistory()
    

    
    useEffect(() => {
        getAllTags.then(tags => setComments(tags))
    }, [])


    return (
        <div className="tags__container">
            {comments.map(comm => {
                <>
                    <div>{comm.content}</div>
                </>
            })}
            </div>
    )
};

