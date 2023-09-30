import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./pages-styles/HomePage.css";

function HomePage({
  contract,
  setAccount,
  setConnected,
  setAccountName,
  setToggle1,
  toggle1,
  connected,
}) {
  const [isProfileCreated, setIsProfileCreated] = useState(false);
  const navigate = useNavigate();

  const getIsProfileCreated = async () => {
    if (contract) {
      const tx = await contract.getIsProfileCreated();
      setIsProfileCreated(tx);
    }
  };

  useEffect(() => {
    getIsProfileCreated();
  }, [contract]);

  useEffect(() => {
    const tagLineDiv = document.querySelector(".tagLineDiv");
    const tagline = document.querySelector(".tagline");

    if (tagLineDiv.scrollHeight > tagLineDiv.clientHeight) {
      tagline.style.fontSize = "xxx-large";
    }
  }, []);

  const handleCreateCampaign = () => {
    if (!connected) {
      alert("Please connect your wallet.");
    } else if (!isProfileCreated && connected) {
      alert("Please create a profile before creating a campaign.");
    } else {
      navigate("/uploadCampaignForm");
    }
  };

  return (
    <div className="HomePage">
      <Navbar
        contract={contract}
        setAccount={setAccount}
        setConnected={setConnected}
        setAccountName={setAccountName}
        setToggle1={setToggle1}
        toggle1={toggle1}
        connected={connected}
      />
      <div className="tagLineDiv">
        <div className="tagLineDiv2">
          <p className="tagline">
            Empowering Humanity, Igniting Aid, Uniting Resources!
          </p>
          <p className="subTagline">Your little help can fulfill a purpose.</p>
        </div>
      </div>
      <div className="buttons">
        <button className="createCampaign" onClick={handleCreateCampaign}>
          Create a Campaign
        </button>
        <Link to="/campaigns">
          <button className="campaigns">Campaigns</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
