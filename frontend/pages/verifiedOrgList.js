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
