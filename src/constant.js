const contractAddress = "0xE861c4166A8eb7dd271Cf551609Bb5F67720CDf3";

const contractAbi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_requiredAmount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_campaignURI",
        type: "string",
      },
      {
        internalType: "string",
        name: "_category",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_timeCampaignEnds",
        type: "uint256",
      },
    ],
    name: "createCampaign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_userName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_imgURI",
        type: "string",
      },
    ],
    name: "createProfile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_campaignId",
        type: "uint256",
      },
    ],
    name: "donateInCampaign",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getCampaign",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "campaignId",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "campaignOwner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "requiredAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "raisedAmount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "campaignURI",
            type: "string",
          },
          {
            internalType: "string",
            name: "category",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "timeCampaignCreated",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "timeCampaignEnds",
            type: "uint256",
          },
        ],
        internalType: "struct SparkAid.campaign",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getCampaignURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getDonators",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "donatorAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "donatorName",
            type: "string",
          },
          {
            internalType: "string",
            name: "donatorCID",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "donatorAmount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "donated",
            type: "bool",
          },
        ],
        internalType: "struct SparkAid.donator[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getIsProfileCreated",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getListedCampaigns",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "campaignId",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "campaignOwner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "requiredAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "raisedAmount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "campaignURI",
            type: "string",
          },
          {
            internalType: "string",
            name: "category",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "timeCampaignCreated",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "timeCampaignEnds",
            type: "uint256",
          },
        ],
        internalType: "struct SparkAid.campaign[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMyCampaigns",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "campaignId",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "campaignOwner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "requiredAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "raisedAmount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "campaignURI",
            type: "string",
          },
          {
            internalType: "string",
            name: "category",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "timeCampaignCreated",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "timeCampaignEnds",
            type: "uint256",
          },
        ],
        internalType: "struct SparkAid.campaign[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_add",
        type: "address",
      },
    ],
    name: "getProfileCID",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_add",
        type: "address",
      },
    ],
    name: "getProfileUserName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getRaisedAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_campaignId",
        type: "uint256",
      },
    ],
    name: "getRemainingAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_campaignId",
        type: "uint256",
      },
    ],
    name: "getRemainingTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "listedCampaigns",
    outputs: [
      {
        internalType: "uint256",
        name: "campaignId",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "campaignOwner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "requiredAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "raisedAmount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "campaignURI",
        type: "string",
      },
      {
        internalType: "string",
        name: "category",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "timeCampaignCreated",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "timeCampaignEnds",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export { contractAddress, contractAbi };
