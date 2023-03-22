// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract OrgCreation {
    struct Organization {
        address org_address;
        string name;
        string doc_cid;
        uint256 upvotes;
        uint256 downvotes;
        uint256 views;
        bool verification_status;
        address[] upvoters;
        address[] downvoters;
        mapping(address => uint8) voters;
        uint256 stake;
        string desc;
        uint256 points;
        uint256 application_time;
        bool isStakePaid;
    }
        struct OrgDetails {
        address org_address;
        string name;
        string doc_cid;
        uint256 upvotes;
        uint256 downvotes;
        uint256 views;
        bool verification_status;
        string desc;
        uint256 application_time;
    }


    mapping(address => Organization) orgIdentifier;
    mapping(address => mapping(address => uint256)) voters;
    mapping(address => bool) verifiedOrgMap;
    mapping(address => bool) temp;

    address[] organizationAddress;
    address[] notVotedAddress;
    address[] maxPointAddress;
    address public admin;
    uint256 verified_org_cnt=1;

    uint256 public totalOrganizations;
    uint256 stakeToBeDistributed;
    uint256 registeredViolations;

    Organization[] listOrganizations;

    constructor() {
        admin = msg.sender;
        stakeToBeDistributed = 5 * 10**17;
        registeredViolations = 0;
        registerOrg(msg.sender,"Owner","None","Description",block.timestamp);
        orgIdentifier[msg.sender].verification_status = true;
    }

    // GENERAL FUNCTIONS OF THE CONTRACT

    // Function to check whether the organization is verfied or not.
    function isVerified() public view returns (bool) {
        return orgIdentifier[msg.sender].verification_status;
    }

    // Function to check whether the organization has staked its ethers or not.
    function isStaked() public view returns (bool) {
        return orgIdentifier[msg.sender].isStakePaid;
    }

    // Function to change the status of isStakePaid.
    function changeIsStakedPaid() public {
        orgIdentifier[msg.sender].isStakePaid = true;
    }

    // This function returns the count of upvotes done for verfying the organization.
    function countOfUpvotes(address org_addr) public view returns (uint256) {
        return orgIdentifier[org_addr].upvotes;
    }

    // This function returns the count of downvotes done for verifying the organization.
    function countOfDownvotes(address org_addr) public view returns (uint256) {
        return orgIdentifier[org_addr].downvotes;
    }

    function countOfViews(address org_addr) public view returns (uint256) {
        return
            totalOrganizations -
            countOfUpvotes(org_addr) -
            countOfDownvotes(org_addr);
    }

    // Function to check whether the caller has upvoted or not.
    function checkIfUpvoted(address org_address) public view returns (bool) {
        address voter_addr = msg.sender;
        return orgIdentifier[org_address].voters[voter_addr] == 2;
    }

    // Function to check whether the caller has downvoted or not.
    function checkIfDownvoted(address org_address) public view returns (bool) {
        address voter_addr = msg.sender;
        return orgIdentifier[org_address].voters[voter_addr] == 1;
    }

    //Function to check whether the time of voting for the registered organizations is finish or not.
    function votingDone(
        address org_addr,
        uint256 current_time
    ) public view returns (bool) {
        if (orgIdentifier[org_addr].application_time < current_time) {
            return true;
        } else {
            return false;
        }
    }

    // Function used to return the list of all the verified organization onto the website.
    function verifiedOrganizationsList()
        public
        view
        returns (OrgDetails[] memory)
    {
        uint256 len = organizationAddress.length;
        uint256 cnt = 0;
        OrgDetails[] memory verified_org = new OrgDetails[](verified_org_cnt);
        for (uint256 i = 0; i < len; i++) {
            address org_addr = organizationAddress[i];
            if (orgIdentifier[org_addr].verification_status) {
                Organization storage new_org = orgIdentifier[org_addr];
                OrgDetails memory new_org_det = OrgDetails({
                    org_address: new_org.org_address,
                    name: new_org.name,
                    doc_cid: new_org.doc_cid,
                    upvotes: new_org.upvotes,
                    downvotes: new_org.downvotes,
                    views:new_org.views,
                    verification_status: new_org.verification_status,
                    desc: new_org.desc,
                    application_time: new_org.application_time
                });
                verified_org[cnt] = new_org_det;
                cnt += 1;
            }
        }
        return verified_org;
    }

    // Function to return the list of all the un verifiied orgnization onto the website.

    function unverifiedOrganizationsList()
        public
        view
        returns (OrgDetails[] memory)
    {
        uint256 len = organizationAddress.length;
        uint256 cnt = 0;
        OrgDetails[] memory unverified_org = new OrgDetails[](
            organizationAddress.length - verified_org_cnt
        );
        for (uint256 i = 0; i < len; i++) {
            address org_addr = organizationAddress[i];
            if (!orgIdentifier[org_addr].verification_status) {
                OrgDetails memory new_org = OrgDetails({
                    org_address: orgIdentifier[org_addr].org_address,
                    name: orgIdentifier[org_addr].name,
                    doc_cid: orgIdentifier[org_addr].doc_cid,
                    upvotes: orgIdentifier[org_addr].upvotes,
                    downvotes: orgIdentifier[org_addr].downvotes,
                    views:orgIdentifier[org_addr].views,
                    verification_status: orgIdentifier[org_addr].verification_status,
                    desc: orgIdentifier[org_addr].desc,
                    application_time: orgIdentifier[org_addr].application_time
                });
                unverified_org[cnt] = new_org;
                cnt += 1;
            }
        }
        return unverified_org;
    }


    // Function to empty the listOrganization global array variable.
    function emptyListOrganization() public {
        uint256 timeLoop = listOrganizations.length;
        for (uint256 i = 0; i < timeLoop; i++) {
            listOrganizations.pop();
        }
    }

    modifier isValidOrg (address org_addr)
    {
        require(
            orgIdentifier[org_addr].application_time != 0,
            "Organization address does not exist!"
        );
        require(
            !orgIdentifier[org_addr].verification_status,
            "Organization already verified!"
        );
        require(
            orgIdentifier[msg.sender].application_time != 0 &&
                orgIdentifier[msg.sender].verification_status,
            "Voter organization is not verified, not permitted to vote!"
        );
        require(
            !checkIfUpvoted(org_addr) && !checkIfDownvoted(org_addr),
            "Voter organization cannot vote more than once!"
        );
        _;
    }

    // THIS FUNCTION WILL BE IN THE FRONTEND.

    // FUNCTIONS OF ORGANIZATIONS 

    // Function to register the organization onto the website.
    function registerOrg(
        address organization_address,
        string memory organization_name,
        string memory document_cid,
        string memory description,
        uint256 time
    ) public {
        require(
            orgIdentifier[organization_address].application_time == 0,
            "Organization already registered!"
        );

        orgIdentifier[organization_address].org_address = organization_address;
        orgIdentifier[organization_address].name = organization_name;
        orgIdentifier[organization_address].doc_cid = document_cid;
        orgIdentifier[organization_address].desc = description;
        orgIdentifier[organization_address].application_time = time + 2 days;
        orgIdentifier[organization_address].views = countOfViews(organization_address)+1;
        organizationAddress.push(organization_address);
    }

    // Function to upvote the organization.
    function upVote(
        address org_addr,
        uint256 current_time
    ) public  isValidOrg(org_addr)  returns (bool){
        orgIdentifier[org_addr].upvotes += 1;
        orgIdentifier[org_addr].upvoters.push(msg.sender);
        orgIdentifier[org_addr].voters[msg.sender] = 2;
        if (votingDone(org_addr, current_time)) {
            checkVerificationStatus(org_addr);
            return true;
        }
        return false;
    }

    // Function to downvote the organization.
    function downVote(
        address org_addr,
        uint256 current_time
    ) public   isValidOrg(org_addr) returns (bool) {
        orgIdentifier[org_addr].downvotes += 1;
        orgIdentifier[org_addr].downvoters.push(msg.sender);
        orgIdentifier[org_addr].voters[msg.sender] = 1;
        if (votingDone(org_addr, current_time)) {
            return checkVerificationStatus(org_addr);
           
        }
        return false;
    }

    // Function to check whether the organization is verified or not.
    function checkVerificationStatus(address org_address)
        public
        view
        returns (bool)
    {
        if (
            orgIdentifier[org_address].upvotes * 100 >= totalOrganizations * 51
        ) {
            return true;
        }
        return false;
    }

    // THIS FUNCTION WILL BE IN THE FRONTEND.
    // This Function transfers all the stake into the contract.
    // function transferStakeToContract(address org_address, bool category)
    //     public
    //     returns (bool)
    // {
    //     bool status = transfer(
    //         org_address,
    //         address(this),
    //         orgIdentifier[org_address].stake
    //     );
    //     if (status) {
    //         distributeStake(org_address, category);
    //     }
    //     return status;
    // }

    // Function to distribute the stake to the companies in favour.
    
    
}
