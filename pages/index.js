import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import useCustom from '../hooks/custom';

const Index = () => {
  const { user, theme } = useCustom();
  const { displayName, photoURL } = user;

  return (
    <Layout title="Welcome">
      <div className="container h-100">
        <div className="row h-100">
          <div className="col home__container h-100 d-flex justify-content-center align-items-center flex-column">
            <h1 className="text-center">
              AI Powered <span>Reviews</span> Detector
            </h1>
            <p className="text-center my-4">
              This protects you from getting ripped off when shopping online.
              Join the secure shopping revolution and get the the truth about
              products, reviews, and sellers before you buy.
            </p>
            <Link href="/Detective">
              <button className="px-5 py-2" style={{ backgroundColor: theme }}>
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Index;
