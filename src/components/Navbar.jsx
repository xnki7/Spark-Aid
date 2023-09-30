import React from "react";
import "./Navbar.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
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

function Navbar({
  contract,
  setAccount,
  setConnected,
  setAccountName,
  setToggle1,
  toggle1,
  connected,
}) {
  const { isConnected } = useAccount();
  const [isProfileCreated, setIsProfileCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getIsProfileCreated = async () => {
    if (contract && connected) {
      setIsLoading(true);
      const tx = await contract.getIsProfileCreated();
      setIsProfileCreated(tx);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let timeoutId;
    if (contract && connected) {
      getIsProfileCreated();
      timeoutId = setTimeout(() => {
        if (isLoading) {
          window.location.reload();
        }
      }, 5000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [contract, connected, isLoading]);

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
        <div className="Navbar">
          <div className="left">
            <Link to="/">
              {/* eslint-disable-next-line */}
              <img className="logo" src={require("./finallogo.png")} />
            </Link>
          </div>
          <div className="right">
            <Link
              to="/MyCampaigns"
              style={{ color: "#0d1b2a", textDecoration: "none" }}
            >
              <p className="myCampaigns">My Campaigns</p>
            </Link>
            {isProfileCreated && connected ? (
              <p
                className="createProfile"
                onClick={() => {
                  setToggle1(!toggle1);
                }}
              >
                Update Profile
              </p>
            ) : (
              <p
                className="createProfile"
                onClick={() => {
                  setToggle1(!toggle1);
                }}
              >
                Create Profile
              </p>
            )}

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
                              <button onClick={openConnectModal} type="button">
                                Connect Wallet
                              </button>
                            );
                          }

                          if (chain.unsupported) {
                            return (
                              <button onClick={openChainModal} type="button">
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
      )}
    </>
  );
}

export default Navbar;
