import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useCustom from '../hooks/custom';
import Menu from './sideMenu';
import CLoader from './CLoader';

const Layout = ({ title, children }) => {
  const { user, error, setProgress, progress } = useCustom();
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(20);
    });
    router.events.on('routeChangeComplete', () => {
      setProgress(100);
    });
  }, [router.events]);

  return (
    <>
      <Head>
        <title>{`${title} - Review Detective `}</title>
      </Head>
      <div
        className="container-fluid position-relative Layout-container"
        style={{
          maxWidth: '1500px',
          overflow: 'hidden',
          minHeight: 'calc(100vh - 190px)',
        }}
      >
        <Menu />
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        {children}
      </div>
    </>
  );
};
export default Layout;
