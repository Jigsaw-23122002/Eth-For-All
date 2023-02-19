import { React, useState } from 'react'
import { Web3Storage } from 'web3.storage'

export default function about() {
    const [cidValue, setcidValue] = useState("")
    function getAccessToken() {
        return process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN
    }
    function getFiles() {
        const fileInput = document.querySelector('input[type="file"]')
        return fileInput.files
    }
    function makeStorageClient() {
        return new Web3Storage({ token: getAccessToken() })
    }
    async function storeFiles() {
        let files = getFiles()
        const client = makeStorageClient()
        const cid = await client.put(files)
        console.log('stored files with cid:', cid)
        setcidValue(cid)
        return cid
    }
    async function retrieveFiles() {

        const client = makeStorageClient()
        const res = await client.get(cidValue)
        console.log(`Got a response! [${res.status}] ${res.statusText}`)
        if (!res.ok) {
            throw new Error(`failed to get ${cidValue} - [${res.status}] ${res.statusText}`)
        }

        // unpack File objects from the response
        const files = await res.files()
        for (const file of files) {
            console.log(`${file.cid} -- ${file.path} -- ${file.size}`)
        }
    }
    return (
        <div>
            <label htmlFor="avatar">Choose a file:</label>
            <input type="file"
                id="avatar" name="avatar"
                accept="image/png, image/jpeg application/pdf"></input>
            <button onClick={storeFiles} htmlFor="avatar" className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Upload
            </button>
            <button onClick={retrieveFiles} htmlFor="avatar" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Retrieve
            </button>
        </div>
    )
}
