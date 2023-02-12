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
        } else {
            uint256 sum = 0;
            for (uint256 i = 0; i < orgIdentifier[org_address].downvotes; i++) {
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
        for (uint256 i = 0; i < notVotedAddress.length; i++) {
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
}

// Algorithm
// time of registration = 1400 (12.00 pm)
// 12 hrs adds 1000 to system time.
// means 1 day = 2000 system time increase.
// limit = 5400
// 6400
// Novotes->stake cut.
