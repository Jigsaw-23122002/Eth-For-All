import { React, useState, useRef, useEffect, useContext } from "react";
import "flowbite";
import Organisation from "./organistaions.js";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { REGISTER_CONTRACT_ADDRESS, abi } from "../constants/index.js";
import { Eth, EthColored } from "@web3uikit/icons";
import { formatEther } from "ethers/lib/utils.js";

export default function checkStatus() {
    const [orgsList, setorgsList] = useState([]);
    // const [orgsList, setorgsList] = useState([{ doc_cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upvotes: 26, downvotes: 5, view: 56, name: 'Alexander S. Onassis Foundation' }, { doc_cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upvotes: 26, downvotes: 5, view: 56, name: 'The Alliance' }, { doc_cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upvotes: 26, downvotes: 5, view: 56, name: 'Asbestos Disease Awareness Organization' }, { doc_cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upvotes: 26, downvotes: 5, view: 56, name: 'Cardiac Risk in the Young' }, { doc_cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upvotes: 26, downvotes: 5, view: 56, name: 'The Crohn\'s and Colitis Foundation of Canada' }, { doc_cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upvotes: 26, downvotes: 5, view: 56, name: 'Global Village Foundation' }, { doc_cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upvotes: 26, downvotes: 5, view: 56, name: 'International Republican Institute' }, { doc_cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upvotes: 26, downvotes: 5, view: 56, name: 'Ratanak International' }, { doc_cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upvotes: 26, downvotes: 5, view: 56, name: 'Realdania' }])
    const [loading, setLoading] = useState(false);

    const web3ModalRef = useRef();
    let status = false;

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
    }
    const getStatus = async () => {
        const signer = await getProviderOrSigner(true);
        const regContract = new Contract(REGISTER_CONTRACT_ADDRESS, abi, signer);
        const unverifiedOrgs = await regContract.checkVerificationStatus();
        await unverifiedOrgs.wait();
        status = unverifiedOrgs;

    }
    const payStake = async () => {
        const signer = await getProviderOrSigner(true);
        const regContract = new Contract(REGISTER_CONTRACT_ADDRESS, abi, signer);
        const unverifiedOrgs = await regContract.changeStakePaid();
        await unverifiedOrgs.wait();
        ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: '0xCc673eE49Eb916b33919294D39F0518FdC0DaF0f',
                        to: '0x1b01AAbCD468e5a8fb4F0D1f67CC96Fe09c2be59',
                        value: '10000000000000'

                    },
                ],
            })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error(error));


    }

    return (
        <div className="bg-black">
            <div className="flex flex-col items-center">
             <h2 className="text-3xl font-extrabold text-white">
             Check Your Status
        </h2>
        <hr className="w-1/4 h-1 mx-auto my-4 bg-gray-600 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
        
            {status ?
                (<><div>
                    
                </div>
                    <div className="m-3 font-normal text-white">Your Organisation is not been verified yet. Please visit later</div></>
                ) : (<><div>
                
                </div>
                    <div className="m-3 font-normal text-white">Congrats! You have been verified. Now you can stake amount to get registered into the portal</div></>
                )}
                <div className="h-48"></div>
                
            <div>
            <button type="button" onClick={payStake} className="w-auto text-white border border-gray-200  bg-transparent hover:bg-gradient-to-r from-purple-500 to-pink-500  focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Pay Stake</button>
            <button type="button" onClick={getStatus} className="w-auto text-white border border-gray-200  bg-transparent hover:bg-gradient-to-r from-purple-500 to-pink-500  focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Get Status</button>
            </div>
        </div>
        </div>
    )
}
