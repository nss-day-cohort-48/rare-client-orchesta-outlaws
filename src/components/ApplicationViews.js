import React from "react"
import { Route } from "react-router-dom"
import { MyPosts } from "./post/MyPosts"
import { PostProvider } from "./post/PostProvider"
import { PostReactionProvider } from "./postReaction/PostReactionProvdier"
import { UserProvider } from "./user/UserProvider"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
        </main>

        <UserProvider>
            <PostProvider>
                <PostReactionProvider>
                    <Route exact path="/my_posts">
                        <MyPosts />
                    </Route>
                </PostReactionProvider>
            </PostProvider>
        </UserProvider>
    </>
}
