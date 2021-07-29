import React from "react";
import { Route } from "react-router-dom";
import { CategoryList } from "./category/CategoryList";
import { CategoryProvider } from "./category/CategoryProvider";
import { MyPosts } from "./post/MyPosts";
import { PostDetail } from "./post/PostDetail";
import { PostForm } from "./post/PostForm";
import { PostProvider } from "./post/PostProvider";
import { SubbedPosts } from "./post/SubbedPosts";
import { PostReactionProvider } from "./postReaction/PostReactionProvdier";
import { UserProvider } from "./user/UserProvider";

export const ApplicationViews = () => {
  return (
    <>
      <main
        style={{
          margin: "5rem 2rem",
          lineHeight: "1.75rem",
        }}
      ></main>

      <UserProvider>
        <PostProvider>
          <CategoryProvider>
            <PostReactionProvider>
              <Route exact path="/">
                <SubbedPosts />
              </Route>
              <Route exact path="/posts/all">
                {"All of the posts!"}
              </Route>
              <Route exact path="/posts/my_posts">
                <MyPosts />
              </Route>
              <Route exact path="/posts/detail/:postId(\d+)">
                <PostDetail />
              </Route>
              <Route exact path="/posts/create">
                <PostForm />
              </Route>
              <Route exact path="/posts/edit/:postId(\d+)">
                <PostForm />
              </Route>
              <Route exact path="/categories">
                <CategoryList />
              </Route>
            </PostReactionProvider>
          </CategoryProvider>
        </PostProvider>
      </UserProvider>
    </>
  );
};
