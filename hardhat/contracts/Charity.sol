// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Charity {
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
        bool decision;

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
        bool decision;
    }
    struct Violation {
        uint256 id;
        address org_address;
        string doc_cid;
        string desc;
        uint256 upvotes;
        uint256 downvotes;
        address[] upvoters;
        address[] downvoters;
        bool isOpen;
        uint256 start_time;
        uint256 end_time;
        bool isViolated;
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
        string report_cid;
        bool isOpen;
        bool isSubmitted;
    }
       uint256 verified_org_cnt=1;

    mapping(address => Organization) private orgIdentifier;
    mapping(address => mapping(address => uint256)) voters;
    mapping(uint256 => mapping(address => uint256)) violation_voters;
    mapping(address => mapping(address => uint256)) financial_report_voters;
    mapping(address => bool) verifiedOrgMap;
    mapping(address => bool) temp;
    mapping(uint256 => Violation) violationMap;
    mapping(address => FinancialReport) financialReportMap;

    address[] organizationAddress;
    address[] notVotedAddress;
    address[] maxPointAddress;
    address[] finishedVotes;
    uint256[] finishedViolationVotes;
    address[] financialReportsAddress;
    address[] notSubmitFRAddress;
    address public admin;

    uint256 public totalOrganizations;
    uint256 stakeToBeDistributed;
    uint256 registeredViolations;

    Organization[] listOrganizations;
    FinancialReport[] listFinancialReports;

    constructor() {
  admin = msg.sender;
        stakeToBeDistributed = 5 * 10**17;
        registeredViolations = 0;
        registerOrg(msg.sender,"Owner","None","Description",block.timestamp);
        orgIdentifier[msg.sender].verification_status = true;
       
        orgIdentifier[msg.sender].isStakePaid = true;
    }

    // GENERAL FUNCTIONS OF THE CONTRACT

    // Function to check whether the organization is verfied or not.
    function isVerified() public view returns (bool) {
        return orgIdentifier[msg.sender].isStakePaid;
    }

    // Function to check whether the organization has staked its ethers or not.
    function isStaked() public view returns (bool) {
        return orgIdentifier[msg.sender].isStakePaid;
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
        view
        returns (OrgDetails[] memory)
    {
        uint256 len = organizationAddress.length;
        uint256 cnt = 0;
        OrgDetails[] memory verified_org = new OrgDetails[](verified_org_cnt);
        for (uint256 i = 0; i < len; i++) {
            address org_addr = organizationAddress[i];
            if (orgIdentifier[org_addr].verification_status && orgIdentifier[organizationAddress[i]].verification_status &&
                orgIdentifier[organizationAddress[i]].isStakePaid) {
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
                    application_time: new_org.application_time,
                    decision:new_org.decision
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
            if (!orgIdentifier[org_addr].verification_status && orgIdentifier[organizationAddress[i]].isStakePaid == false) {
                OrgDetails memory new_org = OrgDetails({
                    org_address: orgIdentifier[org_addr].org_address,
                    name: orgIdentifier[org_addr].name,
                    doc_cid: orgIdentifier[org_addr].doc_cid,
                    upvotes: orgIdentifier[org_addr].upvotes,
                    downvotes: orgIdentifier[org_addr].downvotes,
                    views:orgIdentifier[org_addr].views,
                    verification_status: orgIdentifier[org_addr].verification_status,
                    desc: orgIdentifier[org_addr].desc,
                    decision:orgIdentifier[org_addr].decision,
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

    modifier isValid(address org_address) {
        require(
            orgIdentifier[org_address].application_time != 0,
            "Organization address does not exist!"
        );
        require(
            !orgIdentifier[org_address].verification_status,
            "Organization already verified!"
        );
        require(
            orgIdentifier[msg.sender].application_time != 0 &&
                orgIdentifier[msg.sender].verification_status,
            "Voter organization is not verified, not permitted to vote!"
        );
        require(
            voters[org_address][msg.sender] == 0,
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
    function checkAlreadyRegistered() public view returns (bool) {
        return orgIdentifier[msg.sender].application_time != 0;
    }

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
        orgIdentifier[organization_address].application_time = time + 2 minutes;
        orgIdentifier[organization_address].views = countOfViews(organization_address)+1;
        organizationAddress.push(organization_address);
    }

    // Function to upvote the organization.
    function upVote(
        address org_address,
       
        uint256 current_time
    ) public isValid(org_address) returns (bool) {
        orgIdentifier[org_address].upvotes += 1;
        orgIdentifier[org_address].upvoters.push(msg.sender);
        voters[org_address][msg.sender] = 1;
        if (orgIdentifier[org_address].application_time < current_time) {
             return checkVerificationStatus(org_address);
        } else {
            return false;
        }
    }

    // Function to downvote the organization.
    function downVote(
        address org_address,
       
        uint256 current_time
    ) public isValid(org_address) returns (bool) {
        orgIdentifier[org_address].downvotes += 1;
        orgIdentifier[org_address].downvoters.push(msg.sender);
        voters[org_address][msg.sender] = 2;
        if (orgIdentifier[org_address].application_time < current_time) {
             return checkVerificationStatus(org_address);
        } else {
            return false;
        }
    }

    // Function to check whether the organization is verified or not.
    function checkVerificationStatus(address org_address)
        public
        
        returns (bool)
    {
        if (
            orgIdentifier[org_address].upvotes * 100 >= totalOrganizations * 51
        ) {
            orgIdentifier[org_address].verification_status = true;
            orgIdentifier[org_address].isStakePaid = true;
            verified_org_cnt++;
            return (true);
        }
        return (false);
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

    function setVerificationStatus(address org_address) public {
        if (
            orgIdentifier[org_address].upvotes * 100 >= totalOrganizations * 51
        ) {
            orgIdentifier[org_address].verification_status = true;
        } else {
            orgIdentifier[org_address].verification_status = false;
            distributeStake(org_address, false);
        }
    }

    // Function to change the status of isStakePaid and add the organization into the list of verified organization.
    function changeStakePaid(address org_address, uint256 stakeAmount) public {
        orgIdentifier[org_address].isStakePaid = true;
        distributeStake(org_address, true);
        orgIdentifier[org_address].stake = stakeAmount;
        markAsVerified(org_address);
    }

    // Function to put the organization into the verified list. This has to be called after the stake is paid.
    function markAsVerified(address org_address) public {
        totalOrganizations += 1;
        verifiedOrgMap[org_address] = true;
    }

    // Function used to get all the organizations whose time of voting expired.
    function cronJobsForVotes() public returns (address[] memory) {
        for (uint256 i = 0; i < organizationAddress.length; i++) {
            if (
                orgIdentifier[organizationAddress[i]].decision == false &&
                orgIdentifier[organizationAddress[i]].application_time <
                block.timestamp
            ) {
                finishedVotes.push(organizationAddress[i]);
            }
        }
        return finishedVotes;
    }

    // Function used to empty the finishedVotes array.
    function emptyFinishedVotes() public {
        uint256 timeLoop = finishedVotes.length;
        for (uint256 i = 0; i < timeLoop; i++) {
            finishedVotes.pop();
        }
    }

    // Function to be called when the time of voting for organization verification is over using cron job(assumption).
    function notVoted(address org_address) public {
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
        Violation memory vio;

        vio.id = registeredViolations;
        vio.org_address = organization_address;
        vio.doc_cid = document_cid;
        vio.desc = description;
        vio.start_time = registration_time;
        vio.end_time = registration_time + 5 days;
        vio.isOpen = true;

        violationMap[registeredViolations] = vio;
        registeredViolations = registeredViolations + 1;
    }

    // Function used for upvoting the violations of the organization.
    function violationUpVote(uint256 index) public {
        violationMap[index].upvotes = violationMap[index].upvotes + 1;
        violationMap[index].upvoters.push(msg.sender);
        violation_voters[index][msg.sender] = 1;
    }

    // Function used for downvoting the violations of the organization.
    function violationDownVote(uint256 index) public {
        violationMap[index].downvotes = violationMap[index].downvotes + 1;
        violationMap[index].downvoters.push(msg.sender);
        violation_voters[index][msg.sender] = 2;
    }

    // Function used to return the array of the violations whose time for voting is over.
    function finishedViolationVoting() public returns (uint256[] memory) {
        for (uint256 i = 0; i < registeredViolations; i++) {
            if (violationMap[i].end_time < block.timestamp) {
                finishedViolationVotes.push(i);
            }
        }
        return finishedViolationVotes;
    }

    // Function to empty the finishedViolationVotes array.
    function emptyFinishedViolationVotes() public {
        uint256 timeLoop = finishedViolationVotes.length;
        for (uint256 i = 0; i < timeLoop; i++) {
            finishedViolationVotes.pop();
        }
    }

    // Function to be called once the voting period of violation is finished.
    function setViolationStatus(uint256 index) public {
        uint256 totalVotes = violationMap[index].upvotes +
            violationMap[index].downvotes;
        if (violationMap[index].upvotes * 100 >= totalVotes * 51) {
            violationMap[index].isViolated = true;
        } else {
            violationMap[index].isViolated = false;
        }
        violationMap[index].isOpen = false;
    }

    // Function to be called to transfer the stake back to the owners after violation status is checked.
    function upvotedOnVerify(uint256 index) public {
        address org_address = violationMap[index].org_address;
        if (violationMap[index].isViolated) {
            for (
                uint256 i = 0;
                i < orgIdentifier[org_address].upvoters.length;
                i++
            ) {
                orgIdentifier[orgIdentifier[org_address].upvoters[i]].stake =
                    orgIdentifier[orgIdentifier[org_address].upvoters[i]]
                        .stake -
                    stakeToBeDistributed;
                orgIdentifier[orgIdentifier[org_address].upvoters[i]].points =
                    orgIdentifier[orgIdentifier[org_address].upvoters[i]]
                        .points -
                    1;
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
                orgIdentifier[orgIdentifier[org_address].downvoters[i]].points =
                    orgIdentifier[orgIdentifier[org_address].downvoters[i]]
                        .points +
                    1;
            }
        }
    }

    // Function to be called when the organization is correctly verified for violating rules and donating its stake to the organizations having most points.
    function RemoveCharityIfFraud(uint256 index) public {
        address org_address = violationMap[index].org_address;
        if (violationMap[index].isViolated == true) {
            orgIdentifier[org_address].verification_status = false;
            orgIdentifier[org_address].isStakePaid = false;
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
                orgIdentifier[maxPointAddress[i]].stake =
                    orgIdentifier[maxPointAddress[i]].stake +
                    amountToBeDistributed;
            }

            uint256 loopTime = maxPointAddress.length;
            for (uint256 i = 0; i < loopTime; i++) {
                maxPointAddress.pop();
            }
        }
    }

    // FUNCTIONS FOR FINANCIAL REPORTS OF THE ORGANIZATIONS.
    // Assuming the time for all the companies will be same that is at the year end.
    // So there is no need to have the different end times.

    // Function for registering the financial reports of the organizations.
    function registerFinancialReport(
        address org_address,
        string memory cid,
        uint256 registration_time
    ) public {
        FinancialReport memory finRep;

        finRep.org_address = org_address;
        finRep.report_cid = cid;
        finRep.reportUploadStartTime = registration_time;
        finRep.reportUploadEndTime = registration_time + 5 days;
        finRep.isSubmitted = false;

        financialReportMap[org_address] = finRep;
        financialReportsAddress.push(org_address);
    }

    // Function used for upvoting the financial reports of the organizations.
    function reportUpVote(address org_address) public {
        financialReportMap[org_address].upvotes =
            financialReportMap[org_address].upvotes +
            1;
        financialReportMap[org_address].upvoters.push(msg.sender);
        financial_report_voters[org_address][msg.sender] = 1;
    }

    // Function used for downnvoting the financial reports of the organizations.
    function reportsDownVote(address org_address) public {
        financialReportMap[org_address].downvotes =
            financialReportMap[org_address].downvotes +
            1;
        financialReportMap[org_address].downvoters.push(msg.sender);
        financial_report_voters[org_address][msg.sender] = 2;
    }

    // Function to return the list of all the submissions of the financial reports.
    function getFinancialReports() public returns (FinancialReport[] memory) {
        for (uint256 i = 0; i < financialReportsAddress.length; i++) {
            listFinancialReports.push(
                financialReportMap[financialReportsAddress[i]]
            );
        }
        return listFinancialReports;
    }

    // Function to empty the listFinancialReports array
    function emptyListFinancialReports() public {
        uint256 timeLoop = listFinancialReports.length;
        for (uint256 i = 0; i < timeLoop; i++) {
            listFinancialReports.pop();
        }
    }

    // Function to get the list of the Orgs that submitted the financial reports.
    function getSubmittedFROrgs() public view returns (address[] memory) {
        return financialReportsAddress;
    }

    // Function to get the list of the Orgs failed to submit the financial reports.
    function getUnsubmittedFROrgs() public returns (address[] memory) {
        for (uint256 i = 0; i < organizationAddress.length; i++) {
            if (
                orgIdentifier[organizationAddress[i]].isStakePaid == true &&
                financialReportMap[organizationAddress[i]].isSubmitted == false
            ) {
                notSubmitFRAddress.push(organizationAddress[i]);
            }
        }
        return notSubmitFRAddress;
    }

    // Function to empty notSubmitFRAddress array.
    function emptyNotSubmitFRAddress() public {
        uint256 timeLoop = notSubmitFRAddress.length;
        for (uint256 i = 0; i < timeLoop; i++) {
            notSubmitFRAddress.pop();
        }
    }

    // Function to be called once the time for voting of financial reports are over.
    function setFinancialReportStatus(address org_address) public {
        uint256 totalVotes = financialReportMap[org_address].upvotes +
            financialReportMap[org_address].downvotes;
        if (financialReportMap[org_address].upvotes * 100 >= totalVotes * 51) {
            financialReportMap[org_address].isReportTrue = true;
        } else {
            financialReportMap[org_address].isReportTrue = false;
        }
    }

    // Function to be called to transfer the stake back to the owners after fraud status is checked.
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
                orgIdentifier[orgIdentifier[org_address].upvoters[i]].points =
                    orgIdentifier[orgIdentifier[org_address].upvoters[i]]
                        .points -
                    1;
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
                orgIdentifier[orgIdentifier[org_address].downvoters[i]].points =
                    orgIdentifier[orgIdentifier[org_address].downvoters[i]]
                        .points +
                    1;
            }
        }
    }

    // Function for removing the organization from the list of verified organization and donating its stake to the organizations having most points.
    function RemoveCharityIfFinancialReportFraud(address org_address) public {
        if (financialReportMap[org_address].isReportTrue == false) {
            orgIdentifier[org_address].verification_status = false;
            orgIdentifier[org_address].isStakePaid = false;
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
                orgIdentifier[maxPointAddress[i]].stake =
                    orgIdentifier[maxPointAddress[i]].stake +
                    amountToBeDistributed;
            }

            uint256 loopTime = maxPointAddress.length;
            for (uint256 i = 0; i < loopTime; i++) {
                maxPointAddress.pop();
            }
        }
    }

    // Function used for empty financialReportAddress array.
    function emptyFinancialReportAddress() public {
        uint256 timeLoop = financialReportsAddress.length;
        for (uint256 i = 0; i < timeLoop; i++) {
            financialReportsAddress.pop();
        }
    }
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