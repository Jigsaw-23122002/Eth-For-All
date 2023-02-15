import { React, useState, useRef, useEffect } from 'react'
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import { providers, Contract, BigNumber } from "ethers";
import { REGISTER_CONTRACT_ADDRESS, abi } from '../constants/index.js';

export default function viewDocument() {
    const router = useRouter();
    const query = router.query;
    const [loading, setLoading] = useState(false);
    const [org_upvotes, setorg_upvotes] = useState(query.upvotes)
    const [org_downvotes, setorg_downvotes] = useState(query.downvotes)
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
    const upVoteOrg = async () => {
        const today = new Date();
        const timeNow = Math.floor((today.getTime()) / 1000);
        const signer = await getProviderOrSigner(true);
        const voteContract = new Contract(REGISTER_CONTRACT_ADDRESS, abi, signer);
        const valUpVotes = await voteContract.upVote(query.org_address, timeNow);
        await valUpVotes.wait(3);
        const val = await voteContract.countOfUpvotes(query.org_address)
        // await val.wait(2);
        console.log(val._isBigNumber);
        console.log(val.toString());
        setorg_upvotes(val.toString());
       
    }
    const downVoteOrg = async () => {
        const today = new Date();
        const timeNow = Math.floor((today.getTime()) / 1000);
        const signer = await getProviderOrSigner(true);
        const voteContract = new Contract(REGISTER_CONTRACT_ADDRESS, abi, signer);
        const valUpVotes = await voteContract.downVote(query.org_address, timeNow);
        await valUpVotes.wait(3);
        const val = await voteContract.countOfDownvotes(query.org_address)
        // await val.wait(2);
        console.log(val._isBigNumber);
        console.log(val.toString());
        setorg_downvotes(val.toString());
       
    }
    // useEffect(() => {
        
    //     testOp();
        
    // }, [org_upvotes]);

    // const testOp = async() =>{
    //     const signer = await getProviderOrSigner(true);
    //     const voteContract = new Contract(REGISTER_CONTRACT_ADDRESS, abi, signer)
    //     const val = await voteContract.countOfUpvotes(query.org_address)
    //     console.log(val._isBigNumber);
    //     console.log(val.toString());
    //     setorg_upvotes(val.toString());
    //     console.log(org_upvotes)
    // }
    const fileName = "test_file.pdf"
    // https://bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee.ipfs.w3s.link/
    return (
        <div className='bg-black flex flex-col items-center '>

            <h2 className="text-3xl font-extrabold pt-5 text-white">{query.name} </h2>
            <hr className="w-1/4 h-1 mx-auto  bg-gray-600 border-0 rounded my-1 dark:bg-gray-700">
            </hr>
            <div className='p-6 grid grid-cols-4'>
                <embed src={`https://${query.doc_cid}.ipfs.w3s.link/${fileName}`} className="col-span-3 w-full h-screen rounded-lg"></embed>
                <div className=" m-6 w-4/5 h-3/4 p-6 grid grid-rows-6 bg-transparent">
                    <button type="button" onClick={upVoteOrg} className="w-auto text-white border border-gray-200  bg-transparent hover:bg-gradient-to-r from-purple-500 to-pink-500  focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Up Vote &uarr;</button>
                    <button type="button" onClick={downVoteOrg} className="w-auto text-white border border-gray-200  bg-transparent hover:bg-gradient-to-r from-purple-500 to-pink-500  focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Down Vote &darr; </button>
                    <div className='row-span-4 grid grid-rows-4 w-full items-center border border-gray-200  bg-transparent rounded-lg '>
                        <p className='text-white text-center w-full'>
                            Stats
                        </p>
                        <div className='px-6  text-gray-100 grid grid-cols-2 '>
                            <p className='h-6 text-lg'>{org_upvotes}</p>
                            <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"></path></svg>
                        </div>
                        <div className='px-6  text-gray-100 grid grid-cols-2'>
                            <p className='h-6 text-lg'>{org_downvotes}</p>
                            <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"></path></svg>

                        </div>
                        <div className='px-6  text-gray-100 grid grid-cols-2'>
                            <p className='h-6 text-lg'>{query.view}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                        </div>
                    </div>


                </div>


            </div>


        </div>
    )
}
