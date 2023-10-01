import React from "react";
import { useState, useEffect } from "react";
import "./CampaignCard.css";

function CampaignCard({
  campaignId,
  contract,
  title,
  description,
  img,
  campaignOwner,
  campaignCategory,
  requiredAmount,
}) {
  const [remTime, setRemTime] = useState(null);
  const [profileUsername, setProfileUsername] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [raisedAmount, setRaisedAmount] = useState(null);

  const getRaisedAmount = async () => {
    const tx = await contract.getRaisedAmount(campaignId);
    setRaisedAmount(tx);
  }

  const getProfileUserName = async () => {
    const tx = await contract.getProfileUserName(campaignOwner);
    setProfileUsername(tx);
  };

  const getProfilePic = async () => {
    const tx = await contract.getProfileCID(campaignOwner);
    setProfilePic(tx);
  };

  const getRemTime = async () => {
    const tx = await contract.getRemainingTime(campaignId);
    setRemTime(tx);
  };

  useEffect(() => {
    getRaisedAmount();
    getProfileUserName();
    getProfilePic();
    getRemTime();
  }, []);

  return (
    <div className="CampaignCard">
      <div className="CampaignImage">
        {/* eslint-disable-next-line */}
        <img src={img} />
      </div>
      <div className="text">
        <p className="title">
          {title && title.toString().length > 60
            ? title.slice(0, 45) + " ..."
            : title}
        </p>
        <p className="description">
          {description && description.toString().length > 60
            ? description.slice(0, 45) + " ..."
            : description}
        </p>
      </div>
      <div className="tags">
        <div className="tag">
          <p>{campaignCategory}</p>
        </div>
        <div className="profileCard">
          <div className="left">
            {/* eslint-disable-next-line */}
            <img src={`https://ipfs.io/ipfs/${profilePic}`} />
          </div>
          <div className="right">
            <p className="userName">
              {profileUsername && profileUsername.toString().length > 10
                ? profileUsername.slice(0, 6) + "..."
                : profileUsername}
            </p>
            <p className="address">
              {campaignOwner.slice(0, 4) + "..." + campaignOwner.slice(40, 42)}
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div className="loader">
        <div className="baseLoader">
          <div
            className="primeLoader"
            style={{ width: `${(raisedAmount / requiredAmount) * 100}%` }}
          ></div>
        </div>
        <div className="Loadingdetails">
          <div className="line">
            <p className="baseline">Goal :</p>
            <p className="primeLine">
              {requiredAmount.toString() / 1000000000000000000} MATIC
            </p>
          </div>
          <div className="line">
            <p className="baseline">Progress :</p>
            <p className="primeLine">
              {((raisedAmount / requiredAmount) * 100).toFixed(3)}%
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div className="footer">
        <div className="line2">
          <p className="baseLine">Raised</p>
          <p className="primeLine">
            {raisedAmount / 1000000000000000000} MATIC
          </p>
        </div>
        <div className="line2">
          <p className="baseLine">Time Left</p>
          <p className="primeLine">
            {Math.floor(remTime / 86400).toString()} Days
          </p>
        </div>
      </div>
    </div>
  );
}

export default CampaignCard;
