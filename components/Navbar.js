import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Pivot as Hamburger } from 'hamburger-react';
import useCustom from '../hooks/custom';
import { AiOutlineUser } from 'react-icons/ai';

const Navbar = () => {
  const router = useRouter();
  const { NavStatus, setNavStatus } = useCustom();

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      if (NavStatus) {
        document.getElementsByClassName('hamburger-react')[0].click();
      }
    });
  }, [router.events]);

  return (
    <div className="container-fluid header mb-5 shadow">
      <div className="row">
        <div className="col-4 Logo__container p-4 pb-3">
          <Link href="/">
            <h2 className="cursor-pointer mt-2">ReviewDetector</h2>
          </Link>
        </div>
        <div className="col-8 nav__container p-4 pb-3 d-flex justify-content-end">
          <ul className="list-unstyled d-md-flex d-none m-0 p-0 mt-3">
            <Link href="/About">
              <li
                className={`mx-3 ${
                  router.pathname == '/About' ? 'activeRoute' : ''
                }`}
              >
                About
              </li>
            </Link>
            <Link href="/Detective">
              <li
                className={`mx-3 ${
                  router.pathname == '/Detective' ? 'activeRoute' : ''
                }`}
              >
                Detective
              </li>
            </Link>
            <Link href="/How-it-works">
              <li
                className={`mx-3 ${
                  router.pathname == '/How-it-works' ? 'activeRoute' : ''
                }`}
              >
                How it Works
              </li>
            </Link>
            <Link href="/How-it-works">
              <li className={`mx-3`}>
                <AiOutlineUser
                  style={{
                    color: 'white',
                    fontSize: '2rem',
                    marginTop: '-5px',
                  }}
                ></AiOutlineUser>
              </li>
            </Link>
          </ul>
          <div className="d-md-none d-block">
            <Hamburger
              id="hamburger"
              size={30}
              distance="sm"
              onToggle={() => setNavStatus(!NavStatus)}
            ></Hamburger>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
