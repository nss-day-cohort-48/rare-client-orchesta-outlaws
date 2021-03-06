import React from "react";
import { Route } from "react-router-dom";
import { CategoryList } from "./category/CategoryList";
import { CategoryProvider } from "./category/CategoryProvider";
import { CommentProvider } from "./comment/CommentProvider";
import { AllPosts } from "./post/AllPosts";
import { MyPosts } from "./post/MyPosts";
import { PostDetail } from "./post/PostDetail";
import { PostForm } from "./post/PostForm";
import { PostProvider } from "./post/PostProvider";
import { PostSearch } from "./post/PostSearch";
import { SubbedPosts } from "./post/SubbedPosts";
import { PostReactionProvider } from "./postReaction/PostReactionProvdier";
import { ReactionBox } from "./reaction/ReactionBox";
import { ReactionProvider } from "./reaction/ReactionProvider";
import { TagProvider } from "./tag/TagProvider";
import { UserProvider } from "./user/UserProvider";
import { CommentList } from "./comment/CommentList";
import { CommentForm } from "./comment/CommentForm";
import { UserDetail } from "./user/UserDetail";

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
                <CommentProvider>
                  <TagProvider>
                    <Route exact path="/">
                      <SubbedPosts />
                    </Route>
                    <Route exact path="/posts">
                      <PostSearch />
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
                    <Route exact path="/posts/detail/:postId(\d+)/comments">
                      <CommentList />
                    </Route>
                    <Route exact path="/posts/detail/:commId(\d+)/edit">
                      <CommentForm />
                    </Route>
                    <Route exact path="/posts/detail/:postId(\d+)/newcomment">
                      <CommentForm />
                    </Route>
                    <Route exact path="/users/detail/:userId(\d+)">
                      <UserDetail />
                    </Route>
                  </TagProvider>
                </CommentProvider>
              </ReactionProvider>
            </PostReactionProvider>
          </CategoryProvider>
        </PostProvider>
      </UserProvider>
    </>
  );
};
