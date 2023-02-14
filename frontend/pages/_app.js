import '../styles/globals.css'
import { MoralisProvider } from "react-moralis";

export const envData = {
  serverUrl: process.env.NEXT_PUBLIC_MORALIS_SERVER_URL,
  appId: process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID,
  }
function MyApp({ Component, pageProps }) {
  return (<>
    <MoralisProvider appId={envData.appId} serverUrl={envData.serverUrl}>
      <Component {...pageProps} />
    </MoralisProvider>
  </>);


  }

export default MyApp
