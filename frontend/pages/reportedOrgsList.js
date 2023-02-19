import { React, useState, useRef, useEffect } from 'react'
import Organisation from './organistaions.js'
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import VerifiedOrganisation from './verifiedOrgs.js'
import 'flowbite';
import ReportedOrgDet from './reportedOrgDet.js';
import { REGISTER_CONTRACT_ADDRESS, abi } from "../constants/index.js";
import { useRouter } from 'next/router.js';


export default function reportedOrgsList() {
    // const [orgsList, setorgsList] = useState([{ cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upVotes: 26, downVotes: 5, view: 56, name: 'Alexander S. Onassis Foundation' }, { cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upVotes: 26, downVotes: 5, view: 56, name: 'The Alliance for Safe Children' }, { cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upVotes: 26, downVotes: 5, view: 56, name: 'Asbestos Disease Awareness Organization' }, { cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upVotes: 26, downVotes: 5, view: 56, name: 'Cardiac Risk in the Young' }, { cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upVotes: 26, downVotes: 5, view: 56, name: 'The Crohn\'s and Colitis Foundation of Canada' }, { cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upVotes: 26, downVotes: 5, view: 56, name: 'Global Village Foundation' }, { cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upVotes: 26, downVotes: 5, view: 56, name: 'International Republican Institute' }, { cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upVotes: 26, downVotes: 5, view: 56, name: 'Ratanak International' }, { cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upVotes: 26, downVotes: 5, view: 56, name: 'Realdania' }])
    const [orgsList, setorgsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    

    const web3ModalRef = useRef();
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
    }


    const getSetOfReportedOrgs = async () => {
        try {
            const signer = await getProviderOrSigner(true);
            const regContract = new Contract(REGISTER_CONTRACT_ADDRESS, abi, signer);
            const verifiedOrgs = await regContract.getViolationList();

            console.log(verifiedOrgs);
            setorgsList(verifiedOrgs);
        } catch (error) {
            console.error(error);
        }
    };

    // useEffect(() => {
    // }, [orgsList])
    // getSetOfVerifiedOrgs();

    return (
        <div>
        <div className=' bg-black '>
            <button className="bg-white" onClick={getSetOfReportedOrgs}>
                Reg Org.
            </button>
            <div className='h-auto py-3 flex flex-col items-center '>
                <h2 className="text-3xl font-extrabold text-white">List of Reported Organisations </h2>
                <hr className="w-1/4 h-1 mx-auto my-4 bg-gray-600 border-0 rounded md:my-10 dark:bg-gray-700">
                </hr>
                <div className='grid lg:grid-cols-3 md:grid-cols-2'>
                    {
                        orgsList.map((element) => {
                            return <ReportedOrgDet key={element.name} element={element} />
                        })
                    }

                </div>

            </div>
        </div>
    </div>
    )
}
