import '../styles/globals.css'
import { MoralisProvider } from "react-moralis";
// import Header from "../components/Header";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (<>
    <MoralisProvider initializeOnMount={false}>
      {/* <Header /> */}
      <Component {...pageProps} />
      <Footer />
    </MoralisProvider>
  </>);


}

export default MyApp

