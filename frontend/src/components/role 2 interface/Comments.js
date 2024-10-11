import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../App";
import { useContext } from "react";
import "./comment.css";

const Comments = ({ postId, isCommentsShown, setCommentsState }) => {
    const [post,setPost]=useState("")
    const [posterName,setPosterName]=useState("")


    const [inputBar,setInputBar]=useState("")
  const [comments, setComments] = useState([]);

  const user = useContext(UserContext);
  const headers = { Authorization: `Bearer ${user.token}` };
///////////////////////////////////////////////////////////////
useEffect(()=>{
    axios
    .get(`http://localhost:5000/posts/${postId}`,{headers})
    .then((result)=>{
        setPosterName(result.data.author.firstName+" "+result.data.author.lastName )

        setPost(result.data)

    })
    .catch((err)=>{console.log(err)})
},[])
///////////////////////////////////////////////////////////////
const addComment=()=>{
    axios
    .post(`http://localhost:5000/comments/${postId}`,{comment:inputBar},{ headers })
    .then((result)=>{
setInputBar("")    })
    .catch((err)=>{
console.log(err)
    })

}
///////////////////////////////////////////////////////////////
  useEffect(() => {
    axios
      .get(` http://localhost:5000/comments/${postId}`, { headers })
      .then((result) => {
        setComments(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [inputBar]);
 
  const postComments =
    comments.length == 0
      ? false
      : comments.map((elem, index) => {
          return <div className="comment" key={index}><h4 >{elem.commenter.firstName} {elem.commenter.lastName}</h4><p>{elem.comment}</p></div>;
        });
  return (
    <div className="commentsContainer">
        <div className="Post"> <h4>{posterName}</h4><p>{post.post}</p></div>
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
      <div className="commentsWindow">{postComments?postComments:<h3>be the first commenter</h3>}</div>
      <div className="inputContainer">
        <input value={inputBar} onChange={(e)=>{setInputBar(e.target.value)}} className="commentArea" placeholder="add comment" />
        <button onClick={addComment} className="addCommentButton">add comment</button>
      </div>
    </div>
  );
};
export default Comments;
