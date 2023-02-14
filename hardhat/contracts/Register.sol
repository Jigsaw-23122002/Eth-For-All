// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Register {
    struct Organization {
        address org_address;
        string name;
        string doc_cid;
        uint256 upvotes;
        uint256 downvotes;
        bool verification_status;
        mapping(address => uint8) voters;
        address[] upvoters;
        address[] downvoters;
        string desc;
        uint256 application_time;
    }

    struct OrgDetails {
        address org_address;
        string name;
        string doc_cid;
        uint256 upvotes;
        uint256 downvotes;
        bool verification_status;
        string desc;
        uint256 application_time;
    }

    mapping(address => Organization) private orgIdentifier;
    mapping(address => uint256) private stake_amount;

    address[] organisations;
    uint256 verified_org_cnt;

    address public admin;

    constructor() {
        admin = msg.sender;
    }

    function countOfUpvotes(address org_addr) public view returns (uint256) {
        return orgIdentifier[org_addr].upvotes;
    }

    function countOfDownvotes(address org_addr) public view returns (uint256) {
        return orgIdentifier[org_addr].downvotes;
    }

    function countOfViews(address org_addr) public view returns (uint256) {
        return
            verified_org_cnt -
            countOfUpvotes(org_addr) -
            countOfDownvotes(org_addr);
    }

    function checkIfUpvoted(address org_addr) public view returns (bool) {
        address voter_addr = address(this);
        return orgIdentifier[org_addr].voters[voter_addr] == 2;
    }

    function checkIfDownvoted(address org_addr) public view returns (bool) {
        address voter_addr = address(this);
        return orgIdentifier[org_addr].voters[voter_addr] == 1;
    }

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

        organisations.push(organization_address);
    }

    modifier isValid(address org_addr) {
        require(
            orgIdentifier[org_addr].application_time != 0,
            "Organization address does not exist!"
        );
        require(
            !orgIdentifier[org_addr].verification_status,
            "Organization already verified!"
        );
        require(
            orgIdentifier[address(this)].application_time != 0 &&
                orgIdentifier[address(this)].verification_status,
            "Voter organization is not verified, not permitted to vote!"
        );
        require(
            !checkIfUpvoted(org_addr) && !checkIfDownvoted(org_addr),
            "Voter organization cannot vote more than once!"
        );
        _;
    }

    function upVote(
        address org_addr,
        uint256 current_time
    ) public isValid(org_addr) {
        orgIdentifier[org_addr].upvotes += 1;
        orgIdentifier[org_addr].upvoters.push(address(this));
        orgIdentifier[org_addr].voters[address(this)] = 2;
        if (votingDone(org_addr, current_time)) {
            checkVerificationStatus(org_addr);
        }
    }

    function downVote(
        address org_addr,
        uint256 current_time
    ) public isValid(org_addr) {
        orgIdentifier[org_addr].downvotes += 1;
        orgIdentifier[org_addr].downvoters.push(address(this));
        orgIdentifier[org_addr].voters[address(this)] = 1;
        if (votingDone(org_addr, current_time)) {
            checkVerificationStatus(org_addr);
        }
    }

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

    function checkVerificationStatus(address org_addr) public {
        if (orgIdentifier[org_addr].upvotes * 100 >= verified_org_cnt * 51) {
            orgIdentifier[org_addr].verification_status = true;
            verified_org_cnt += 1;
        }
    }

    function verifiedOrganizationsList()
        public
        view
        returns (OrgDetails[] memory)
    {
        uint256 len = organisations.length;
        uint256 cnt = 0;
        OrgDetails[] memory verified_org = new OrgDetails[](verified_org_cnt);
        for (uint256 i = 0; i < len; i++) {
            address org_addr = organisations[i];
            if (orgIdentifier[org_addr].verification_status) {
                Organization storage new_org = orgIdentifier[org_addr];
                OrgDetails memory new_org_det = OrgDetails({
                    org_address: new_org.org_address,
                    name: new_org.name,
                    doc_cid: new_org.doc_cid,
                    upvotes: new_org.upvotes,
                    downvotes: new_org.downvotes,
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

    function unverifiedOrganizationsList()
        public
        view
        returns (OrgDetails[] memory)
    {
        uint256 len = organisations.length;
        uint256 cnt = 0;
        OrgDetails[] memory unverified_org = new OrgDetails[](
            organisations.length - verified_org_cnt
        );
        for (uint256 i = 0; i < len; i++) {
            address org_addr = organisations[i];
            if (!orgIdentifier[org_addr].verification_status) {
                OrgDetails memory new_org = OrgDetails({
                    org_address: orgIdentifier[org_addr].org_address,
                    name: orgIdentifier[org_addr].name,
                    doc_cid: orgIdentifier[org_addr].doc_cid,
                    upvotes: orgIdentifier[org_addr].upvotes,
                    downvotes: orgIdentifier[org_addr].downvotes,
                    verification_status: orgIdentifier[org_addr]
                        .verification_status,
                    desc: orgIdentifier[org_addr].desc,
                    application_time: orgIdentifier[org_addr].application_time
                });
                unverified_org[cnt] = new_org;
                cnt += 1;
            }
        }
        return unverified_org;
    }
}
