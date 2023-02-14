// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Charity {
    struct Organization {
        address org_address;
        string name;
        string doc_cid;
        uint256 upvotes;
        uint256 downvotes;
        bool verification_status;
        address[] upvoters;
        address[] downvoters;
        uint256 stake;
        string desc;
        uint256 points;
        uint256 application_time;
        bool isStakePaid;
    }

    struct Violation {
        address org_address;
        string doc_cid;
        string desc;
        uint256 upvotes;
        uint256 downvotes;
        address[] upvoters;
        address[] downvoters;
        uint256 number;
        bool isOpen;
        uint256 start_time;
        uint256 end_time;
        bool isViolated;
        mapping(address => uint256) voters;
    }

    struct FinancialReport {
        address org_address;
        uint256 upvotes;
        uint256 downvotes;
        address[] upvoters;
        address[] downvoters;
        uint256 reportUploadStartTime;
        uint256 reportUploadEndTime;
        bool isReportTrue;
        string[] cid;
    }

    mapping(address => Organization) private orgIdentifier;
    mapping(address => mapping(address => uint256)) voters;
    mapping(address => bool) verifiedOrgMap;
    mapping(address => bool) temp;
    mapping(address => Violation) violationMap;
    mapping(address => FinancialReport) financialReportMap;

    address[] organizationAddress;
    address[] notVotedAddress;
    address[] maxPointAddress;
    address public admin;

    uint256 public totalOrganizations;
    uint256 stakeToBeDistributed;
    uint256 registeredViolations;

    Organization[] listOrganizations;

    function intialize() public {
        admin = msg.sender;
        stakeToBeDistributed = 5 * 10**17;
        registeredViolations = 0;
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
        return voters[org_address][msg.sender] == 1;
    }

    // Function to check whether the caller has downvoted or not.
    function checkIfDownvoted(address org_address) public view returns (bool) {
        return voters[org_address][msg.sender] == 2;
    }

    //Function to check whether the time of voting for the registered organizations is finish or not.
    function votingDone(address org_address, uint256 current_time)
        public
        view
        returns (bool)
    {
        if (orgIdentifier[org_address].application_time < current_time) {
            return true;
        } else {
            return false;
        }
    }

    // Function used to return the list of all the verified organization onto the website.
    function verifiedOrganizationsList()
        public
        returns (Organization[] memory)
    {
        for (uint256 i = 0; i < organizationAddress.length; i++) {
            if (orgIdentifier[organizationAddress[i]].verification_status) {
                listOrganizations.push(orgIdentifier[organizationAddress[i]]);
            }
        }
        return listOrganizations;
    }

    // Function to return the list of all the un verifiied orgnization onto the website.
    function unverifiedOrganizationsList()
        public
        returns (Organization[] memory)
    {
        for (uint256 i = 0; i < organizationAddress.length; i++) {
            if (
                orgIdentifier[organizationAddress[i]].verification_status ==
                false
            ) {
                listOrganizations.push(orgIdentifier[organizationAddress[i]]);
            }
        }
        return listOrganizations;
    }

    // Function to empty the listOrganization global array variable.
    function emptyListOrganization() public {
        uint256 timeLoop = listOrganizations.length;
        for (uint256 i = 0; i < timeLoop; i++) {
            listOrganizations.pop();
        }
    }

    modifier isValid(address org_address, address voter_address) {
        require(
            orgIdentifier[org_address].application_time != 0,
            "Organization address does not exist!"
        );
        require(
            !orgIdentifier[org_address].verification_status,
            "Organization already verified!"
        );
        require(
            orgIdentifier[voter_address].application_time != 0 &&
                orgIdentifier[voter_address].verification_status,
            "Voter organization is not verified, not permitted to vote!"
        );
        require(
            voters[org_address][voter_address] == 0,
            "Voter organization cannot vote more than once!"
        );
        _;
    }

    // THIS FUNCTION WILL BE IN THE FRONTEND.
    // function transfer(
    //     address from,
    //     address to,
    //     uint256 value
    // ) public returns (bool) {}

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

        Organization memory org;

        org.org_address = organization_address;
        org.name = organization_name;
        org.doc_cid = document_cid;
        org.desc = description;
        org.application_time = time + 2 days;
        orgIdentifier[organization_address] = org;

        organizationAddress.push(organization_address);
    }

    // Function to upvote the organization.
    function upVote(
        address org_address,
        address voter_address,
        uint256 current_time
    ) public isValid(org_address, voter_address) returns (bool) {
        orgIdentifier[org_address].upvotes += 1;
        orgIdentifier[org_address].upvoters.push(voter_address);
        voters[org_address][voter_address] = 1;
        if (orgIdentifier[org_address].application_time < current_time) {
            return true;
        } else {
            return false;
        }
    }

    // Function to downvote the organization.
    function downVote(
        address org_address,
        address voter_address,
        uint256 current_time
    ) public isValid(org_address, voter_address) returns (bool) {
        orgIdentifier[org_address].downvotes += 1;
        orgIdentifier[org_address].downvoters.push(voter_address);
        voters[org_address][voter_address] = 2;
        if (orgIdentifier[org_address].application_time < current_time) {
            return true;
        } else {
            return false;
        }
    }

    // Function to check whether the organization is verified or not.
    function checkVerificationStatus(address org_address, bool category)
        public
        view
        returns (bool, bool)
    {
        if (
            orgIdentifier[org_address].upvotes * 100 >= totalOrganizations * 51
        ) {
            return (true, category);
        }
        return (false, category);
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
    function distributeStake(address org_address, bool category) public {
        if (category) {
            uint256 sum = 0;
            for (uint256 i = 0; i < orgIdentifier[org_address].upvotes; i++) {
                orgIdentifier[orgIdentifier[org_address].upvoters[i]].points =
                    orgIdentifier[orgIdentifier[org_address].upvoters[i]]
                        .points +
                    1;
                sum = sum + stakeToBeDistributed;
                orgIdentifier[orgIdentifier[org_address].upvoters[i]].stake =
                    orgIdentifier[orgIdentifier[org_address].upvoters[i]]
                        .stake +
                    stakeToBeDistributed;
            }
            orgIdentifier[org_address].stake =
                orgIdentifier[org_address].stake -
                sum;
            for (uint256 i = 0; i < orgIdentifier[org_address].downvotes; i++) {
                orgIdentifier[orgIdentifier[org_address].downvoters[i]].points =
                    orgIdentifier[orgIdentifier[org_address].downvoters[i]]
                        .points -
                    1;
            }
        } else {
            uint256 sum = 0;
            for (uint256 i = 0; i < orgIdentifier[org_address].downvotes; i++) {
                orgIdentifier[orgIdentifier[org_address].downvoters[i]].points =
                    orgIdentifier[orgIdentifier[org_address].downvoters[i]]
                        .points +
                    1;
                sum = sum + stakeToBeDistributed;
                orgIdentifier[orgIdentifier[org_address].downvoters[i]].stake =
                    orgIdentifier[orgIdentifier[org_address].downvoters[i]]
                        .stake +
                    stakeToBeDistributed;
            }
            orgIdentifier[org_address].stake =
                orgIdentifier[org_address].stake -
                sum;
            for (uint256 i = 0; i < orgIdentifier[org_address].upvotes; i++) {
                orgIdentifier[orgIdentifier[org_address].upvoters[i]].points =
                    orgIdentifier[orgIdentifier[org_address].upvoters[i]]
                        .points -
                    1;
            }
        }
    }

    // Function to put the organization into the verified list. This has to be called after the stake is paid.
    function markAsVerified(address org_address) public {
        orgIdentifier[org_address].verification_status = true;
        totalOrganizations += 1;
        verifiedOrgMap[org_address] = true;
    }

    // Function to be called when the time of voting for organization verification is over using cron job(assumption).
    function notVoted(address org_address) public returns (address[] memory) {
        for (
            uint256 i = 0;
            i < orgIdentifier[org_address].upvoters.length;
            i++
        ) {
            temp[orgIdentifier[org_address].upvoters[i]] = true;
        }
        for (
            uint256 i = 0;
            i < orgIdentifier[org_address].downvoters.length;
            i++
        ) {
            temp[orgIdentifier[org_address].downvoters[i]] = true;
        }

        for (uint256 i = 0; i < organizationAddress.length; i++) {
            if (temp[organizationAddress[i]] == false) {
                notVotedAddress.push(organizationAddress[i]);
            }
        }

        return notVotedAddress;
    }

    // Function used to cut the stake of the organzizations failed to vote for verification/
    function cutStakeOfNotVoted() public {
        for (uint256 i = 0; i < notVotedAddress.length; i++) {
            orgIdentifier[notVotedAddress[i]].stake =
                orgIdentifier[notVotedAddress[i]].stake -
                stakeToBeDistributed;
        }
    }

    // Function used to clear the global notVotedAddress.
    function emptyNotVotedArray(address org_address) public {
        uint256 loopTime = notVotedAddress.length;
        for (uint256 i = 0; i < loopTime; i++) {
            notVotedAddress.pop();
        }
        for (
            uint256 i = 0;
            i < orgIdentifier[org_address].upvoters.length;
            i++
        ) {
            temp[orgIdentifier[org_address].upvoters[i]] = false;
        }
        for (
            uint256 i = 0;
            i < orgIdentifier[org_address].downvoters.length;
            i++
        ) {
            temp[orgIdentifier[org_address].downvoters[i]] = false;
        }
    }

    // FUNCTIONS FOR DONARS

    // THIS FUNCTION WILL BE IN THE FRONTEND.
    // Function for the user to donate the eth to the organizations.
    // function donate(
    //     address donor_address,
    //     address org_address,
    //     uint256 amount
    // ) public {
    //     transfer(donor_address, org_address, amount);
    // }

    // FUNCTIONS OF VIOLATIONS

    // Function used to register the violation of the organization.
    function registerViolation(
        address organization_address,
        string memory document_cid,
        string memory description,
        uint256 registration_time
    ) public {
        violationMap[organization_address].org_address = organization_address;
        violationMap[organization_address].doc_cid = document_cid;
        violationMap[organization_address].desc = description;
        violationMap[organization_address].start_time = registration_time;
        violationMap[organization_address].end_time =
            registration_time +
            5 days;

        registeredViolations = registeredViolations + 1;
    }

    // Function used for upvoting the violations of the organization.
    function violationUpVote(address org_address) public {
        violationMap[org_address].upvotes =
            violationMap[org_address].upvotes +
            1;
        violationMap[org_address].upvoters.push(msg.sender);
    }

    // Function used for downvoting the violations of the organization.
    function violationDownVote(address org_address) public {
        violationMap[org_address].downvotes =
            violationMap[org_address].downvotes +
            1;
        violationMap[org_address].downvoters.push(msg.sender);
    }

    // Function to be called once the voting period of violation is finished.
    function checkViolationStatus(address org_address) public {
        uint256 totalVotes = violationMap[org_address].upvotes +
            violationMap[org_address].downvotes;
        if (violationMap[org_address].upvotes * 100 >= totalVotes * 51) {
            violationMap[org_address].isViolated = true;
        } else {
            violationMap[org_address].isViolated = false;
        }
    }

    // ******** Function to be called to transfer the stake back to the owners after violation status is checked.
    function upvotedOnVerify(address org_address) public {
        if (violationMap[org_address].isViolated) {
            for (
                uint256 i = 0;
                i < orgIdentifier[org_address].upvoters.length;
                i++
            ) {
                orgIdentifier[orgIdentifier[org_address].upvoters[i]].stake =
                    orgIdentifier[orgIdentifier[org_address].upvoters[i]]
                        .stake -
                    stakeToBeDistributed;
            }
            for (
                uint256 i = 0;
                i < orgIdentifier[org_address].downvoters.length;
                i++
            ) {
                orgIdentifier[orgIdentifier[org_address].downvoters[i]].stake =
                    orgIdentifier[orgIdentifier[org_address].downvoters[i]]
                        .stake +
                    stakeToBeDistributed;
            }
        }
    }

    // Function to be called when the organization is correctly verified for violating rules and donating its stake to the organizations having most points.
    function RemoveCharityIfFraud(address org_address) public {
        if (violationMap[org_address].isViolated == true) {
            orgIdentifier[org_address].verification_status = false;
            totalOrganizations -= 1;
            verifiedOrgMap[org_address] = false;
            uint256 maxPoints;

            for (uint256 i = 0; i < organizationAddress.length; i++) {
                if (
                    orgIdentifier[organizationAddress[i]].verification_status &&
                    maxPoints < orgIdentifier[organizationAddress[i]].points
                ) {
                    maxPoints = orgIdentifier[organizationAddress[i]].points;
                    maxPointAddress.push(organizationAddress[i]);
                }
            }
            uint256 amountToBeDistributed = orgIdentifier[org_address].stake /
                maxPointAddress.length;

            for (uint256 i = 0; i < maxPointAddress.length; i++) {
                // donate the money from the contract to the organizations with max points shortlisted.
            }

            uint256 loopTime = maxPointAddress.length;
            for (uint256 i = 0; i < loopTime; i++) {
                maxPointAddress.pop();
            }
        }
    }

    // FUNCTIONS FOR FINANCIAL REPORTS OF THE ORGANIZATIONS.

    // Function for registering the financial reports of the organizations.
    function registerFinancialReport(
        address org_address,
        string memory cid,
        uint256 registration_time
    ) public {
        financialReportMap[org_address].org_address = org_address;
        financialReportMap[org_address].cid.push(cid);
        financialReportMap[org_address]
            .reportUploadStartTime = registration_time;
        financialReportMap[org_address].reportUploadEndTime =
            registration_time +
            5 days;
    }

    // Function used for upvoting the financial reports of the organizations.
    function reportUpVote(address org_address) public {
        financialReportMap[org_address].upvotes =
            financialReportMap[org_address].upvotes +
            1;
        financialReportMap[org_address].upvoters.push(msg.sender);
    }

    // Function used for downnvoting the financial reports of the organizations.
    function reportsDownVote(address org_address) public {
        financialReportMap[org_address].downvotes =
            financialReportMap[org_address].downvotes +
            1;
        financialReportMap[org_address].downvoters.push(msg.sender);
    }

    // Function to be called once the time for voting of financial reports are over.
    function checkFinancialReportStatus(address org_address) public {
        uint256 totalVotes = financialReportMap[org_address].upvotes +
            financialReportMap[org_address].downvotes;
        if (financialReportMap[org_address].upvotes * 100 >= totalVotes * 51) {
            financialReportMap[org_address].isReportTrue = true;
        } else {
            financialReportMap[org_address].isReportTrue = false;
        }
    }

    // ******** Function to be called to transfer the stake back to the owners after vfraud status is checked.
    function upvotedOnFinancialReport(address org_address) public {
        if (financialReportMap[org_address].isReportTrue == false) {
            for (
                uint256 i = 0;
                i < orgIdentifier[org_address].upvoters.length;
                i++
            ) {
                orgIdentifier[orgIdentifier[org_address].upvoters[i]].stake =
                    orgIdentifier[orgIdentifier[org_address].upvoters[i]]
                        .stake -
                    stakeToBeDistributed;
            }
            for (
                uint256 i = 0;
                i < orgIdentifier[org_address].downvoters.length;
                i++
            ) {
                orgIdentifier[orgIdentifier[org_address].downvoters[i]].stake =
                    orgIdentifier[orgIdentifier[org_address].downvoters[i]]
                        .stake +
                    stakeToBeDistributed;
            }
        }
    }

    // Function for removing the organization from the list of verified organization and donating its stake to the organizations having most points.
    function RemoveCharityIfFinancialReportFraud(address org_address) public {
        if (financialReportMap[org_address].isReportTrue == false) {
            orgIdentifier[org_address].verification_status = false;
            totalOrganizations -= 1;
            verifiedOrgMap[org_address] = false;
            uint256 maxPoints;

            for (uint256 i = 0; i < organizationAddress.length; i++) {
                if (
                    orgIdentifier[organizationAddress[i]].verification_status &&
                    maxPoints < orgIdentifier[organizationAddress[i]].points
                ) {
                    maxPoints = orgIdentifier[organizationAddress[i]].points;
                    maxPointAddress.push(organizationAddress[i]);
                }
            }
            uint256 amountToBeDistributed = orgIdentifier[org_address].stake /
                maxPointAddress.length;

            for (uint256 i = 0; i < maxPointAddress.length; i++) {
                // donate the money from the contract to the organizations with max points shortlisted.
            }

            uint256 loopTime = maxPointAddress.length;
            for (uint256 i = 0; i < loopTime; i++) {
                maxPointAddress.pop();
            }
        }
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}

// Algorithm
// time of registration = 1400 (12.00 pm)
// 12 hrs adds 1000 to system time.
// means 1 day = 2000 system time increase.
// limit = 5400
// 6400

// Calling sequence from frontend for verification for upvote:
// 1) upVote();
// 2) checkVerificationStatus(org_address, category);
// 3) transferToContract(org_address, category);
// 4) markAsVerified(org_address);

// Calling sequence from frontend for verification for upvote:
// 1) downVote();
// 2) checkVerificationStatus(org_address, category);
// 3) transferToContract(org_address, category);
// 4) markAsVerified(org_address);

// Calling Sequence from frontend using cron job for the organizations failed to vote:
// 1) notVoted();
// 2) cutStakeOfNotVoted();
// 3) emptyNotVotedArray();

// On time expire for violation -
// 1) checkViolationStatus
// 2) upvotedOnVerify
// 3) RemoveCharityIfFraud(org_address);

// On time expire for Financial report verification per -d
//    1) checkFinancialReportStatus
//    2) upvotedOnFinancialReport
//    3) RemoveCharityIfFinancialReportFraud(org_address);
