import process from "process";
import minimist from "minimist";
import { Web3Storage } from "web3.storage";

export async function upload(files) {
  const args = minimist(process.argv.slice(2));
  const token = args.token;

  if (!token) {
    return console.error(
      "A token is needed. You can create one on https://web3.storage"
    );
  }

  const storage = new Web3Storage({ token });
  console.log(files);

  //   console.log(`Uploading ${files.length} files`);
  //   const cid = await storage.put(files);
  //   console.log("Content added with CID:", cid);
}
