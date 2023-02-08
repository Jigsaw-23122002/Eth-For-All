import React from 'react'

export default function verfiedOrgs({ element }) {
    return (
        <div className='m-6'>
            <div className="relative group  ">
            <div className="absolute -inset-0 bg-gradient-to-r from-blue-600 to-gray-600 0 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200">


            </div>
            <div class="max-w-sm h-full p-6 m-2 relative bg-black rounded-lg leading-none">
                <div>
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-white">{element.name}</h5>
                </div>
                <p class="mb-3 font-normal text-white">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <button href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-transparent border border-white rounded-lg group-hover:bg-gradient-to-r from-blue-600 to-gray-600 ">
                    Read more
                    <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            </div>
        </div>
        </div>
    )
}
