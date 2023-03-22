import { React, useState } from 'react'
import { useRouter } from "next/router";
import axios from 'axios';

export default function orgDetails() {
    const router = useRouter();
    const query = router.query;
    const fileName = 'pic.jpg';
    const tableTitle = [ 'Receiver Address', 'Token ID', ' Transaction Hash', 'Block Timestamp', 'Block Number']

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
            setverifiedOrgDetails((prev)=>({
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



            <div>
                    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table class="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        {tableTitle.map((ele) => {
                                            return <th
                                                class="px-5 py-3 border-b-2 border-gray-800 bg-gray-700 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider">{ele}
                                            </th>
                                        })}

                                    </tr>
                                </thead>

                                <tbody>
                                    {(verifiedOrgDetails.transactions).map((ele) => {
                                        return <tr>
                                            {/* <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div class="flex items-center">
                                                    <div class="flex-shrink-0 w-10 h-10">
                                                        <img class="w-full h-full rounded-full"
                                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                                            alt="" />
                                                    </div>
                                                    <div class="ml-3">
                                                        <p class="text-gray-900 whitespace-no-wrap">
                                                            {ele.transactionHash}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td> */}
                                            <td class="px-5 py-5 border-b border-gray-700 bg-gray-800 text-sm">
                                                <p class="text-gray-200 whitespace-no-wrap">{ele.to}</p>
                                            </td>
                                            <td class="px-5 py-5 border-b border-gray-700 bg-gray-800  text-sm">
                                                <p class="text-gray-200 whitespace-no-wrap">
                                                {ele.tokenId}
                                                </p>
                                            </td>
                                            <td class="px-5 py-5 border-b border-gray-700 bg-gray-800  text-sm">
                                                <p class="text-gray-200 whitespace-no-wrap">
                                                {ele.transactionHash}
                                                </p>
                                            </td>
                                            <td class="px-5 py-5 border-b  border-gray-700 bg-gray-800  text-sm">
                                                <span
                                                    class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                    <span aria-hidden
                                                        class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                    <span class="relative">{ele.blockTimestamp}</span>
                                                </span>
                                            </td>
                                            <td class="px-5 py-5 border-b  border-gray-700 bg-gray-800  text-sm">
                                                <span
                                                    class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                    <span aria-hidden
                                                        class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                    <span class="relative">{ele.blockNumber}</span>
                                                </span>
                                            </td>
                                        </tr>
                                    })}


                                </tbody>
                            </table>
                            <div
                                class="px-5 py-5 border-gray-900 bg-gray-700 border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                                <span class="text-xs xs:text-sm text-gray-900">
                                    Showing 1 to 4 of 50 Entries
                                </span>
                                <div class="inline-flex mt-2 xs:mt-0">
                                    <button
                                        class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                                        Prev
                                    </button>
                                    &nbsp; &nbsp;
                                    <button
                                        class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
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