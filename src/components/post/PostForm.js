import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "../post/PostProvider"
import { CategoryContext } from "../category/CategoryProvider";
// import { TagContext } from "../tag/TagProvider";
// import { PostTagContext } from ".postTag/PostTagProvider";
import "./Post.css"
import { useHistory, useParams } from 'react-router-dom';
import { FaTags } from "react-icons/fa";

export const PostForm = () => {
    const { addPost, updatePost, getPostById } = useContext(PostContext)
    const [post, setPost] = useState({});
    const { categories, getAllCategories } = useContext(CategoryContext)
    // const { tags, getAllTags } = useContext(TagContext)
    // const { getPostTagsByPostId, createPostTag } = useContext(PostTagContext)
    // const [postTags, setPostTags] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    const { postId } = useParams()

    useEffect(() => {
        if (postId) {
            getPostById(parseInt(postId))
                .then(post => {
                    setPost(post)
                    // getPostTagsByPostId(post.id)
                    //     .then(setPostTags)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])

    const handleControlledPostInputChange = (event) => {
        const newPost = { ...post }
        newPost[event.target.id] = event.target.value
        setPost(newPost)
    }

    /* const handleControlledTagInputChange = (event) => {
        const newPostTag = { ...postTag }
        newPostTag[event.target.id] = event.target.value
        setPostTag(newPostTag)
    } */

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
            updatePostTag
                .then(() => history.push(`/posts/my_posts`))
        } else {
            addPost({
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
            {/* will uncomment when tags are available client-side */}
            {/* <fieldset>
                <div className="form-group">
                    {tags.map(t => {
                        return (
                            <>
                                <input type="checkbox" id={`tag_${t.id}`} required autoFocus className="form-control" value={t.id} onChange={handleControlledTagInputChange} />
                                <label htmlFor={`tag_${t.id}`}>{t.label}</label>
                            </>
                        )
                    })
                    }
                </div>
            </fieldset> */}
            <button className="btn btn-primary"
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                    handleSavePost()
                }}>
                {postId ? <>Save</> : <>Publish</>}
            </button>
        </form>
    )
}