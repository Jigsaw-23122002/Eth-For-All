require("dotenv").config();
const Web3 = require("web3");
const {
  ALCHEMY_RPC_URL,
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
} = require("./constants/index");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

setInterval(async () => {
  const web3 = new Web3(ALCHEMY_RPC_URL);
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

  console.log(contract.methods);

  // Voting Cronjob
  const finishedVotes = await contract.methods.cronJobsForVotes().call();
  for (let i = 0; i < finishedVotes.length; i++) {
    await contract.methods.setVerificationStatus(finishedVotes[i]);
    await contract.methods.notVoted(finishedVotes[i]);
    await contract.methods.cutStakeOfNotVoted();
    await contract.methods.emptyNotVotedArray();
  }
  await contract.methods.emptyFinishedVotes();

  // Violations Cronjob
  const finishedViolationVotes =
    await contract.methods.finishedViolationVoting();
  for (let i = 0; i < finishedViolationVotes.length; i++) {
    await contract.methods.setViolationStatus(finishedViolationVotes[i]);
    await contract.methods.upvotedOnVerify(finishedViolationVotes[i]);
    await contract.methods.RemoveCharityIfFraud(finishedViolationVotes[i]);
  }
  await contract.methods.emptyFinishedViolationVotes();

  // Financial Report Cronjob
  const submittedFROrgs = await contract.methods.getSubmittedFROrgs();
  for (let i = 0; i < submittedFROrgs.length; i++) {
    await contract.methods.setFinancialReportStatus(submittedFROrgs[i]);
    await contract.methods.upvotedOnFinancialReport(submittedFROrgs[i]);
    await contract.methods.RemoveCharityIfFinancialReportFraud(
      submittedFROrgs[i]
    );
  }
  await contract.methods.emptyFinancialReportAddress();
}, 60000);

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
<<<<<<< HEAD
});
=======
});
>>>>>>> 8cbccb960d08c73cf0380e2f8a6a3939fa4a78c0
