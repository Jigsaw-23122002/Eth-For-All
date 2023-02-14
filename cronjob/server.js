const Web3 = require("web3");
const {
  ALCHEMY_RPC_URL,
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
} = require("./constants/index");

setInterval(async () => {
  const web3 = new Web3(ALCHEMY_RPC_URL);
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

  console.log(contract.methods);

  const finishedVotes = await contract.methods.cronJobsForVotes().call();
  for (let i = 0; i < finishedVotes.length; i++) {
    await contract.methods.setVerificationStatus(finishedVotes[i]);
    await contract.methods.notVoted(finishedVotes[i]);
    await contract.methods.cutStakeOfNotVoted();
    await contract.methods.emptyNotVotedArray();
  }
  await contract.methods.emptyFinishedVotes();
}, 5000);

setInterval(async () => {
  const web3 = new Web3(ALCHEMY_RPC_URL);
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

  const finishedViolationVotes =
    await contract.methods.finishedViolationVoting();
  for (let i = 0; i < finishedViolationVotes.length; i++) {
    await contract.methods.setViolationStatus(finishedViolationVotes[i]);
    await contract.methods.upvotedOnVerify(finishedViolationVotes[i]);
    await contract.methods.RemoveCharityIfFraud(finishedViolationVotes[i]);
  }
  await contract.methods.emptyFinishedViolationVotes();
}, 5000);

setInterval(async () => {
  const web3 = new Web3(ALCHEMY_RPC_URL);
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

  const submittedFROrgs = await contract.methods.getSubmittedFROrgs();
  for (let i = 0; i < submittedFROrgs.length; i++) {
    await contract.methods.setFinancialReportStatus(submittedFROrgs[i]);
    await contract.methods.upvotedOnFinancialReport(submittedFROrgs[i]);
    await contract.methods.RemoveCharityIfFinancialReportFraud(
      submittedFROrgs[i]
    );
  }
  await contract.methods.emptyFinancialReportAddress();
}, 5000);
