import { React, useState, useRef } from 'react'
import { Upload } from '@web3uikit/core'
import { Contract, providers } from 'ethers';
import { useRouter } from "next/router";
import { Web3Storage } from 'web3.storage'
import Web3Modal from "web3modal";
import { REGISTER_CONTRACT_ADDRESS, abi } from '../constants/index.js';
import 'flowbite'


export default function reportOrg({ query }) {
  const [cidValue, setcidValue] = useState("")
  const [description, setdescription] = useState("")
  const [orgAddress, setorgAddress] = useState("")
  const [orgDesc, setorgDesc] = useState("")
  const [orgtime, setorgtime] = useState("")
  const router = useRouter();
  function getAccessToken() {
    return process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN
  }
  function getFiles() {
    const fileInput = document.querySelector('input[type="file"]')
    return fileInput.files
  }
  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() })
  }
  async function storeFiles() {
    let files = getFiles()
    const client = makeStorageClient()
    const cid = await client.put(files)
    console.log('stored files with cid:', cid)
    setcidValue(cid)
    return cid
  }
  const web3ModalRef = useRef();
  // const setNetwork = ()=>{

  // }
  // window.setNetwork();
  const [walletConnected, setWalletConnected] = useState(false);

  const getProviderOrSigner = async (needSigner) => {
    web3ModalRef.current = new Web3Modal({
      network: "goerli",
      providerOptions: {},
      disableInjectedProvider: false,
    });
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 5) {
      window.alert("Change the network to Goerli");
      throw new Error("Change network to Goerli");
    }
    if (needSigner) {
      const signer = web3Provider.getSigner();
      console.log("Done signer");
      return signer;
    }
    console.log("Done provider");
    return web3Provider;
  };

  const getInfo = async () => {
    console.log(orgAddress)
    console.log(cidValue)
    console.log(orgDesc)
    console.log(orgtime)
  }

  const reportDetails = async () => {
    const conf = await storeFiles();
    // await conf.wait()
    const today = new Date();
    const timeNow = Math.floor((today.getTime()) / 1000);
    const cid_of_report = await storeFiles();
    const signer = await getProviderOrSigner(true);
    const reportContract = new Contract(REGISTER_CONTRACT_ADDRESS, abi, signer);
    const regViolation = await reportContract.registerViolation(query.org_address, cid_of_report, description, query.name, timeNow);
    await regViolation.wait();
    router.replace({ pathname: "/reportedOrgsList" })
    setorgAddress(query.org_address)
    setcidValue(cid_of_report)
    setorgDesc(description)
    setorgtime(timeNow)
    console.log("done")

  }

  return (
    <div className='bg-black flex flex-col items-center justify-center'>
      <h2 className="text-3xl font-extrabold pt-5 text-white">{query.name}</h2>
      <hr className="w-1/4 h-1 mx-auto  bg-gray-600 border-0 rounded my-1 dark:bg-gray-700">
      </hr>

      <div className='w-4/5'>

        <div className="mb-6">
          <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
          <input type="text" id="desc" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Description" required onChange={(e) => (setdescription
            (e.target.value))} />
        </div>
        <div className="flex items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">

            <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
              <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or PDF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={(e) => {
              console.log(e.target.value)
            }} />
          </label>
        </div>

        <button onClick={reportDetails} htmlFor="avatar" className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
        <button onClick={getInfo} htmlFor="avatar" className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Check
        </button>
      </div>



    </div>
  )
}
