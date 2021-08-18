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
                    // getPostTagsByPostId(post.id)
                        // .then(setPostTags)
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
                    <select name="category_id" id="category_id" className="form-control" value={post.category_id} onChange={handlePostInputChange}>
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