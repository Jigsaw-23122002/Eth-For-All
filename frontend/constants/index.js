export const REGISTER_CONTRACT_ADDRESS = "0xc6E4BdC6C1860384D385A62540f27401EAE8E3D7";
export const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "org_address",
				"type": "address"
			}
		],
		"name": "RemoveCharityIfFinancialReportFraud",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "org_address",
				"type": "address"
			}
		],
		"name": "RemoveCharityIfFraud",
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
		"inputs": [],
		"name": "changeIsStakedPaid",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "org_address",
				"type": "address"
			}
		],
		"name": "checkFinancialReportStatus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "org_address",
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
				"name": "org_address",
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
				"name": "org_address",
				"type": "address"
			}
		],
		"name": "checkVerificationStatus",
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
				"name": "org_address",
				"type": "address"
			}
		],
		"name": "checkViolationStatus",
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
		"name": "cutStakeOfNotVoted",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "org_address",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "category",
				"type": "bool"
			}
		],
		"name": "distributeStake",
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
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "emptyListOrganization",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "org_address",
				"type": "address"
			}
		],
		"name": "emptyNotVotedArray",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isStaked",
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
		"inputs": [],
		"name": "isVerified",
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
				"name": "org_address",
				"type": "address"
			}
		],
		"name": "markAsVerified",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "org_address",
				"type": "address"
			}
		],
		"name": "notVoted",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "org_address",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "cid",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "registration_time",
				"type": "uint256"
			}
		],
		"name": "registerFinancialReport",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "organization_address",
				"type": "address"
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
				"name": "registration_time",
				"type": "uint256"
			}
		],
		"name": "registerViolation",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "org_address",
				"type": "address"
			}
		],
		"name": "reportUpVote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "org_address",
				"type": "address"
			}
		],
		"name": "reportsDownVote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalOrganizations",
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
						"internalType": "uint256",
						"name": "views",
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
				"internalType": "struct Charity.OrgDetails[]",
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
		"name": "upVote",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "org_address",
				"type": "address"
			}
		],
		"name": "upvotedOnFinancialReport",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "org_address",
				"type": "address"
			}
		],
		"name": "upvotedOnVerify",
		"outputs": [],
		"stateMutability": "nonpayable",
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
						"internalType": "uint256",
						"name": "views",
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
				"internalType": "struct Charity.OrgDetails[]",
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
				"name": "org_address",
				"type": "address"
			}
		],
		"name": "violationDownVote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "org_address",
				"type": "address"
			}
		],
		"name": "violationUpVote",
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
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
];