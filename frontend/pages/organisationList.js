import { React, useState, useRef, useEffect, useContext } from "react";
import "flowbite";
import Organisation from "./organistaions.js";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { REGISTER_CONTRACT_ADDRESS, abi } from "../constants/index.js";
import { ConnectButton } from "@web3uikit/web3";
import { useWeb3Contract } from "react-moralis";
import { Link } from "react-router-dom";

export default function organisationList() {
  const [orgsList, setorgsList] = useState([]);
  // const [orgsList, setorgsList] = useState([{ doc_cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upvotes: 26, downvotes: 5, view: 56, name: 'Alexander S. Onassis Foundation' }, { doc_cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upvotes: 26, downvotes: 5, view: 56, name: 'The Alliance' }, { doc_cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upvotes: 26, downvotes: 5, view: 56, name: 'Asbestos Disease Awareness Organization' }, { doc_cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upvotes: 26, downvotes: 5, view: 56, name: 'Cardiac Risk in the Young' }, { doc_cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upvotes: 26, downvotes: 5, view: 56, name: 'The Crohn\'s and Colitis Foundation of Canada' }, { doc_cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upvotes: 26, downvotes: 5, view: 56, name: 'Global Village Foundation' }, { doc_cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upvotes: 26, downvotes: 5, view: 56, name: 'International Republican Institute' }, { doc_cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upvotes: 26, downvotes: 5, view: 56, name: 'Ratanak International' }, { doc_cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upvotes: 26, downvotes: 5, view: 56, name: 'Realdania' }])
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
  }
  const getReg = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const regContract = new Contract(REGISTER_CONTRACT_ADDRESS, abi, signer);
      console.log("Inside the contract methods")
      const today = new Date();
      const timeNow = Math.floor((today.getTime()) / 1000);
      console.log(timeNow);
      const getregistered = await regContract.registerOrg("Ananya  ", "bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee", 'Unfortunately, factors outside of anyone’s control make it hard for some people to reach their potential: things like when they were born, who their parents are, where they grew up, whether they are a boy or a girl.We wake up every day determined to use our resources to create a world where everyone has the opportunity to lead a healthy and productive life. Most importantly, we believe this: All lives have equal value.', timeNow);
      console.log("Completed reg")
      await getregistered.wait()
      const unverifiedOrgDet = await getSetOfUnverifiedOrgs();
      console.log("Done reg")
    } catch (error) {

    }

  };

  const getSetOfUnverifiedOrgs = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const regContract = new Contract(REGISTER_CONTRACT_ADDRESS, abi, signer);
      const unverifiedOrgs = await regContract.unverifiedOrganizationsList();

      console.log("Inside ")
      console.log(unverifiedOrgs);
      setorgsList(unverifiedOrgs);
    } catch (error) {
      console.error(error);
    }
  };
  // const getOwner = async () => {
  //     try {
  //         const signer = await getProviderOrSigner(true);
  //         const regContract = new Contract(REGISTER_CONTRACT_ADDRESS, abi, signer);
  //         const unverifiedOrgs = await regContract.unverifiedOrganizationsList();
  //         // setLoading(true);
  //         console.log(unverifiedOrgs);

  //     } catch (error) {
  //         console.error(error);
  //     }
  // }
  const getViews = async () => {
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
  };
  // const getReg = async () => {
  //   try {
  //     const signer = await getProviderOrSigner(true);
  //     const regContract = new Contract(REGISTER_CONTRACT_ADDRESS, abi, signer);
  //     console.log("Inside the contract methods");
  //     const today = new Date();
  //     const timeNow = Math.floor(today.getTime() / 1000);
  //     console.log(timeNow);
  //     const getregistered = await regContract.registerOrg(
  //       "0xCc673eE49Eb916b33919294D39F0518FdC0DaF0f",
  //       "Ketaki  ",
  //       "bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee",
  //       "Unfortunately, factors outside of anyone’s control make it hard for some people to reach their potential: things like when they were born, who their parents are, where they grew up, whether they are a boy or a girl.We wake up every day determined to use our resources to create a world where everyone has the opportunity to lead a healthy and productive life. Most importantly, we believe this: All lives have equal value.",
  //       timeNow
  //     );
  //     console.log("Completed reg");
  //     await getregistered.wait();
  //     const unverifiedOrgDet = await getSetOfUnverifiedOrgs();
  //     console.log("Done reg");
  //   } catch (error) {}
  // };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner(false);
      setWalletConnected(true);

      // getSetOfUnverifiedOrgs();
    } catch (err) {
      console.error(err);
    }
  };

  const getUnverifiedList = async () => {
    console.log(data);
  };

  const renderButton = () => {
    if (walletConnected) {
      return (
        <>


          <button className="bg-gray-900" onClick={getSetOfUnverifiedOrgs}>
            Unverified Orgs.
          </button>
          {/* {data && <pre className='text-white'>{JSON.stringify(data)}</pre>} */}
        </>
      );
    } else if (loading) {
      return <button className="bg-white">Loading...</button>;
    } else {
      return <ConnectButton></ConnectButton>;
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
  // getSetOfUnverifiedOrgs();
  // useEffect(() => {
  // getSetOfUnverifiedOrgs();
  // });

  return (
    <div className=" bg-black ">
      <div className="h-auto py-3 flex flex-col items-center ">
        <h2 className="text-3xl font-extrabold text-white">
          List of Unverified Organisations{" "}
        </h2>
        <hr className="w-1/4 h-1 mx-auto my-4 bg-gray-600 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
        {/* <div className='bg-red-200'> */}
        {renderButton()}
        {/* </div> */}

        <ul className="w-3/4 p-12">

          <li className="py-3 sm:py-4 w-full">
            <div className='w-full'>
              <div className="relative group w-auto">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 0 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200">


                </div>
                <div className='relative px-7 py-4 bg-black rounded-lg leading-none flex  divide-x divide-gray-600'>
                  <span className="flex items-center space-x-5 px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-pink-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>


                  </span>
                  <span className='px-6 pl-6 text-gray-100 flex flex-rows items-center'>
                    Org 2                     </span>
                  <span className='px-6  text-gray-100 flex flex-rows items-center'>
                    <div className='h-6 w-full px-2 text-lg '>{3}</div>
                    {/* <div className='h-6 w-full text-lg sm:visible'>{element.upVotes} &uarr;</div> */}
                    <div>
                      <svg className="w-6 h-6  dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"></path></svg>
                    </div>

                  </span>
                  <span className='px-6  text-gray-100 flex flex-rows items-center'>
                    <div className='h-6 w-full px-2 text-lg'>{5}</div>
                    <div><svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"></path></svg>
                    </div>
                  </span>
                  <span className='px-6  text-gray-100 flex flex-rows items-center'>
                    <div className='h-6 w-full px-2 text-lg'>{4}</div>
                    <div className='p-1'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    </div>



                  </span>

                  <span className='flex flex-rows items-center pl-6 text-indigo-400 group-hover:text-gray-100 transition duration-200 group-hover:scale-125'>

                    View &rarr;
                  </span>
                </div>
              </div>

            </div>
          </li>
          <li className="py-3 sm:py-4 w-full">
            <div className='w-full'>
              <div className="relative group w-auto">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 0 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200">


                </div>
                <div className='relative px-7 py-4 bg-black rounded-lg leading-none flex  divide-x divide-gray-600'>
                  <span className="flex items-center space-x-5 px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-pink-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>


                  </span>
                  <span className='px-6 pl-6 text-gray-100 flex flex-rows items-center'>
                    Org 3                      </span>
                  <span className='px-6  text-gray-100 flex flex-rows items-center'>
                    <div className='h-6 w-full px-2 text-lg '>{6}</div>
                    {/* <div className='h-6 w-full text-lg sm:visible'>{element.upVotes} &uarr;</div> */}
                    <div>
                      <svg className="w-6 h-6  dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"></path></svg>
                    </div>

                  </span>
                  <span className='px-6  text-gray-100 flex flex-rows items-center'>
                    <div className='h-6 w-full px-2 text-lg'>{3}</div>
                    <div><svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"></path></svg>
                    </div>
                  </span>
                  <span className='px-6  text-gray-100 flex flex-rows items-center'>
                    <div className='h-6 w-full px-2 text-lg'>{5}</div>
                    <div className='p-1'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    </div>



                  </span>

                  <span className='flex flex-rows items-center pl-6 text-indigo-400 group-hover:text-gray-100 transition duration-200 group-hover:scale-125'>

                    View &rarr;
                  </span>
                </div>
              </div>

            </div>
          </li>
          <li className="py-3 sm:py-4 w-full">
            <div className='w-full'>
              <div className="relative group w-auto">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 0 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200">


                </div>
                <div className='relative px-7 py-4 bg-black rounded-lg leading-none flex  divide-x divide-gray-600'>
                  <span className="flex items-center space-x-5 px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-pink-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>


                  </span>
                  <span className='px-6 pl-6 text-gray-100 flex flex-rows items-center'>
                    Org 4                     </span>
                  <span className='px-6  text-gray-100 flex flex-rows items-center'>
                    <div className='h-6 w-full px-2 text-lg '>{8}</div>
                    {/* <div className='h-6 w-full text-lg sm:visible'>{element.upVotes} &uarr;</div> */}
                    <div>
                      <svg className="w-6 h-6  dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"></path></svg>
                    </div>

                  </span>
                  <span className='px-6  text-gray-100 flex flex-rows items-center'>
                    <div className='h-6 w-full px-2 text-lg'>{5}</div>
                    <div><svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"></path></svg>
                    </div>
                  </span>
                  <span className='px-6  text-gray-100 flex flex-rows items-center'>
                    <div className='h-6 w-full px-2 text-lg'>{6}</div>
                    <div className='p-1'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    </div>



                  </span>

                  <span className='flex flex-rows items-center pl-6 text-indigo-400 group-hover:text-gray-100 transition duration-200 group-hover:scale-125'>

                    View &rarr;
                  </span>
                </div>
              </div>

            </div>
          </li>
          {orgsList.map((element) => {
            return <Organisation key={element.name} element={element} />;
          })}
        </ul>
      </div>
    </div>
  );
}
