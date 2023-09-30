import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import CampaignDetail from "./CampaignDetail";
import "./pages-styles/Campaigns.css";
import axios from "axios";
import CampaignCard from "../components/CampaignCard";

function MyCampaigns({
  setAccount,
  setConnected,
  setAccountName,
  setToggle1,
  toggle1,
  contract,
  connected,
}) {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (contract) {
      getAllCampaigns();
    }
  }, [contract, connected]);

  const getAllCampaigns = async () => {
    setIsLoading(true);
    const tx = await contract.getMyCampaigns();
    setCampaigns(tx);
    setIsLoading(false);
  };

  const fetchCampaignMetadata = async (campaignURI) => {
    try {
      const response = await axios.get(`https://ipfs.io/ipfs/${campaignURI}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching Campaign metadata:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      setIsLoading(true);
      const updatedCampaigns = await Promise.all(
        campaigns.map(async (campaign) => {
          const uri = await contract.getCampaignURI(campaign.campaignId);
          const metadata = await fetchCampaignMetadata(uri);
          console.log(
            "Metadata for campaignId",
            campaign.campaignId,
            ":",
            metadata
          );
          return { ...campaign, metadata };
        })
      );
      console.log("Updated Campaigns:", updatedCampaigns);
      setCampaigns(updatedCampaigns);
      setIsLoading(false);
    };

    const fetchCampaigns = async () => {
      if (campaigns.length > 0 && !campaigns[0].metadata) {
        await fetchCampaignDetails();
      }
    };

    fetchCampaigns();
  }, [campaigns]);

  return (
    <>
      <div className="Campaigns">
        <Navbar
          contract={contract}
          setAccount={setAccount}
          setConnected={setConnected}
          setAccountName={setAccountName}
          setToggle1={setToggle1}
          toggle1={toggle1}
          connected={connected}
        />
        <div className="cards">
          {connected && campaigns.length > 0 ? (
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
                campaigns
                  .slice(0)
                  .reverse()
                  .map((campaign) => (
                    <React.Fragment key={campaign.campaignId}>
                      {connected &&
                      campaign.metadata &&
                      (campaign.timeCampaignEnds -
                        campaign.timeCampaignCreated) /
                        86400 >
                        0 &&
                      campaign.requiredAmount - campaign.raisedAmount > 0 ? (
                        <Link
                          to={`/campaigns/${campaign.campaignId}`}
                          style={{ textDecoration: "none", color: "#000000" }}
                        >
                          <CampaignCard
                            campaignId={campaign.campaignId}
                            contract={contract}
                            title={campaign.metadata.campaignTitle}
                            description={campaign.metadata.campaignDescription}
                            img={`https://ipfs.io/ipfs/${campaign.metadata.imageCID}`}
                            campaignOwner={campaign.campaignOwner}
                            campaignCategory={campaign.category}
                            requiredAmount={campaign.requiredAmount}
                            raisedAmount={campaign.raisedAmount}
                          />
                        </Link>
                      ) : null}
                    </React.Fragment>
                  ))
              )}
            </>
          ) : connected ? (
            <>
              <div className="msg">
                <p className="connectWalletMsg">
                  There are no campaigns listed by you.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="msg">
                <p className="connectWalletMsg">
                  Connect your wallet to see campaigns listed by you.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default MyCampaigns;
