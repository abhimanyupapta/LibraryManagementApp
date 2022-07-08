import React from "react";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
import "./profile.css"

const Profile = () => {
  const { user, isLoading } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const profileImg =
    user.avatar.url === "no" ? "./profile.png" : user.avatar.url;

  const onClickHandler = (e) => {
      e.preventDefault();
      navigate("/my/issues");
  }  

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="main-profile">
          <div className="left-profile">
            <img src={profileImg}></img>
          </div>
          <div className="right-profile">
            <div className="user-info">
              <p>Name : {user.name}</p>
              <p>Email : {user.email}</p>
              <p>Role : {user.role}</p>
            </div>
            <button onClick={onClickHandler} className="issue-btn">My Issues</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
