import React from 'react'
import 'flowbite';
import { useRouter } from 'next/router';

export default function reportedOrgDet({ element }) {
    const data = {
        id: element.id.toString(),
        org_address: element.org_address,
        doc_cid: element.doc_cid,
        desc: element.desc,
        name: element.name,
        upvotes: element.upvotes.toString(),
        downvotes: element.downvotes.toString(),
        upvoters: element.upvoters,
        downvoters: element.downvoters,
        isOpen: element.isOpen,
        start_time: element.start_time.toString(),
        end_time: element.end_time.toString(),
        isViolated: element.isViolated
    }
    const router = useRouter();
    return (
        <div className='m-6'>
            <div className="relative group h-full ">
                <div className="absolute -inset-0 bg-gradient-to-r from-blue-600 to-gray-600 0 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200">
                </div>
                <div className="max-w-sm h-full p-6 m-2 relative bg-black rounded-lg leading-none">
                    <div>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{element.name}</h5>
                    </div>
                    <p className="mb-12 font-normal text-white">{element.desc} </p>
                    <button onClick={() => router.push({ pathname: '/reportedOrg', query: data })} className="absolute bottom-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-transparent border border-white rounded-lg group-hover:bg-gradient-to-r from-blue-600 to-gray-600 ">
                        Read More
                        <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
