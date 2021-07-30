import React from "react"
import { Route } from "react-router-dom"
import { CategoryList } from "./category/CategoryList"
import { CategoryProvider } from "./category/CategoryProvider"
import { CommentProvider } from "./comment/CommentProvider"
import { MyPosts } from "./post/MyPosts"
import { PostDetail } from "./post/PostDetail"
import { PostForm } from "./post/PostForm"
import { PostProvider } from "./post/PostProvider"
import { PostReactionProvider } from "./postReaction/PostReactionProvdier"
import { UserProvider } from "./user/UserProvider"
import { CommentList } from "./comment/CommentList"

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
                    <CommentProvider>
                        <Route exact path="/posts/my_posts">
                            <MyPosts/>
                        </Route>
                        <Route exact path="/posts/detail/:postId(\d+)">
                            <PostDetail/>
                        </Route>
                        <Route exact path="/posts/create">
                            <PostForm/>
                        </Route>
                        <Route exact path="/posts/edit/:postId(\d+)">
                            <PostForm/>
                        </Route>
                        <Route exact path="/categories">
                            <CategoryList />
                        </Route>
                        <Route exact path="/comments/:postId(\d+)">
                            <CommentList />
                        </Route>
                    </CommentProvider>
                </PostReactionProvider>
            </CategoryProvider>
        </PostProvider>
      </UserProvider>
    </>
}
