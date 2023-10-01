import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./pages-styles/UploadCampaignForm.css";
import ProfileCard from "../components/ProfileCard";
import { ethers } from "ethers";

function UploadCampaignForm({ contract, connected, account, accountName }) {
  const [campaignTitle, setCampaignTitle] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const [campaignCategory, setCampaignCategory] = useState(null);
  const [campaignAmount, setCampaignAmount] = useState("");
  const [campaignDeadline, setCampaignDeadline] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProfilePic();
    getUserName();
  }, [contract]);

  const getProfilePic = async () => {
    if (contract) {
      setIsLoading(true);
      const tx = await contract.getProfileCID(account);
      setProfilePic(tx);
      setIsLoading(false);
    }
  };

  const getUserName = async () => {
    if (contract) {
      setIsLoading(true);
      const tx = await contract.getProfileUserName(account);
      setUserName(tx);
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", image);
      setLoading(true);
      const imageUploadResponse = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            pinata_api_key: "df3c9bf125f54ec2b198",
            pinata_secret_api_key:
              "49d9f7f83b4ddd2be742eec456cefcbfc92b2601088f90594142def8f996a42a",
          },
        }
      );

      const campaignData = {
        campaignTitle: campaignTitle,
        campaignDescription: campaignDescription,
        imageCID: imageUploadResponse.data.IpfsHash,
      };

      const campaignUploadResponse = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        campaignData,
        {
          headers: {
            pinata_api_key: "df3c9bf125f54ec2b198",
            pinata_secret_api_key:
              "49d9f7f83b4ddd2be742eec456cefcbfc92b2601088f90594142def8f996a42a",
          },
        }
      );

      const endTimeUnix = Math.floor(
        new Date(campaignDeadline).getTime() / 1000
      );

      const tx = await contract.createCampaign(
        ethers.utils.parseEther(campaignAmount),
        campaignUploadResponse.data.IpfsHash,
        campaignCategory,
        endTimeUnix
      );
      await tx.wait();
      alert("Campaign created ✅");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      {isLoading ? (
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
      ) : (
        <div className="UploadCampaignForm">
          {loading ? (
            <>
              <div className="overlay2"></div>
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
          <div className="left">
            <div className="component">
              <div className="header">
                <Link to="/" style={{ width: "35%", height: "60%" }}>
                  {/* eslint-disable-next-line */}
                  <img
                    className="logo"
                    src={require("../components/SparkAid-1 (12).png")}
                    style={{ width: "100%", height: "100%" }}
                  />
                </Link>
                <ProfileCard
                  accountName={accountName}
                  userName={userName}
                  profilePic={profilePic}
                />
              </div>
              <div className="image">
                {/* eslint-disable-next-line */}
                <img
                  className="rocket"
                  src={require("../components/Component 1.png")}
                />
              </div>
              <div className="text1">
                <p>Start a</p>
                <p>Campaign</p>
              </div>
              <div className="text2">
                <p>
                  "Be the Spark: Create a Campaign, Inspire Change, and Rally
                  Support for Your Cause on SparkAid!"
                </p>
              </div>
            </div>
          </div>
          <div className="right">
            <form onSubmit={handleFormSubmit}>
              <div className="title">
                <h1>List Your Campaign 🚀</h1>
              </div>
              <div className="bar1">
                <div className="card1">
                  <p>Campaign Title *</p>
                  <input
                    type="text"
                    value={campaignTitle}
                    onChange={(e) => {
                      setCampaignTitle(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="card1">
                  <p>Required Fund (in MATIC)*</p>
                  <input
                    type="number"
                    value={campaignAmount}
                    onChange={(e) => {
                      setCampaignAmount(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="card3">
                <p>Tell Your Story *</p>
                <textarea
                  rows="7"
                  value={campaignDescription}
                  onChange={(e) => {
                    setCampaignDescription(e.target.value);
                  }}
                  required
                ></textarea>
              </div>
              <div className="bar2">
                <div className="bar3">
                  <div className="card2">
                    <p>End Date *</p>
                    <input
                      type="date"
                      value={campaignDeadline}
                      onChange={(e) => {
                        setCampaignDeadline(e.target.value);
                        console.log(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="card2">
                    <p>Campaign Category *</p>
                    <select
                      value={campaignCategory}
                      onChange={(e) => setCampaignCategory(e.target.value)}
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="Education">Education</option>
                      <option value="Health">Health</option>
                      <option value="Environment">Environment</option>
                      <option value="Justice">Justice</option>
                      <option value="Relief">Relief</option>
                      <option value="Arts">Arts</option>
                      <option value="Technology">Technology</option>
                      <option value="Community">Community</option>
                      <option value="Animal">Animal</option>
                      <option value="Sports">Sports</option>
                      <option value="Humanitarian">Humanitarian</option>
                      <option value="Development">Development</option>
                      <option value="Poverty">Poverty</option>
                      <option value="Research">Research</option>
                      <option value="Women">Women</option>
                      <option value="Elderly">Elderly</option>
                      <option value="Energy">Energy</option>
                      <option value="Mental">Mental</option>
                      <option value="Food">Food</option>
                      <option value="Refugee">Refugee</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div class="form1">
                  <p>Campaign Image *</p>
                  <label for="file-input" class="drop-container">
                    <span class="drop-title">Drop Image here</span>
                    or
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={handleImageUpload}
                      id="file-input"
                    />
                  </label>
                </div>
              </div>
              <button type="submit">
                {loading ? "Uploading..." : "List Campaign"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default UploadCampaignForm;
