import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./user.css";
import * as React from "react";
import { UserContext } from "../../App";
import Comments from "./Comments";

const UserDashboard = () => {
  const [UpdateBoxShown, setUpdateBox] = useState(false);
  const [textOfUpdate, setTextOfUpdate] = useState("");
  const [afterUpdate, setAfterUpdate] = useState("");





  const [isCkeckBoxShown, setIsCheckBox] = useState(false);

  const [postId, setPostId] = useState("");

  const [isCommentsShown, setCommentsState] = useState(false);
  const user = useContext(UserContext);
  const headers = { Authorization: `Bearer ${user.token}` };

  const Navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [reversedPosts, setReversedPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/posts", { headers })
      .then((result) => {
        setPosts((result.data))
      })
      .catch((err) => {
        Navigate("/");
      });
  }, [UpdateBoxShown]);
  ////////////////////////////////////
  useEffect(()=>{        setReversedPosts(posts.reverse())
  },[posts])

  ////////////////////////////////////////
  const updatePost=()=>{
    axios
    .put(`http://localhost:5000/posts/${postId}`,{post:afterUpdate},{headers})
    .then((result)=>{
      setUpdateBox(false)
    })
    .catch((err)=>{console.log(err)})
  
  }

  //////////////////////////////////////////
  const allPosts = reversedPosts.map((elem, index) => {
    return (
      <div key={index} className="postContainer">
        <div className="name">
          <h4>
            {elem.author.firstName} {elem.author.lastName}
          </h4>
        </div>
        <div className="post" key={index}>
          <h4> </h4>
          <p>{elem.post}</p>
        </div>
        <div className="postButtons">
          <button
            onClick={() => {
              setCommentsState(!isCommentsShown);
              setPostId(elem._id);
            }}
          >
            comments
          </button>

          {user.userId === elem.author._id ? (
            <button
              onClick={() => {
                setIsCheckBox(true);
                setPostId(elem._id);
              }}
            >
              delete
            </button>
          ) : null}
          {user.userId === elem.author._id ? (
            <button
              onClick={() => {
                setUpdateBox(true)
                setTextOfUpdate(elem.post)
                
                setPostId(elem._id);
              }}
            >
              update
            </button>
          ) : null}
        </div>
      </div>
    );
  });
  return (
    <div>
      <div className="postSection">
        {user.token ? allPosts : Navigate("/")}
        {isCommentsShown ? (
          <div>
            <Comments
              postId={postId}
              isCommentsShown={isCommentsShown}
              setCommentsState={setCommentsState}
            />
          </div>
        ) : null}
      </div>
      {isCkeckBoxShown ? (
        <div className="checkBox">
          <h4>are you realy want to delete this post?</h4>
        <div>  <button
            onClick={() => {
              axios
                .delete(`http://localhost:5000/posts/${postId}`, { headers })
                .then((result) => {
                  const newPosts = reversedPosts.filter((elem) => elem._id != postId);
                  setReversedPosts(newPosts);
                  setIsCheckBox(false);
                })
                .catch((err) => {
                  Navigate("/");
                });
            }}
          >
            yes
          </button>
          <button
            onClick={() => {
              setIsCheckBox(false);
            }}
          >
            no
          </button></div>
        </div>
      ) : null}


{UpdateBoxShown?<div className="updateBox">
<textarea onChange={(e)=>{setAfterUpdate(e.target.value)}} defaultValue={textOfUpdate}></textarea>
<button onClick={updatePost}>update now</button>
<button onClick={()=>{setUpdateBox(false)}}>back</button>
      </div>:null}


    </div>
  );
};
export default UserDashboard;
