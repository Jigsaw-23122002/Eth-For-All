import { React, useState, useRef, useEffect,useContext } from 'react'
import 'flowbite'
import Organisation from './organistaions.js'
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { REGISTER_CONTRACT_ADDRESS, abi } from '../constants/index.js';
import { ConnectButton } from '@web3uikit/web3';

export default function organisationList() {
    const [orgsList, setorgsList] = useState([])
    // const [orgsList, setorgsList] = useState([{ doc_cid: 'bafybeigo3t5tj5cop433hlyszxndw6tar3bgficashpv5iwh7hqkqwpbpy', upvotes: 26, downvotes: 5, view: 56, name: 'Alexander S. Onassis Foundation' }, { doc_cid: 'bafybeigo3t5tj5cop433hlyszxndw6tar3bgficashpv5iwh7hqkqwpbpy', upvotes: 26, downvotes: 5, view: 56, name: 'The Alliance' }, { doc_cid: 'bafybeigo3t5tj5cop433hlyszxndw6tar3bgficashpv5iwh7hqkqwpbpy', upvotes: 26, downvotes: 5, view: 56, name: 'Asbestos Disease Awareness Organization' }, { doc_cid: 'bafybeigo3t5tj5cop433hlyszxndw6tar3bgficashpv5iwh7hqkqwpbpy', upvotes: 26, downvotes: 5, view: 56, name: 'Cardiac Risk in the Young' }, { doc_cid: 'bafybeigo3t5tj5cop433hlyszxndw6tar3bgficashpv5iwh7hqkqwpbpy', upvotes: 26, downvotes: 5, view: 56, name: 'The Crohn\'s and Colitis Foundation of Canada' }, { doc_cid: 'bafybeigo3t5tj5cop433hlyszxndw6tar3bgficashpv5iwh7hqkqwpbpy', upvotes: 26, downvotes: 5, view: 56, name: 'Global Village Foundation' }, { doc_cid: 'bafybeigo3t5tj5cop433hlyszxndw6tar3bgficashpv5iwh7hqkqwpbpy', upvotes: 26, downvotes: 5, view: 56, name: 'International Republican Institute' }, { doc_cid: 'bafybeigo3t5tj5cop433hlyszxndw6tar3bgficashpv5iwh7hqkqwpbpy', upvotes: 26, downvotes: 5, view: 56, name: 'Ratanak International' }, { doc_cid: 'bafybeigo3t5tj5cop433hlyszxndw6tar3bgficashpv5iwh7hqkqwpbpy', upvotes: 26, downvotes: 5, view: 56, name: 'Realdania' }])
    const [loading, setLoading] = useState(false);
    
    const web3ModalRef = useRef();
    const [walletConnected, setWalletConnected] = useState(false);

    const getProviderOrSigner = async (needSigner) => {
       
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

    const getReg = async () => {
        try {
            const signer = await getProviderOrSigner(true);
            const regContract = new Contract(REGISTER_CONTRACT_ADDRESS, abi, signer);
            console.log("Inside the contract methods")
            const today = new Date();
            const timeNow = Math.floor((today.getTime()) / 1000);
            console.log(timeNow);
            const getregistered = await regContract.registerOrg("0xCc673eE49Eb916b33919294D39F0518FdC0DaF0f", "Alexander S. widugwbdubej  ", "bafybeigo3t5tj5cop433hlyszxndw6tar3bgficashpv5iwh7hqkqwpbpy", 'Unfortunately, factors outside of anyone’s control make it hard for some people to reach their potential: things like when they were born, who their parents are, where they grew up, whether they are a boy or a girl.We wake up every day determined to use our resources to create a world where everyone has the opportunity to lead a healthy and productive life. Most importantly, we believe this: All lives have equal value.', timeNow);
            console.log("Completed reg")
            const unverifiedOrgDet = await getSetOfUnverifiedOrgs();
            console.log("Done reg")

        } catch (error) {

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

            return (<>
                <button className='bg-white' onClick={getReg}>Reg Org.</button>
                <button className='bg-white' onClick={getSetOfUnverifiedOrgs}>Unverified Orgs.</button>
            </>);
        }
        else if (loading) {
            return (<button className='bg-white'>Loading...</button>);
        }
        else {
            return (
                <ConnectButton></ConnectButton>
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
