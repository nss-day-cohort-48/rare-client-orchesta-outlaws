import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CommentContext } from './CommentProvider';
import { BsFillGearFill, BsFillTrashFill } from 'react-icons/bs';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import "./Comment.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export const CommentList = () => {
    const { getPostComments, comments, updateComment, deleteComment } = useContext(CategoryContext)
    const [newCategoryName, setNewCategoryName] = useState({})
    const [editModalShow, setEditModalShow] = useState(false)
    const [deleteModalShow, setDeleteModalShow] = useState(false)
    const history = useHistory()

    





}