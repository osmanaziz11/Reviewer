import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Topbar from '../components/Topbar';
import { CustomHook } from '../hooks/custom';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';
import { SkeletonTheme } from 'react-loading-skeleton';

function MyApp({ Component, pageProps }) {
  return (
    <CustomHook>
      <Topbar />
      <Navbar />
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <Component {...pageProps} />
      </SkeletonTheme>
      <Footer />
    </CustomHook>
  );
}

export default MyApp;
