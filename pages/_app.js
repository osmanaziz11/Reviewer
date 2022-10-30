import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Topbar from '../components/Topbar';
import { CustomHook } from '../hooks/custom';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <CustomHook>
      <Topbar />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </CustomHook>
  );
}

export default MyApp;
