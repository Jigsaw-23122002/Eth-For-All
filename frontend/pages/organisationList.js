import { React, useState } from 'react'
import 'flowbite'
import Organisation from './organistaions.js'

export default function organisationList() {
    const [orgsList, setorgsList] = useState([{cid:'bafybeigo3t5tj5cop433hlyszxndw6tar3bgficashpv5iwh7hqkqwpbpy', upVotes:26,downVotes:5,view:56,name:'Alexander S. Onassis Foundation'}, {cid:'bafybeigo3t5tj5cop433hlyszxndw6tar3bgficashpv5iwh7hqkqwpbpy', upVotes:26,downVotes:5,view:56,name:'The Alliance for Safe Children'}, {cid:'bafybeigo3t5tj5cop433hlyszxndw6tar3bgficashpv5iwh7hqkqwpbpy', upVotes:26,downVotes:5,view:56,name:'Asbestos Disease Awareness Organization'}, {cid:'bafybeigo3t5tj5cop433hlyszxndw6tar3bgficashpv5iwh7hqkqwpbpy', upVotes:26,downVotes:5,view:56,name:'Cardiac Risk in the Young'}, {cid:'bafybeigo3t5tj5cop433hlyszxndw6tar3bgficashpv5iwh7hqkqwpbpy', upVotes:26,downVotes:5,view:56,name:'The Crohn\'s and Colitis Foundation of Canada'}, {cid:'bafybeigo3t5tj5cop433hlyszxndw6tar3bgficashpv5iwh7hqkqwpbpy', upVotes:26,downVotes:5,view:56,name:'Global Village Foundation'}, {cid:'bafybeigo3t5tj5cop433hlyszxndw6tar3bgficashpv5iwh7hqkqwpbpy', upVotes:26,downVotes:5,view:56,name:'International Republican Institute'}, {cid:'bafybeigo3t5tj5cop433hlyszxndw6tar3bgficashpv5iwh7hqkqwpbpy', upVotes:26,downVotes:5,view:56,name:'Ratanak International'}, {cid:'bafybeigo3t5tj5cop433hlyszxndw6tar3bgficashpv5iwh7hqkqwpbpy', upVotes:26,downVotes:5,view:56,name:'Realdania'}])
    return (
        <div className=' bg-black '>
            <div className='h-auto py-3 flex flex-col items-center '>
                <h2 className="text-3xl font-extrabold text-white">List of Unverified Organisations </h2>
                <hr className="w-1/4 h-1 mx-auto my-4 bg-gray-600 border-0 rounded md:my-10 dark:bg-gray-700">
                </hr>
                <ul className="w-full p-5">
                    {orgsList.map((element) => {
                        return <Organisation element={element} />
                    })}




                </ul>
            </div>





        </div >
    )
}
