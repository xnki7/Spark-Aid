import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import UploadCampaignForm from "./pages/UploadCampaignForm";
import { contractAddress, contractAbi } from "./constant";
import CampaignDetail from "./pages/CampaignDetail";
import MyCampaigns from "./pages/MyCampaigns";
import { ethers } from "ethers";
import CreateProfileModal from "./components/CreateProfileModal";
import HomePage from "./pages/HomePage";
import Campaigns from "./pages/Campaigns";

function App() {
  const [account, setAccount] = useState(null);
  const [accountName, setAccountName] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [connected, setConnected] = useState(false);
  const [toggle1, setToggle1] = useState(false);

  useEffect(() => {
    loadBcData();
  }, []);

  async function loadBcData() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      const signer = provider.getSigner();
      setSigner(signer);
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      console.log(contractInstance);
      setContract(contractInstance);
      const address = await signer.getAddress();
      console.log("Metamask Connected to " + address);
      setAccount(address);
    }
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              contract={contract}
              setAccount={setAccount}
              setConnected={setConnected}
              setAccountName={setAccountName}
              setToggle1={setToggle1}
              toggle1={toggle1}
              connected={connected}
            />
          }
        />
        <Route
          path="/campaigns"
          element={
            <Campaigns
              setAccount={setAccount}
              setConnected={setConnected}
              setAccountName={setAccountName}
              setToggle1={setToggle1}
              toggle1={toggle1}
              contract={contract}
              connected={connected}
            />
          }
        />
        <Route
          path="/MyCampaigns"
          element={
            <MyCampaigns
              setAccount={setAccount}
              setConnected={setConnected}
              setAccountName={setAccountName}
              setToggle1={setToggle1}
              toggle1={toggle1}
              contract={contract}
              connected={connected}
            />
          }
        />
        <Route
          path="/uploadCampaignForm"
          element={
            <UploadCampaignForm
              contract={contract}
              connected={connected}
              account={account}
              accountName={accountName}
            />
          }
        />

        <Route
          path="/campaigns/:id"
          element={
            <CampaignDetail
              contract={contract}
              setAccount={setAccount}
              setConnected={setConnected}
              setAccountName={setAccountName}
              setToggle1={setToggle1}
              toggle1={toggle1}
              connected={connected}
            />
          }
        />
      </Routes>
      {toggle1 && (
        <>
          <CreateProfileModal
            contract={contract}
            setAccount={setAccount}
            setConnected={setConnected}
            setAccountName={setAccountName}
            connected={connected}
            setToggle1={setToggle1}
          />
          <div className="overlay" onClick={() => setToggle1(!toggle1)}></div>
        </>
      )}
    </div>
  );
}

export default App;
