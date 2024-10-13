import React from "react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import "./myPosts.css";

import { Link } from "react-router-dom";
import MyPostsComments from "./MyPostsComments";

const MyPosts = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [reversedMyPosts, setReversedMyPosts] = useState([]);
  const [isMyPostsCommentsShown, setIsMyPostsCommentsShown] = useState(false);

  const [myPostId, setMyPostId] = useState("");
  const [isBoxShown, setIsBoxShown] = useState("");
  const Navigate = useNavigate();
  const user = useContext(UserContext);
  const headers = { Authorization: `Bearer ${user.token}` };
  //////////////////////////////////////////////////////////////
  useEffect(() => {
    axios
      .get(" http://localhost:5000/posts/myPosts", { headers })
      .then((result) => {
        setMyPosts(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //////////////////////////////////////////////////////////////
  useEffect(() => {
    setReversedMyPosts(myPosts.reverse());
  }, [myPosts]);
  /////////////////////////////////////////////////////////////
  const showMyPosts = reversedMyPosts.map((elem, index) => {
    return (
      <div className="myPostContainer" key={index}>
        <div className="myPost">
          <h4>{elem.author.fullName}</h4>
          <div className="postContent">
            <p>{elem.post}</p>
          </div>
        </div>
        <button
          onClick={() => {
            setIsBoxShown(true);
            setMyPostId(elem._id);
          }}
        >
          delete
        </button>
        <button
          onClick={() => {
            setMyPostId(elem._id)
            setIsMyPostsCommentsShown(true);
          }}
        >
          comment
        </button>
        <button>update</button>
      </div>
    );
  });
  //////////////////////////////////////////////////////////////

  return (
    <div>
      <div className="allPostsContainer">{showMyPosts}</div>

      {isBoxShown ? (
        <div className="mycheckBox">
          <h4>are you realy want to delete this post?</h4>
          <div>
            {" "}
            <button
              onClick={() => {
                axios
                  .delete(`http://localhost:5000/posts/${myPostId}`, {
                    headers,
                  })
                  .then((result) => {
                    const newPosts = reversedMyPosts.filter(
                      (elem) => elem._id != myPostId
                    );
                    setReversedMyPosts(newPosts);
                    setIsBoxShown(false);
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
                setIsBoxShown(false);
              }}
            >
              no
            </button>
          </div>
        </div>
      ) : null}
      {isMyPostsCommentsShown ? (
        <MyPostsComments
          isMyPostsCommentsShown={isMyPostsCommentsShown}
          setIsMyPostsCommentsShown={setIsMyPostsCommentsShown}
          myPostId={myPostId}
          setMyPostId={setMyPostId}
        />
      ) : null}
    </div>
  );
};
export default MyPosts;
