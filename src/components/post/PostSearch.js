import React, { useContext } from "react"
import { PostContext } from "./PostProvider"
import "./Post.css"

export const PostSearch = () => {
    const { setSearchTerms } = useContext(PostContext)

    return (
        <>
            <div className="postSearch">
                Search posts:
                <input type="text"
                    className="input--wide"
                    onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                            setSearchTerms(event.target.value.toLowerCase())
                        }
                    }
                    } />
            </div>
        </>
    )
}