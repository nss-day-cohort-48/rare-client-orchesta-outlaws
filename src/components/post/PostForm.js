import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "../post/PostProvider"
import { CategoryContext } from "../category/CategoryProvider";
import { TagContext } from "../tag/TagProvider";
import { PostTagContext } from "../postTag/PostTagProvider";
import "./Post.css"
import { useHistory, useParams } from 'react-router-dom';

export const PostForm = () => {
    const { createPost, updatePost, getPostById } = useContext(PostContext)
    const [post, setPost] = useState({});
    const { categories, getAllCategories } = useContext(CategoryContext)
    const { tags, getAllTags } = useContext(TagContext)
    const { getPostTagsByPostId, createPostTag, deletePostTag } = useContext(PostTagContext)
    const [postTags, setPostTags] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    const { postId } = useParams()

    useEffect(() => {
        if (postId) {
            getAllCategories()
            getAllTags()
            getPostById(parseInt(postId))
                .then(post => {
                    setPost(post)
                    getPostTagsByPostId(post.id)
                        .then(setPostTags)
                    setIsLoading(false)
                })
        } else {
            getAllCategories()
            getAllTags()
            setIsLoading(false)
        }
    }, [])

    const handleControlledPostInputChange = (event) => {
        const newPost = { ...post }
        newPost[event.target.id] = event.target.value
        setPost(newPost)
    }

    const handleControlledTagInputChange = (event) => {
        const newPostTags = [...postTags]
        const foundPostTag = newPostTags.find(pt => pt.tag_id === parseInt(event.target.value))
        if (foundPostTag) {
            if (postId) {
                deletePostTag(foundPostTag.id)
                getPostTagsByPostId(post.id)
                .then(postTags => {setPostTags(postTags)})
            } else {
                const foundPostTagPosition = postTags.indexOf(foundPostTag)
                newPostTags.splice(foundPostTagPosition, 1)
                setPostTags(newPostTags)
            }
        } else {
            if (postId) {
                createPostTag({
                    post_id: post.id,
                    tag_id: parseInt(event.target.value)
                })
                getPostTagsByPostId(post.id)
                .then(postTags => {setPostTags(postTags)})
            } else {
                newPostTags.push({ post_id: null, tag_id: parseInt(event.target.value) })
                setPostTags(newPostTags)
            }
        }
    }


    const handleSavePost = () => {
        setIsLoading(true);
        if (postId) {
            updatePost({
                id: parseInt(postId),
                user_id: parseInt(localStorage.getItem('rare_user_id')),
                category_id: post.category_id,
                title: post.title,
                publication_date: post.publication_date,
                image_url: post.image_url,
                content: post.content,
                approved: post.approved
            })
                .then(() => history.push(`/posts/my_posts`))
        } else {
            createPost({
                id: parseInt(postId),
                user_id: parseInt(localStorage.getItem('rare_user_id')),
                category_id: post.category_id,
                title: post.title,
                publication_date: new Date().toISOString().slice(0, 10),
                image_url: post.image_url,
                content: post.content,
                approved: 0
            })
                .then(post => {
                    Promise.all(postTags.map(pt => {
                        createPostTag({
                            tag_id: pt.tag_id,
                            post_id: post.id
                        })

                    }))
                })
                .then(() => history.push("/posts/my_posts"))
        }
    }

    return (
        <form className="post-form">
            <h2 className="post-form__title">{postId ? <>Edit Post</> : <>New Post</>}</h2>
            <fieldset>
                <div className="form-group">
                    <input type="text" id="title" required autoFocus className="form-control" placeholder="Title" value={post.title} onChange={handleControlledPostInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <input type="text" id="image_url" required autoFocus className="form-control" placeholder="Image URL" value={post.image_url} onChange={handleControlledPostInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <input type="text" id="content" required autoFocus className="form-control" placeholder="Article content" value={post.content} onChange={handleControlledPostInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <select name="category_id" id="category_id" className="form-control" value={post.category_id} onChange={handleControlledPostInputChange}>
                        <option value="0">Category Select</option>
                        {categories.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group tags">
                    {tags.map(t => {
                        if (postTags.length > 0) {
                            const foundPostTag = postTags.find(pt => pt.tag_id === t.id)
                            if (foundPostTag) {
                                return (
                                    <>
                                        <input type="checkbox" id={`tag_${t.id}`} required autoFocus className="checkbox" value={t.id} checked='checked' onChange={handleControlledTagInputChange} />
                                        <label htmlFor={`tag_${t.id}`}>{t.label}</label>
                                    </>
                                )
                            } else {
                                return (
                                    <>
                                        <input type="checkbox" id={`tag_${t.id}`} required autoFocus className="checkbox" value={t.id} onChange={handleControlledTagInputChange} />
                                        <label htmlFor={`tag_${t.id}`}>{t.label}</label>
                                    </>
                                )
                            }
                        } else {
                            return (
                                <>
                                    <input type="checkbox" id={`tag_${t.id}`} required autoFocus className="checkbox" value={t.id} onChange={handleControlledTagInputChange} />
                                    <label htmlFor={`tag_${t.id}`}>{t.label}</label>
                                </>
                            )
                        }
                    })
                    }
                </div>
            </fieldset>
            <button className="btn btn-primary"
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault()
                    handleSavePost()
                }}>
                {postId ? <>Save</> : <>Publish</>}
            </button>
        </form>
    )
}