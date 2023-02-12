import { React, useState, useRef, useEffect } from 'react'
import 'flowbite'
import Organisation from './organistaions.js'
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { REGISTER_CONTRACT_ADDRESS, abi } from '../constants/index.js';

export default function organisationList() {
    const [orgsList, setorgsList] = useState([{ cid: 'bafybeigo3t5tj5cop433hlyszxndw6tar3bgficashpv5iwh7hqkqwpbpy', upVotes: 26, downVotes: 5, view: 56, name: 'Alexander S. Onassis Foundation' }, { cid: 'bafybeigo3t5tj5cop433hlyszxndw6tar3bgficashpv5iwh7hqkqwpbpy', upVotes: 26, downVotes: 5, view: 56, name: 'The Alliance' }, { cid: 'bafybeigo3t5tj5cop433hlyszxndw6tar3bgficashpv5iwh7hqkqwpbpy', upVotes: 26, downVotes: 5, view: 56, name: 'Asbestos Disease Awareness Organization' }, { cid: 'bafybeigo3t5tj5cop433hlyszxndw6tar3bgficashpv5iwh7hqkqwpbpy', upVotes: 26, downVotes: 5, view: 56, name: 'Cardiac Risk in the Young' }, { cid: 'bafybeigo3t5tj5cop433hlyszxndw6tar3bgficashpv5iwh7hqkqwpbpy', upVotes: 26, downVotes: 5, view: 56, name: 'The Crohn\'s and Colitis Foundation of Canada' }, { cid: 'bafybeigo3t5tj5cop433hlyszxndw6tar3bgficashpv5iwh7hqkqwpbpy', upVotes: 26, downVotes: 5, view: 56, name: 'Global Village Foundation' }, { cid: 'bafybeigo3t5tj5cop433hlyszxndw6tar3bgficashpv5iwh7hqkqwpbpy', upVotes: 26, downVotes: 5, view: 56, name: 'International Republican Institute' }, { cid: 'bafybeigo3t5tj5cop433hlyszxndw6tar3bgficashpv5iwh7hqkqwpbpy', upVotes: 26, downVotes: 5, view: 56, name: 'Ratanak International' }, { cid: 'bafybeigo3t5tj5cop433hlyszxndw6tar3bgficashpv5iwh7hqkqwpbpy', upVotes: 26, downVotes: 5, view: 56, name: 'Realdania' }])
    const [loading, setLoading] = useState(false);
    const web3ModalRef = useRef();
    const [walletConnected, setWalletConnected] = useState(false);

    const getProviderOrSigner = async (needSigner) => {
        console.log(REGISTER_CONTRACT_ADDRESS);
        console.log(abi);
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

    const getSetOfUnverifiedOrgs = async () => {
        try {
            const signer = await getProviderOrSigner(true);
            const regContract = new Contract(REGISTER_CONTRACT_ADDRESS, abi, signer);
            const unverifiedOrgs = await regContract.unverifiedOrganizationsList();
            // setLoading(true);

            console.log(unverifiedOrgs);
            setorgsList(unverifiedOrgs);

        } catch (error) {
            console.error(error);
        }
    }
    const connectWallet = async () => {
        try {
            await getProviderOrSigner(false);
            setWalletConnected(true);

            // getSetOfUnverifiedOrgs();
        } catch (err) {
            console.error(err);
        }
    };

    const renderButton = () => {
        if (walletConnected) {

            return (<button className='bg-white' onClick={getSetOfUnverifiedOrgs}>Done.</button>);

        }
        else if (loading) {
            return (<button className='bg-white'>Loading...</button>);
        }
        else {
            return (
                <button onClick={connectWallet} className='bg-white '>
                    Connect your wallet
                </button>
            );
        }
    };
    useEffect(() => {
        if (!walletConnected) {
            web3ModalRef.current = new Web3Modal({
                network: "goerli",
                providerOptions: {},
                disableInjectedProvider: false,
            });
            connectWallet();
        }
    }, [walletConnected]);

    return (
        <div className=' bg-black '>
            <div className='h-auto py-3 flex flex-col items-center '>
                <h2 className="text-3xl font-extrabold text-white">List of Unverified Organisations </h2>
                <hr className="w-1/4 h-1 mx-auto my-4 bg-gray-600 border-0 rounded md:my-10 dark:bg-gray-700">
                </hr>
                <div className='bg-red-200'>
                    {renderButton()}
                </div>

                <ul className="w-3/4 p-12">
                    {orgsList.map((element) => {
                        return <Organisation key={element.name} element={element} />
                    })}
                </ul>
            </div>





        </div >
    )
}
