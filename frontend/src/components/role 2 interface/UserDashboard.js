import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./user.css";
import * as React from "react";
import { UserContext } from "../../App";

const UserDashboard = () => {
  const user = useContext(UserContext);
  const headers = { Authorization: `Bearer ${user.token}` };

  const Navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/posts", { headers })
      .then((result) => {
        setPosts(result.data);
      })
      .catch((err) => {
        console.log(err.status);
      });
  }, []);
  const allPosts = posts.map((elem, index) => {
    return (
      <div className="post" key={index}>
        <h4>
          {" "}
          {elem.author.firstName} {elem.author.lastName}
        </h4>
        <p>{elem.post}</p>
        <br></br>
        <input placeholder="add comment..."></input>
        <button>add comment</button>
        <br></br>
        {user.userId === elem.author._id ? (
          <button
            onClick={() => {
              const id = elem._id;
              axios
                .delete(`http://localhost:5000/posts/${id}`, { headers })
                .then((result) => {
                  const newPosts = posts.filter((elem) => elem._id != id);
                  setPosts(newPosts);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            delete
          </button>
        ) : null}
      </div>
    );
  });
  return (
    <div className="postSection">{user.token ? allPosts : Navigate("/")} </div>
  );
};
export default UserDashboard;
