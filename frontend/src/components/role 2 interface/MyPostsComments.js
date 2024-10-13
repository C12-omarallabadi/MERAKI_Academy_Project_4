import React,{useEffect,useContext,useState} from "react"
import "./myPostsComments.css";
import axios from "axios";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
const MyPostsComments=({isMyPostsCommentsShown,setIsMyPostsCommentsShown,myPostId,setMyPostId})=>{
    const[myPostComments,setMyPostComments]=useState([])
    const[myPost,setMyPost]=useState('')
    const[commentInput,setCommentInput]=useState('')
    const [myName,setMyName]=useState("")


    const user=useContext(UserContext)
    const headers = { Authorization: `Bearer ${user.token}` };
    const Navigate=useNavigate()
///////////////////////////////////////////////////////////////////
useEffect(()=>{
    axios
    .get(` http://localhost:5000/comments/${myPostId}`, { headers })
    .then((result) => {
      setMyPostComments(result.data);
    })
    .catch((err) => {
   
    Navigate("/")
    });
},[commentInput])

///////////////////////////////////////////////////////////////////
const postComments =
myPostComments.length == 0
  ? false
  : myPostComments.map((elem, index) => {
      return <div className="comment" key={index}><h4 >{elem.commenter.fullName}</h4><p>{elem.comment}</p></div>;
    });

///////////////////////////////////////////////////////////////////
useEffect(()=>{
    axios
    .get(`http://localhost:5000/posts/${myPostId}`,{headers})
    .then((result)=>{
        setMyName(result.data.author.fullName )

        setMyPost(result.data)

    })
    .catch((err)=>{
     
      Navigate("/")})
},[])





/////////////////////////////////////////////////////////////////////////////////////////////////////
const addComment=()=>{
    axios
    .post(`http://localhost:5000/comments/${myPostId}`,{comment:commentInput},{ headers })
    .then((result)=>{
setCommentInput("")    })
    .catch((err)=>{
     
      Navigate("/")
    })

}
//////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////


    return( <div className="commentsContainer">
        <div className="Post"> <h4>{myName}</h4><p>{myPost.post}</p></div>
      <div className="commentsBar">
        <button
          onClick={() => {
            setIsMyPostsCommentsShown(!isMyPostsCommentsShown);
          }}
          className="barButton"
        >
          back
        </button>
        <h3>comments</h3>
      </div>
      <div className="commentsWindow">{postComments?postComments:<h3>be the first commenter</h3>}</div>
      <div className="inputContainer">
        <input value={commentInput} onChange={(e)=>{setCommentInput(e.target.value)}} className="commentArea" placeholder="add comment" />
        <button onClick={addComment} className="addCommentButton">add comment</button>
      </div>
    </div>)
}
export default MyPostsComments