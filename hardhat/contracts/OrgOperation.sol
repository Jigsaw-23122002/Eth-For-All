// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./OrgCreation.sol";

contract OrgOperation is OrgCreation {
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

    mapping(address => Violation) violationMap;
    mapping(address => FinancialReport) financialReportMap;

    constructor() {}

    // GENERAL FUNCTIONS OF THE CONTRACT

    // Function to check whether the organization is verfied or not.
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
