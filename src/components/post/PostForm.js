import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "../post/PostProvider"
import { CategoryContext } from "../category/CategoryProvider";
import { TagContext } from "../tag/TagProvider";
import "./Post.css"
import { useHistory, useParams } from 'react-router-dom';

export const PostForm = () => {
    const { createPost, updatePost, getPostById } = useContext(PostContext)
    const [post, setPost] = useState({});
    const { categories, getAllCategories } = useContext(CategoryContext)
    const { tags, getAllTags } = useContext(TagContext)
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
                    setPostTags(post.tags)
                    setIsLoading(false)
                })
        } else {
            getAllCategories()
            getAllTags()
            setIsLoading(false)
        }
    }, [])

    const handlePostInputChange = (event) => {
        const newPost = { ...post }
        newPost[event.target.id] = event.target.value
        setPost(newPost)
    }

    const handleTagInputChange = (event) => {
        const newPostTags = [...postTags]
        const foundPostTag = newPostTags.find(pt => pt.id === parseInt(event.target.id))
        if (foundPostTag) {
            const foundPostTagPosition = newPostTags.indexOf(foundPostTag)
            newPostTags.splice(foundPostTagPosition, 1)
        } else {
            newPostTags.push({ id: parseInt(event.target.id), label: event.target.value })
        }
        setPostTags(newPostTags)
    }

    const handleSavePost = () => {
        setIsLoading(true);
        if (postId) {
            updatePost({
                id: parseInt(postId),
                category: post.category.id,
                title: post.title,
                publication_date: post.publication_date,
                image_url: post.image_url,
                content: post.content,
                approved: post.approved,
                tags: postTags
            })
                .then(() => history.push(`/posts/my_posts`))
        } else {
            createPost({
                category: post.category,
                title: post.title,
                publication_date: new Date().toISOString(),
                image_url: post.image_url,
                content: post.content,
                approved: 0,
                tags: postTags
            })
                .then(() => history.push("/posts/my_posts"))
        }
    }

    return (
        <form className="post-form">
            <h2 className="post-form__title">{postId ? <>Edit Post</> : <>New Post</>}</h2>
            <fieldset>
                <div className="form-group">
                    <input type="text" id="title" required autoFocus className="form-control" placeholder="Title" value={post.title} onChange={handlePostInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <input type="text" id="image_url" required autoFocus className="form-control" placeholder="Image URL" value={post.image_url} onChange={handlePostInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <input type="text" id="content" required autoFocus className="form-control" placeholder="Article content" value={post.content} onChange={handlePostInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <select name="category" id="category" className="form-control" value={post.category?.id} onChange={handlePostInputChange}>
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
                    <h4>Tags</h4>
                    {tags.map(t => {
                        const foundTag = postTags.find(pt => pt.id === t.id)
                        if (foundTag) {
                            return (
                                <>
                                    <input type="checkbox" id={t.id} required autoFocus value={t.label} onChange={handleTagInputChange}
                                        checked="checked" />
                                    <label htmlFor={t.id}>{t.label}</label>
                                </>
                            )
                        } else {
                            return (
                                <>
                                    <input type="checkbox" id={t.id} required autoFocus value={t.label} onChange={handleTagInputChange} />
                                    <label htmlFor={t.id}>{t.label}</label>
                                </>
                            )
                        }
                    })}
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