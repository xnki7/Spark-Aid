import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./pages-styles/CampaignDetail.css";
import Navbar from "../components/Navbar";
import { ethers } from "ethers";
import axios from "axios";

function CampaignDetail({
  contract,
  setAccount,
  setConnected,
  setAccountName,
  setToggle1,
  toggle1,
  connected,
}) {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [currCampaign, setCurrCampaign] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [remTime, setRemTime] = useState(null);
  const [profileUsername, setProfileUsername] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [amount, setAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [donators, setDonators] = useState(null);
  const [isProfileCreated, setIsProfileCreated] = useState(false);

  const fetchCampaignDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      const campaignURI = await contract.getCampaignURI(id);
      const metadata = await fetchCampaignMetadata(campaignURI);
      console.log("Metadata for campaignId", id, ":", metadata);
      setCampaign(metadata);
    } catch (error) {
      console.error("Error fetching Campaign metadata:", error);
    }
    setIsLoading(false);
  }, [contract, id]);

  const getProfileUserName = useCallback(async () => {
    setIsLoading(true);
    const tx = await contract.getProfileUserName(currCampaign?.campaignOwner);
    setProfileUsername(tx);
    setIsLoading(false);
  }, [contract, currCampaign]);

  const getIsProfileCreated = async () => {
    if (contract && connected) {
      setIsLoading(true);
      const tx = await contract.getIsProfileCreated();
      setIsProfileCreated(tx);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getIsProfileCreated();
  }, [connected, contract]);

  const getProfilePic = useCallback(async () => {
    setIsLoading(true);
    const tx = await contract.getProfileCID(currCampaign?.campaignOwner);
    setProfilePic(tx);
    setIsLoading(false);
  }, [contract, currCampaign]);

  const donateInCampaign = useCallback(async () => {
    const raisedAmount = currCampaign?.raisedAmount || 0;
    const requiredAmount = currCampaign?.requiredAmount || 0;
    const remainingAmount = requiredAmount - raisedAmount;
    try {
      if (amount <= remainingAmount) {
        setLoading(true);
        const tx = await contract.donateInCampaign(id, {
          // gasLimit: 900000,
          value: ethers.utils.parseEther(amount),
        });
        await tx.wait();
        window.location.reload();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (!isProfileCreated) {
        alert("Create a profile inorder to fund a camapign.");
      } else {
        alert(
          `The amount should be less than or equal to ${remainingAmount / 1000000000000000000
          } MATIC`
        );
      }
    }
  }, [contract, id, amount, currCampaign]);

  const getRemTime = useCallback(async () => {
    if (contract) {
      setIsLoading(true);
      const tx = await contract.getRemainingTime(id);
      setRemTime(tx);
      setIsLoading(false);
    }
  }, [contract, id]);

  const getDonators = useCallback(async () => {
    if (contract) {
      setIsLoading(true);
      const tx = await contract.getDonators(id);
      setDonators(tx);
      setIsLoading(false);
    }
  }, [contract, id]);

  const getCampaign = useCallback(async () => {
    if (contract) {
      setIsLoading(true);
      const tx = await contract.getCampaign(id);
      setCurrCampaign(tx);
      setIsLoading(false);
    }
  }, [contract, id]);

  const fetchCampaignMetadata = useCallback(async (campaignURI) => {
    try {
      const response = await axios.get(`https://ipfs.io/ipfs/${campaignURI}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching Campaign metadata:", error);
      return null;
    }
  }, []);

  useEffect(() => {
    if (contract) {
      getRemTime();
      getCampaign();
      getDonators();
    }
  }, [contract, id, getRemTime, getCampaign, getDonators]);

  useEffect(() => {
    if (contract && currCampaign) {
      getProfileUserName();
      getProfilePic();
    }
  }, [contract, currCampaign, getProfileUserName, getProfilePic]);

  useEffect(() => {
    fetchCampaignDetails();
  }, [fetchCampaignDetails]);

  return (
    <div className="CampaignDetail">
      {loading ? (
        <>
          <div className="overlay"></div>
          <div className="loader9">
            <p>Processing</p>
            <div className="words">
              <span className="word">Transaction ...</span>
              <span className="word">Transaction ...</span>
              <span className="word">Transaction ...</span>
              <span className="word">Transaction ...</span>
              <span className="word">Transaction ...</span>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {isLoading || currCampaign == null ? (
        <>
          <div className="overlay"></div>
          <div class="container">
            <div class="top">
              <div class="square">
                <div class="square">
                  <div class="square">
                    <div class="square">
                      <div class="square">
                        <div class="square"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bottom">
              <div class="square">
                <div class="square">
                  <div class="square">
                    <div class="square">
                      <div class="square">
                        <div class="square"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="left">
              <div class="square">
                <div class="square">
                  <div class="square">
                    <div class="square">
                      <div class="square">
                        <div class="square"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="square">
                <div class="square">
                  <div class="square">
                    <div class="square">
                      <div class="square">
                        <div class="square"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : campaign ? (
        <>
          <Navbar
            contract={contract}
            setAccount={setAccount}
            setConnected={setConnected}
            setAccountName={setAccountName}
            setToggle1={setToggle1}
            toggle1={toggle1}
            connected={connected}
          />
          <div className="header1">
            <p className="title">{campaign.campaignTitle}</p>
            <div className="header">
              <div className="left">
                {/* eslint-disable-next-line */}
                <img src={`https://ipfs.io/ipfs/${campaign.imageCID}`} />
              </div>
              <div className="right">
                <div className="section">
                  <p className="para">
                    {Math.floor(remTime / 86400).toString()}
                  </p>
                  <div className="subSection">
                    <p className="subPara">Days left</p>
                  </div>
                </div>
                <div className="section">
                  <p className="para">
                    {currCampaign?.raisedAmount
                      ? (
                        currCampaign.raisedAmount / 1000000000000000000
                      ).toString()
                      : "0"}
                  </p>
                  <div className="subSection">
                    <p className="subPara">
                      Raised of{" "}
                      {currCampaign?.requiredAmount
                        ? (
                          currCampaign.requiredAmount / 1000000000000000000
                        ).toString()
                        : "0"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mainContent">
            <div className="left">
              <div className="section">
                <p className="head">Creator</p>
                <div className="profileCard">
                  <div className="left">
                    {/* eslint-disable-next-line */}
                    <img src={`https://ipfs.io/ipfs/${profilePic}`} />
                  </div>
                  <div className="right1">
                    <p className="userName">{profileUsername}</p>
                    <p className="address">
                      {currCampaign.campaignOwner.slice(0, 4) +
                        "..." +
                        currCampaign.campaignOwner.slice(38, 42)}
                    </p>
                  </div>
                </div>
              </div>
              <hr />
              <div className="section">
                <p className="head">Story</p>
                <p className="story">{campaign.campaignDescription}</p>
              </div>
              <hr />
              <div className="section">
                <p className="donators">Donators</p>
                {donators && donators.length > 0 ? (
                  donators.map((donator, index) => (
                    <div className="cards" key={index}>
                      <p className="number">{index + 1}.</p>
                      <div className="profileCard">
                        <div className="left">
                          {/* eslint-disable-next-line */}
                          <img
                            src={`https://ipfs.io/ipfs/${donator.donatorCID}`}
                            alt="Profile"
                          />
                        </div>
                        <div className="right1">
                          <p className="userName">{donator.donatorName}</p>
                          <p className="address">
                            {donator.donatorAddress.slice(0, 4) +
                              "..." +
                              donator.donatorAddress.slice(38, 42)}
                          </p>
                        </div>
                        <div className="right2">
                          <p className="amount">
                            {(
                              donator.donatorAmount / 1000000000000000000
                            ).toString()}{" "}
                            MATIC
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No donators found.</p>
                )}
              </div>
            </div>
            <div className="right">
              <div className="fundBox">
                <p className="fund">Fund</p>
                <div className="box">
                  <p className="subhead">Pledge Fund</p>
                  <div className="subBox">
                    <input
                      type="number"
                      value={amount}
                      placeholder="Enter amount (in MATIC)"
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                    />
                    <button onClick={donateInCampaign}>Fund Campaign</button>{" "}
                  </div>
                  <hr />
                  <div className="loader">
                    <div className="loadBox">
                      <div
                        className="subLoadBox"
                        style={{
                          width: `${(currCampaign.raisedAmount /
                              currCampaign.requiredAmount) *
                            100
                            }%`,
                        }}
                      ></div>
                    </div>
                    <div className="details">
                      <div className="subDetails">
                        <p className="subHead">Goal :</p>
                        <p className="primeLine">
                          {(
                            currCampaign.requiredAmount / 1000000000000000000
                          ).toString()}{" "}
                          MATIC
                        </p>
                      </div>
                      <div className="subDetails">
                        <p className="subHead">Progress :</p>
                        <p className="primeLine">
                          {((currCampaign.raisedAmount /
                            currCampaign.requiredAmount) *
                            100).toFixed(3)}
                          %
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="category">
                  <p className="fund">Category</p>
                  <div className="box">
                    <p className="category">{currCampaign.category}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Unable to fetch campaign details.</p>
      )}
    </div>
  );
}

export default CampaignDetail;
