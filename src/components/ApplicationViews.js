import React from "react"
import { Route } from "react-router-dom"
import { MyPosts } from "./post/MyPosts"
import { PostProvider } from "./post/PostProvider"
import { PostReactionProvider } from "./postReaction/PostReactionProvdier"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
        </main>

        <PostProvider>
            <PostReactionProvider>
                <Route exact path="/myposts">
                    <MyPosts/>
                </Route>
            </PostReactionProvider>
        </PostProvider>
    </>
}
