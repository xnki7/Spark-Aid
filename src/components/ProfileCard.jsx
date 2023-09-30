import React from "react";
import "./ProfileCard.css";

function ProfileCard({ accountName, userName, profilePic }) {
  return (
    <div className="ProfileCard">
      <div className="left">
        {/* eslint-disable-next-line */}
        <img src={`https://ipfs.io/ipfs/${profilePic}`} />
      </div>
      <div className="right1">
        <p className="userName">{userName}</p>
        <p className="address">{accountName}</p>
      </div>
    </div>
  );
}

export default ProfileCard;
