import React from 'react'
import { Web3Storage } from 'web3.storage'

export default function about() {
    function getAccessToken() {
        // If you're just testing, you can paste in a token
        // and uncomment the following line:
        // return 'paste-your-token-here'

        // In a real app, it's better to read an access token from an
        // environement variable or other configuration that's kept outside of
        // your code base. For this to work, you need to set the
        // WEB3STORAGE_TOKEN environment variable before you run your code.
        // console.log(process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN);
        return process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN
    }
    function getFiles() {
        const fileInput = document.querySelector('input[type="file"]')
        return fileInput.files
    }
    function makeStorageClient() {
        return new Web3Storage({ token: getAccessToken() })
    }
    async function storeFiles(files) {
        const client = makeStorageClient()
        const cid = await client.put(files)
        console.log('stored files with cid:', cid)
        return cid
    }
    return (
        <div>
            <label for="avatar">Choose a file:</label>
            <input type="file"
                id="avatar" name="avatar"
                accept="image/png, image/jpeg"></input>
            <button onClick={getFiles} for="avatar" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Upload
            </button>
        </div>
    )
}
