import { React, useState } from 'react'
import { useRouter } from "next/router";
import axios from 'axios';
import 'flowbite'
import ReportOrg from './reportOrg.js';

export default function orgDetails() {
    const router = useRouter();
    const query = router.query;
    const fileName = 'pic.jpg';
    const tableTitle = ['Receiver Address', 'Token ID', ' Transaction Hash', 'Block Timestamp', 'Block Number']

    const [verifiedOrgDetails, setverifiedOrgDetails] = useState({ pic_cid: 'bafybeidy6jb3q4etakqsgizfnp2pp7novz6i457lwq5l3kg2stp5kcof7i', details: ['Unfortunately, factors outside of anyone’s control make it hard for some people to reach their potential: things like when they were born, who their parents are, where they grew up, whether they are a boy or a girl.We wake up every day determined to use our resources to create a world where everyone has the opportunity to lead a healthy and productive life. Most importantly, we believe this: All lives have equal value.', ' That’s why we made the decision to donate our wealth from Microsoft to help others.The challenge when we started out was how to do that in a meaningful and high-impact way. We were drawn to things that sprang from our experience, so we began donating PCs to public libraries across the United States to give everyone a chance to use one.', ' As we read and traveled more, we also became curious about inequalities further from home.One day, we read a newspaper article about millions of children in poor countries who die from diseases, such as diarrhea and pneumonia, that were easily treated in wealthier countries. That blew our minds. As new parents it hit us especially hard. If there\'s anything worse than the death of a child, we said to each other, then surely, it’s the preventable death of a child.'], transactions: [{ to: '0x4A9CF09B996F0Ddf5498201f1D6cb8f6C88e3e0e', from: '0xCc673eE49Eb916b33919294D39F0518FdC0DaF0f', amt: '200' }, { to: '0x4A9CF09B996F0Ddf5498201f1D6cb8f6C88e3e0e', from: '0xCc673eE49Eb916b33919294D39F0518FdC0DaF0f', amt: '200' }, { to: '0x4A9CF09B996F0Ddf5498201f1D6cb8f6C88e3e0e', from: '0xCc673eE49Eb916b33919294D39F0518FdC0DaF0f', amt: '200' }, { to: '0x4A9CF09B996F0Ddf5498201f1D6cb8f6C88e3e0e', from: '0xCc673eE49Eb916b33919294D39F0518FdC0DaF0f', amt: '200' }, { to: '0x4A9CF09B996F0Ddf5498201f1D6cb8f6C88e3e0e', from: '0xCc673eE49Eb916b33919294D39F0518FdC0DaF0f', amt: '200' }] })
    const getTransactionDetails = async () => {
        try {

            const result = await axios.post('https://api.studio.thegraph.com/query/41847/test/0.69.042', {
                query: `query MyQuery {
              transfers {
                from
                id
                to
                tokenId
                transactionHash
                blockTimestamp
                blockNumber
              }
            }`});
            setverifiedOrgDetails((prev) => ({
                ...prev,
                transactions: result.data.data.transfers

            }));

        } catch (error) {
            console.error(error)
        }

    }
    getTransactionDetails()
    return (



        <div className='bg-black p-16'>





            <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                    <div className="md:5/12 lg:w-5/12">
                        <img className='rounded-lg' src={`https://${verifiedOrgDetails.pic_cid}.ipfs.w3s.link/${fileName}`} alt="image" loading="lazy" width="" height="" />
                    </div>
                    <div className="md:7/12 lg:w-6/12">
                        <h2 className="text-3xl font-extrabold pt-5 text-white text-center">{query.name} </h2>
                        <hr className="w-1/4 h-1 mx-auto  bg-gray-600 border-0 rounded mt-2 mb-5 dark:bg-gray-700">
                        </hr>
                        <div className='mt-6 text-gray-100 '>
                            {(verifiedOrgDetails.details).map((ele) => {
                                return <div key={ele} className='text-center'>&emsp; {ele}</div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-contact" data-drawer-show="drawer-contact" aria-controls="drawer-contact">

                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Report Organisation
                    </span>
                </button>
            </div>
            <div className="text-center">
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800" type="button">

                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Donate to Organisation
                    </span>
                </button>
            </div>

            <div id="drawer-contact" className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-black w-80 dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-contact-label">
                <h5 id="drawer-label" className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"><svg className="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>Contact us</h5>
                <button type="button" data-drawer-hide="drawer-contact" aria-controls="drawer-contact" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Close menu</span>
                </button>
                <ReportOrg query={query} />
            </div>



            <div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    {tableTitle.map((ele) => {
                                        return <th
                                            className="px-5 py-3 border-b-2 border-gray-800 bg-gray-700 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider">{ele}
                                        </th>
                                    })}

                                </tr>
                            </thead>

                            <tbody>
                                {(verifiedOrgDetails.transactions).map((ele) => {
                                    return <tr>
                                        {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 w-10 h-10">
                                                        <img className="w-full h-full rounded-full"
                                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                                            alt="" />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {ele.transactionHash}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td> */}
                                        <td className="px-5 py-5 border-b border-gray-700 bg-gray-800 text-sm">
                                            <p className="text-gray-200 whitespace-no-wrap">{ele.to}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-700 bg-gray-800  text-sm">
                                            <p className="text-gray-200 whitespace-no-wrap">
                                                {ele.tokenId}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-700 bg-gray-800  text-sm">
                                            <p className="text-gray-200 whitespace-no-wrap">
                                                {ele.transactionHash}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b  border-gray-700 bg-gray-800  text-sm">
                                            <span
                                                className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                <span aria-hidden
                                                    className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                <span className="relative">{ele.blockTimestamp}</span>
                                            </span>
                                        </td>
                                        <td className="px-5 py-5 border-b  border-gray-700 bg-gray-800  text-sm">
                                            <span
                                                className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                <span aria-hidden
                                                    className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                <span className="relative">{ele.blockNumber}</span>
                                            </span>
                                        </td>
                                    </tr>
                                })}


                            </tbody>
                        </table>
                        <div
                            className="px-5 py-5 border-gray-900 bg-gray-700 border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                            <span className="text-xs xs:text-sm text-gray-900">
                                Showing 1 to 4 of 50 Entries
                            </span>
                            <div className="inline-flex mt-2 xs:mt-0">
                                <button
                                    className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                                    Prev
                                </button>
                                &nbsp; &nbsp;
                                <button
                                    className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
