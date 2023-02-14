const ALCHEMY_RPC_URL =
  "https://eth-goerli.g.alchemy.com/v2/FvGvtDqjaAB4ovhP-eDlIxI1tufnJWyX";
const CONTRACT_ADDRESS = "0x98030A92DF4B6B8298c4AE783D75163891F7b0f8";
const CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "org_address",
        type: "address",
      },
    ],
    name: "RemoveCharityIfFinancialReportFraud",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "RemoveCharityIfFraud",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "changeStakePaid",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "org_address",
        type: "address",
      },
    ],
    name: "checkIfDownvoted",
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
    inputs: [
      {
        internalType: "address",
        name: "org_address",
        type: "address",
      },
    ],
    name: "checkIfUpvoted",
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
    inputs: [
      {
        internalType: "address",
        name: "org_address",
        type: "address",
      },
      {
        internalType: "bool",
        name: "category",
        type: "bool",
      },
    ],
    name: "checkVerificationStatus",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
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
    inputs: [
      {
        internalType: "address",
        name: "org_addr",
        type: "address",
      },
    ],
    name: "countOfDownvotes",
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
        internalType: "address",
        name: "org_addr",
        type: "address",
      },
    ],
    name: "countOfUpvotes",
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
        internalType: "address",
        name: "org_addr",
        type: "address",
      },
    ],
    name: "countOfViews",
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
    inputs: [],
    name: "cronJobsForVotes",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "cutStakeOfNotVoted",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "org_address",
        type: "address",
      },
      {
        internalType: "bool",
        name: "category",
        type: "bool",
      },
    ],
    name: "distributeStake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "org_address",
        type: "address",
      },
      {
        internalType: "address",
        name: "voter_address",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "current_time",
        type: "uint256",
      },
    ],
    name: "downVote",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "emptyFinancialReportAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "emptyFinishedViolationVotes",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "emptyFinishedVotes",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "emptyListFinancialReports",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "emptyListOrganization",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "emptyNotSubmitFRAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "org_address",
        type: "address",
      },
    ],
    name: "emptyNotVotedArray",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "finishedViolationVoting",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getFinancialReports",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "org_address",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "upvotes",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "downvotes",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "upvoters",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "downvoters",
            type: "address[]",
          },
          {
            internalType: "uint256",
            name: "reportUploadStartTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "reportUploadEndTime",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isReportTrue",
            type: "bool",
          },
          {
            internalType: "string",
            name: "report_cid",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isOpen",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isSubmitted",
            type: "bool",
          },
        ],
        internalType: "struct Charity.FinancialReport[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getSubmittedFROrgs",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUnsubmittedFROrgs",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "isStaked",
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
    name: "isVerified",
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
    inputs: [
      {
        internalType: "address",
        name: "org_address",
        type: "address",
      },
    ],
    name: "markAsVerified",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "org_address",
        type: "address",
      },
    ],
    name: "notVoted",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "org_address",
        type: "address",
      },
      {
        internalType: "string",
        name: "cid",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "registration_time",
        type: "uint256",
      },
    ],
    name: "registerFinancialReport",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "organization_address",
        type: "address",
      },
      {
        internalType: "string",
        name: "organization_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "document_cid",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
    ],
    name: "registerOrg",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "organization_address",
        type: "address",
      },
      {
        internalType: "string",
        name: "document_cid",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "registration_time",
        type: "uint256",
      },
    ],
    name: "registerViolation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "org_address",
        type: "address",
      },
    ],
    name: "reportUpVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "org_address",
        type: "address",
      },
    ],
    name: "reportsDownVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "org_address",
        type: "address",
      },
    ],
    name: "setFinancialReportStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "org_address",
        type: "address",
      },
    ],
    name: "setVerificationStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "setViolationStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalOrganizations",
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
    inputs: [],
    name: "unverifiedOrganizationsList",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "org_address",
            type: "address",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "doc_cid",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "upvotes",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "downvotes",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "verification_status",
            type: "bool",
          },
          {
            internalType: "address[]",
            name: "upvoters",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "downvoters",
            type: "address[]",
          },
          {
            internalType: "uint256",
            name: "stake",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "desc",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "points",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "application_time",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isStakePaid",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "decision",
            type: "bool",
          },
        ],
        internalType: "struct Charity.Organization[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "org_address",
        type: "address",
      },
      {
        internalType: "address",
        name: "voter_address",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "current_time",
        type: "uint256",
      },
    ],
    name: "upVote",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "org_address",
        type: "address",
      },
    ],
    name: "upvotedOnFinancialReport",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "upvotedOnVerify",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "verifiedOrganizationsList",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "org_address",
            type: "address",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "doc_cid",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "upvotes",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "downvotes",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "verification_status",
            type: "bool",
          },
          {
            internalType: "address[]",
            name: "upvoters",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "downvoters",
            type: "address[]",
          },
          {
            internalType: "uint256",
            name: "stake",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "desc",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "points",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "application_time",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isStakePaid",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "decision",
            type: "bool",
          },
        ],
        internalType: "struct Charity.Organization[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "violationDownVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "violationUpVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "org_address",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "current_time",
        type: "uint256",
      },
    ],
    name: "votingDone",
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
];

module.exports = { ALCHEMY_RPC_URL, CONTRACT_ADDRESS, CONTRACT_ABI };
