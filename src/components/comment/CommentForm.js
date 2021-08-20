import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { CommentContext } from "./CommentProvider";
import { PostContext } from "../post/PostProvider";

export const CommentForm = () => {
  const { post } = useContext(PostContext);
  console.log(post.id + " is the current post's primary key");
  const { commId } = useParams();
  const history = useHistory();
  const [comments, setComments] = useState([]);
  const { createComment, updateComment, getCommentById, getPostComments } =
    useContext(CommentContext);

  const [comment, setComment] = useState({
    content: "",
    author: localStorage.getItem("rare_user_id"),
    subject: post.title,
    publication_date: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    getPostComments(parseInt(post.id)).then((comments) =>
      setComments(comments)
    );
  }, []);

  const comContent = comments.map((c) => {
    if (parseInt(commId) === c.id) {
      return c.content;
    }
  });
  const contentCom = comContent.find((c) => c !== undefined);
  console.log(contentCom);
  console.log(commId);

  useEffect(() => {
    if (commId) {
      getCommentById(parseInt(commId)).then((com) => {
        setComment({
          content: com.content,
          author: com.author,
          subject: com.post.title,
          publication_date: new Date().toISOString().slice(0, 10),
        });
      });
    }
  }, [commId]);

  console.log(comment);

  const handleUserInput = (event) => {
    const newCommentState = { ...comment };
    newCommentState[event.target.name] = event.target.value;
    setComment(newCommentState);
  };

  const handleSaveComment = (event) => {
    event.preventDefault();

    const thisComment = {
      content: comment.content,
      author: localStorage.getItem("rare_user_id"),
      post: post.id,
      publication_date: comment.publication_date,
    };

    createComment(thisComment).then(() => history.push("/posts"));
  };

  return (
    <form className="commentForm">
      {commId ? (
        <h2 className="commentForm__name">Update Comment:</h2>
      ) : (
        <h2 className="commentForm__name">Add New Comment:</h2>
      )}

      <fieldset>
        <div className="form-group">
          <label htmlFor="content">Comment: </label>
          <textarea
            type="text"
            name="content"
            required
            autoFocus
            className="form-control"
            value={comment.content}
            onChange={handleUserInput}
          />
        </div>
      </fieldset>

      {commId ? (
        <button
          onClick={(evt) => {
            evt.preventDefault();

            const com = {
              id: commId,
              content: comment.content,
              author: comment.author,
              subject: post.title,
              publication_date: comment.publication_date,
            };

            updateComment(com).then(() =>
              history.push(`/posts/detail/${post.id}/comments`)
            );
          }}
          className="btn btn-primary"
        >
          Edit Comment
        </button>
      ) : (
        <button
          type="submit"
          onClick={handleSaveComment}
          className="btn btn-primary"
        >
          Save Comment
        </button>
      )}
    </form>
  );
};
