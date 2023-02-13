// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Charity {
    uint256 public totalOrganizations;
    uint256 stakeToBeDistrubited = 5 * 10**17;
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
    }

    address[] organizationAddress;

    mapping(address => Organization) private orgIdentifier;
    mapping(address => mapping(address => bool)) voters;
    mapping(address => bool) verifiedOrgMap;

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
            voters[org_address][voter_address] == false,
            "Voter organization cannot vote more than once!"
        );
        _;
    }

    // ye function ka dekho bhai plis
    function transfer(
        address from,
        address to,
        uint256 value
    ) public returns (bool) {
        return true;
    }

    function transferToContract(address org_address, bool category)
        public
        returns (bool)
    {
        bool status = transfer(
            org_address,
            address(this),
            orgIdentifier[org_address].stake
        );
        if (status) {
            cutStake(org_address, category);
        }
        return status;
    }

    function markAsVerified(address org_address) public {
        orgIdentifier[org_address].verification_status = true;
        totalOrganizations += 1;
        verifiedOrgMap[org_address] = true;
    }

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

    // Calling sequence from frontend:
    // 1) upVote();
    // 2) checkVerificationStatus(org_address, category);
    // 3) transferToContract(org_address, category);
    // 4) markAsVerified(org_address);

    function upVote(
        address org_address,
        address voter_address,
        uint256 current_time
    ) public isValid(org_address, voter_address) returns (bool) {
        orgIdentifier[org_address].upvotes += 1;
        orgIdentifier[org_address].upvoters.push(voter_address);
        voters[org_address][voter_address] = true;
        if (orgIdentifier[org_address].application_time < current_time) {
            return true;
        } else {
            return false;
        }
    }

    // Calling sequence from frontend:
    // 1) downVote();
    // 2) checkVerificationStatus(org_address, category);
    // 3) transferToContract(org_address, category);
    // 4) markAsVerified(org_address);

    function downVote(
        address org_address,
        address voter_address,
        uint256 current_time
    ) public isValid(org_address, voter_address) returns (bool) {
        orgIdentifier[org_address].downvotes += 1;
        orgIdentifier[org_address].downvoters.push(voter_address);
        voters[org_address][voter_address] = true;
        if (orgIdentifier[org_address].application_time < current_time) {
            return true;
        } else {
            return false;
        }
    }

    function cutStake(address org_address, bool category) public {
        if (category) {
            uint256 sum = 0;
            for (uint256 i = 0; i < orgIdentifier[org_address].upvotes; i++) {
                orgIdentifier[orgIdentifier[org_address].upvoters[i]].points =
                    orgIdentifier[orgIdentifier[org_address].upvoters[i]]
                        .points +
                    1;
                sum = sum + stakeToBeDistrubited;
                transfer(
                    address(this),
                    orgIdentifier[org_address].upvoters[i],
                    stakeToBeDistrubited
                );
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
                sum = sum + stakeToBeDistrubited;
                transfer(
                    address(this),
                    orgIdentifier[org_address].downvoters[i],
                    stakeToBeDistrubited
                );
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

    function donate(
        address donor_address,
        address org_address,
        uint256 amount
    ) public {
        transfer(donor_address, org_address, amount);
    }

    // Calling Sequence from frontend :
    // 1) notVoted();
    // 2) cutStakeOfNotVoted();
    // 3) emptyNotVotedArray();

    mapping(address => bool) temp;
    address[] notVotedAddress;

    function notVoted(address org_address) public returns (address[] memory) {
        // algo for finding out notvoted addresses
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

    function cutStakeOfNotVoted() public {
        for (uint256 i = 0; i < notVotedAddress.length; i++) {
            orgIdentifier[notVotedAddress[i]].stake =
                orgIdentifier[notVotedAddress[i]].stake -
                stakeToBeDistrubited;
        }
    }

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

    //
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

    uint256 registeredViolations = 0;
    mapping(address => Violation) violationMap;

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

    function violationUpVote(address org_address) public {
        violationMap[org_address].upvotes =
            violationMap[org_address].upvotes +
            1;
        violationMap[org_address].upvoters.push(msg.sender);
    }

    // On time expire for violation -
    // 1) checkViolationStatus
    // 2) upvotedOnVerify
    // 3) RemoveCharityIfFraud(org_address);

    function violationDownVote(address org_address) public {
        violationMap[org_address].downvotes =
            violationMap[org_address].downvotes +
            1;
        violationMap[org_address].downvoters.push(msg.sender);
    }

    function checkViolationStatus(address org_address) public {
        uint256 totalVotes = violationMap[org_address].upvotes +
            violationMap[org_address].downvotes;
        if (violationMap[org_address].upvotes * 100 >= totalVotes * 51) {
            violationMap[org_address].isViolated = true;
        } else {
            violationMap[org_address].isViolated = false;
        }
    }

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
                    stakeToBeDistrubited;
            }
            for (
                uint256 i = 0;
                i < orgIdentifier[org_address].downvoters.length;
                i++
            ) {
                orgIdentifier[orgIdentifier[org_address].downvoters[i]].stake =
                    orgIdentifier[orgIdentifier[org_address].downvoters[i]]
                        .stake +
                    stakeToBeDistrubited;
            }
        }
    }

    address[] maxPointAddress;

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
                donate(
                    address(this),
                    maxPointAddress[i],
                    amountToBeDistributed
                );
            }

            uint256 loopTime = maxPointAddress.length;
            for (uint256 i = 0; i < loopTime; i++) {
                maxPointAddress.pop();
            }
        }
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
    mapping(address => FinancialReport) financialReportMap;

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

    // On time expire for violation -
    // 1) checkFinancialReportStatus
    // 2) upvotedOnFinancialReport
    // 3) RemoveCharityIfFinancialReportFraud(org_address);

    function reportUpVote(address org_address) public {
        financialReportMap[org_address].upvotes =
            financialReportMap[org_address].upvotes +
            1;
        financialReportMap[org_address].upvoters.push(msg.sender);
    }

    function reportsDownVote(address org_address) public {
        financialReportMap[org_address].downvotes =
            financialReportMap[org_address].downvotes +
            1;
        financialReportMap[org_address].downvoters.push(msg.sender);
    }

    function checkFinancialReportStatus(address org_address) public {
        uint256 totalVotes = financialReportMap[org_address].upvotes +
            financialReportMap[org_address].downvotes;
        if (financialReportMap[org_address].upvotes * 100 >= totalVotes * 51) {
            financialReportMap[org_address].isReportTrue = true;
        } else {
            financialReportMap[org_address].isReportTrue = false;
        }
    }

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
                    stakeToBeDistrubited;
            }
            for (
                uint256 i = 0;
                i < orgIdentifier[org_address].downvoters.length;
                i++
            ) {
                orgIdentifier[orgIdentifier[org_address].downvoters[i]].stake =
                    orgIdentifier[orgIdentifier[org_address].downvoters[i]]
                        .stake +
                    stakeToBeDistrubited;
            }
        }
    }

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
                donate(
                    address(this),
                    maxPointAddress[i],
                    amountToBeDistributed
                );
            }

            uint256 loopTime = maxPointAddress.length;
            for (uint256 i = 0; i < loopTime; i++) {
                maxPointAddress.pop();
            }
        }
    }
}

// Algorithm
// time of registration = 1400 (12.00 pm)
// 12 hrs adds 1000 to system time.
// means 1 day = 2000 system time increase.
// limit = 5400
// 6400
// Novotes->stake cut.
