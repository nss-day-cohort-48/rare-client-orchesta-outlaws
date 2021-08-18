import React from "react";
import { Route } from "react-router-dom";
import { CategoryList } from "./category/CategoryList";
import { CategoryProvider } from "./category/CategoryProvider";
import { AllPosts } from "./post/AllPosts";
import { MyPosts } from "./post/MyPosts";
import { PostDetail } from "./post/PostDetail";
import { PostForm } from "./post/PostForm";
import { PostProvider } from "./post/PostProvider";
import { SubbedPosts } from "./post/SubbedPosts";
import { PostReactionProvider } from "./postReaction/PostReactionProvdier";
import { PostTagProvider } from "./postTag/PostTagProvider";
import { TagProvider } from "./tag/TagProvider";
import { ReactionBox } from "./reaction/ReactionBox";
import { ReactionProvider } from "./reaction/ReactionProvider";
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
              <ReactionProvider>
                <TagProvider>
                  <PostTagProvider>
                    <Route exact path="/">
                      <SubbedPosts />
                    </Route>
                    <Route exact path="/posts">
                      <AllPosts />
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
                    <Route exact path="/reactions">
                      <ReactionBox />
                    </Route>
                  </PostTagProvider>
                </TagProvider>
              </ReactionProvider>
            </PostReactionProvider>
          </CategoryProvider>
        </PostProvider>
      </UserProvider>
    </>
  );
};
