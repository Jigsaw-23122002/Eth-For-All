import { React, useState } from 'react'
import Organisation from './organistaions.js'
import VerifiedOrganisation from './verfiedOrgs.js'
export default function verifiedOrgList() {
    const [orgsList, setorgsList] = useState([{ cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upVotes: 26, downVotes: 5, view: 56, name: 'Alexander S. Onassis Foundation' }, { cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upVotes: 26, downVotes: 5, view: 56, name: 'The Alliance for Safe Children' }, { cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upVotes: 26, downVotes: 5, view: 56, name: 'Asbestos Disease Awareness Organization' }, { cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upVotes: 26, downVotes: 5, view: 56, name: 'Cardiac Risk in the Young' }, { cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upVotes: 26, downVotes: 5, view: 56, name: 'The Crohn\'s and Colitis Foundation of Canada' }, { cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upVotes: 26, downVotes: 5, view: 56, name: 'Global Village Foundation' }, { cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upVotes: 26, downVotes: 5, view: 56, name: 'International Republican Institute' }, { cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upVotes: 26, downVotes: 5, view: 56, name: 'Ratanak International' }, { cid: 'bafybeieo76izxgib3xu5bwsrjnoolylmp2pdoigkmhomqe5dnbysmisfee', upVotes: 26, downVotes: 5, view: 56, name: 'Realdania' }])

    return (
        <div>
            <div className=' bg-black '>
                <div className='h-auto py-3 flex flex-col items-center '>
                    <h2 className="text-3xl font-extrabold text-white">List of Verified Organisations </h2>
                    <hr className="w-1/4 h-1 mx-auto my-4 bg-gray-600 border-0 rounded md:my-10 dark:bg-gray-700">
                    </hr>
                    <div className='grid lg:grid-cols-3 md:grid-cols-2'>
                        <div className='m-6'>
                            <div className="relative group h-full ">
                                <div className="absolute -inset-0 bg-gradient-to-r from-blue-600 to-gray-600 0 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200">
                                </div>
                                <div className="max-w-sm h-full p-6 m-2 my-5 relative bg-black rounded-lg leading-none">
                                    <div>
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Org new</h5>
                                    </div>
                                    <div className="mb-3 font-normal text-white">Charitable giving can be a responsibility in many religions. This kind of charity is called almsgiving or alms. The word "charity" comes from the Latin "caritas" meaning Christian love. In Islam, it is called zakat. It is one of the five most important duties of being a Muslim, and in Judaism it is "tzedakah". 
                                    </div>

                                    <button className="absolute m-2 bottom-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-transparent border border-white rounded-lg group-hover:bg-gradient-to-r from-blue-600 to-gray-600 ">
                                        Read More
                                        <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='m-6'>
                            <div className="relative group h-full ">
                                <div className="absolute -inset-0 bg-gradient-to-r from-blue-600 to-gray-600 0 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200">
                                </div>
                                <div className="max-w-sm h-full p-6 m-2 my-5 relative bg-black rounded-lg leading-none">
                                    <div>
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Org Val 2</h5>
                                    </div>
                                    <div className="mb-3 font-normal text-white">Most charities are concerned with providing basic needs, such as food, water, clothing, health care and shelter. The most common form of charity is donating money. The money is then used to buy these basic needs. However, there are many other actions that may be performed as charity, such as teaching orphans, donating blood, or money to help fund medical research. </div>

                                    <button className="absolute m-2 bottom-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-transparent border border-white rounded-lg group-hover:bg-gradient-to-r from-blue-600 to-gray-600 ">
                                        Read More
                                        <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='m-6'>
                            <div className="relative group h-full ">
                                <div className="absolute -inset-0 bg-gradient-to-r from-blue-600 to-gray-600 0 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200">
                                </div>
                                <div className="max-w-sm h-full p-6 m-2 my-5 relative bg-black rounded-lg leading-none">
                                    <div>
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Org Val</h5>
                                    </div>
                                    <div className="mb-3 font-normal text-white">Poor, sick or injured people are generally considered the proper people to whom charity should be given. When such people are not supported, they often begin begging, which is directly asking for help from people they do not know.[1] Others may rely on support from charitable organizations. These organizations collect money and goods and then give them to those in need.</div>

                                    <button className="absolute m-2 bottom-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-transparent border border-white rounded-lg group-hover:bg-gradient-to-r from-blue-600 to-gray-600 ">
                                        Read More
                                        <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {
                            orgsList.map((element) => {
                                return <VerifiedOrganisation key={element.name} element={element} />
                            })
                        }

                    </div>

                </div>
            </div>
        </div>
    )
}
