import React from "react"
import { Route } from "react-router-dom"
import { CategoryList } from "./category/CategoryList"
import { CategoryProvider } from "./category/CategoryProvider"
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
            <CategoryProvider>
                <PostReactionProvider>
                    <Route exact path="/my_posts">
                        <MyPosts/>
                    </Route>
                    <Route exact path="/categories">
                        <CategoryList />
                    </Route>
                </PostReactionProvider>
            </CategoryProvider>
        </PostProvider>
      </UserProvider>
    </>
}
