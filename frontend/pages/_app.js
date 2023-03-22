import '../styles/globals.css'
import { MoralisProvider } from "react-moralis";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (<div className='bg-black'>
    <MoralisProvider initializeOnMount={false}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </MoralisProvider>
  </div>);
}
export default MyApp
