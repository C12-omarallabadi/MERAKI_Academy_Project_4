import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../App";
import { useContext } from "react";
import "./comment.css";

const Comments = ({ postId, isCommentsShown, setCommentsState }) => {
  const [comments, setComments] = useState([]);

  const user = useContext(UserContext);
  const headers = { Authorization: `Bearer ${user.token}` };

  useEffect(() => {
    axios
      .get(` http://localhost:5000/comments/${postId}`, { headers })
      .then((result) => {
        setComments(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const postComments =
    comments.length == 0
      ? false
      : comments.map((elem, index) => {
          return <p key={index}>{elem.comment}</p>;
        });

  return (
    <div className="commentsContainer">
      <div className="commentsBar">
        <button
          onClick={() => {
            setCommentsState(!isCommentsShown);
          }}
          className="barButton"
        >
          back
        </button>
        <h3>comments</h3>
      </div>
      <div className="commentsWindow">{postComments}</div>
      <div className="inputContainer">
        <input className="commentArea" placeholder="add comment" />
        <button className="addCommentButton">add comment</button>
      </div>
    </div>
  );
};
export default Comments;
