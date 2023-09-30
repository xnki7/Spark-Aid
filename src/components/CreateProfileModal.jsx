import React, { useEffect } from "react";
import { useState, useRef } from "react";
import axios from "axios";
import "@rainbow-me/rainbowkit/styles.css";
import "./CreateProfileModal.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "SparkAid",
  projectId: "fdab9001de49b6433a2dbf43f4623d3e",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function CreateProfileModal({
  contract,
  setAccount,
  setConnected,
  setAccountName,
  connected,
  setToggle1,
}) {
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isProfileCreated, setIsProfileCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getIsProfileCreated = async () => {
    if (connected) {
      setIsLoading(true);
      const tx = await contract.getIsProfileCreated();
      setIsProfileCreated(tx);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getIsProfileCreated();
  }, [contract, connected]);

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
            "Content-Type": "multipart/form-data",
            pinata_api_key: "47cc152df3f25c7fa452",
            pinata_secret_api_key:
              "6e547f2be74a4b960a9c9fbf238a0580debe63047ca360d981898f8effe39d09",
          },
        }
      );

      const tx = await contract.createProfile(
        userName,
        imageUploadResponse.data.IpfsHash
      );
      await tx.wait();
      window.location.reload();
      alert("Profile updated ✅");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setToggle1(false);
  };
  const { isConnected } = useAccount();
  const hiddenFileInput = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imgname = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          (maxSize - img.width) / 2,
          (maxSize - img.height) / 2
        );
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: "image/png",
              lastModified: Date.now(),
            });

            console.log(file);
            setImage(file);
          },
          "image/jpeg",
          0.8
        );
      };
    };
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  return (
    <>
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
        <div className="CreateProfileModal">
          {isProfileCreated && connected ? (
            <h1>Update Profile</h1>
          ) : (
            <h1>Create Profile</h1>
          )}
          <form onSubmit={handleFormSubmit}>
            <div className="mainBox">
              <div className="image-upload-container">
                <div
                  className="box-decoration"
                  onClick={handleClick}
                  style={{ cursor: "pointer" }}
                >
                  <label
                    htmlFor="image-upload-input"
                    className="image-upload-label"
                  >
                    {image ? image.name : "Choose an Image *"}
                  </label>
                  <div>
                    {image ? (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="upload image"
                        className="img-display-after"
                      />
                    ) : (
                      <img
                        src={require("./person.png")}
                        alt="upload image"
                        className="img-display-before"
                      />
                    )}

                    <input
                      id="image-upload-input"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      ref={hiddenFileInput}
                      required
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="card">
                  <p className="head">Username *</p>
                  <input
                    type="text"
                    id="text"
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                    required
                  />
                </div>
                <WagmiConfig config={wagmiConfig}>
                  <RainbowKitProvider chains={chains} modalSize="compact">
                    <ConnectButton.Custom>
                      {({
                        account,
                        chain,
                        openAccountModal,
                        openChainModal,
                        openConnectModal,
                        mounted,
                      }) => {
                        const ready = mounted;
                        const connected = ready && account && chain;
                        return (
                          <div
                            {...(!ready && {
                              "aria-hidden": true,
                              style: {
                                opacity: 0,
                                pointerEvents: "none",
                                userSelect: "none",
                              },
                            })}
                          >
                            {(() => {
                              if (!connected) {
                                setAccount("");
                                setConnected(isConnected);
                                setAccountName(null);

                                return (
                                  <button
                                    onClick={openConnectModal}
                                    className="wallet"
                                    type="button"
                                  >
                                    Connect Wallet *
                                  </button>
                                );
                              }

                              if (chain.unsupported) {
                                return (
                                  <button
                                    onClick={openChainModal}
                                    className="wallet"
                                    type="button"
                                  >
                                    Wrong network
                                  </button>
                                );
                              }
                              setAccount(account.address);
                              setConnected(isConnected);
                              setAccountName(account.displayName);

                              return (
                                <div style={{ display: "flex", gap: 12 }}>
                                  <button
                                    className="wallet"
                                    onClick={() => {
                                      openAccountModal();
                                    }}
                                    type="button"
                                  >
                                    {account.displayName}
                                  </button>
                                </div>
                              );
                            })()}
                          </div>
                        );
                      }}
                    </ConnectButton.Custom>
                  </RainbowKitProvider>
                </WagmiConfig>
              </div>
            </div>
            <button type="submit" className="submit">
              {loading ? "Uploading..." : "Submit"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default CreateProfileModal;
