export const REGISTER_CONTRACT_ADDRESS = "0xda7300Bf7018428C2B9a0c321c1B947f89cB2c77";
export const abi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "org_addr",
        "type": "address"
      }
    ],
    "name": "checkVerificationStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "org_addr",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "current_time",
        "type": "uint256"
      }
    ],
    "name": "downVote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "organization_address",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "organization_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "document_cid",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "time",
        "type": "uint256"
      }
    ],
    "name": "registerOrg",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "org_addr",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "current_time",
        "type": "uint256"
      }
    ],
    "name": "upVote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "admin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "org_addr",
        "type": "address"
      }
    ],
    "name": "checkIfDownvoted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "org_addr",
        "type": "address"
      }
    ],
    "name": "checkIfUpvoted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "org_addr",
        "type": "address"
      }
    ],
    "name": "countOfDownvotes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "org_addr",
        "type": "address"
      }
    ],
    "name": "countOfUpvotes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "org_addr",
        "type": "address"
      }
    ],
    "name": "countOfViews",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unverifiedOrganizationsList",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "org_address",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "doc_cid",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "upvotes",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "downvotes",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "verification_status",
            "type": "bool"
          },
          {
            "internalType": "string",
            "name": "desc",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "application_time",
            "type": "uint256"
          }
        ],
        "internalType": "struct Register.OrgDetails[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "verifiedOrganizationsList",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "org_address",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "doc_cid",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "upvotes",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "downvotes",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "verification_status",
            "type": "bool"
          },
          {
            "internalType": "string",
            "name": "desc",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "application_time",
            "type": "uint256"
          }
        ],
        "internalType": "struct Register.OrgDetails[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "org_addr",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "current_time",
        "type": "uint256"
      }
    ],
    "name": "votingDone",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];