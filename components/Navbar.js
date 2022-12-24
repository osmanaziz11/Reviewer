/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Pivot as Hamburger } from 'hamburger-react';
import useCustom from '../hooks/custom';

const Navbar = () => {
  const router = useRouter();
  const { NavStatus, setNavStatus, theme, user } = useCustom();

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
        <div className="col-lg-4 col-10 Logo__container d-flex py-sm-4 py-2 px-sm-4 px-2 pb-3 align-items-center">
          <div className="Logo"></div>
          <Link href="/">
            <h5 className="cursor-pointer mt-2 ms-2">Reviewer</h5>
          </Link>
        </div>
        <div className="col-4 nav__container p-4 pb-3 d-lg-flex d-none justify-content-center">
          <ul className="list-unstyled d-lg-flex d-none m-0 p-0 mt-3">
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
                Support
              </li>
            </Link>
          </ul>
        </div>
        <div className="col-lg-4 col-2 nav__container py-sm-4 py-2 px-sm-4 px-2 pb-3 d-flex justify-content-end align-items-center">
          <ul className="list-unstyled d-lg-flex d-none m-0 p-0 mt-3">
            <Link href="/Login">
              <li
                className={`mx-3 ${
                  router.pathname == '/About' ? 'activeRoute' : ''
                } ${user && 'd-none'}`}
              >
                Login
              </li>
            </Link>
            <Link href="/signout">
              <li
                className={`mx-2 ${
                  router.pathname == '/About' ? 'activeRoute' : ''
                } ${!user && 'd-none'}`}
              >
                Sign out
              </li>
            </Link>
            <Link href="/Register">
              <li
                style={{ backgroundColor: theme }}
                className={`mx-3 rege py-2 px-4${
                  router.pathname == '/Detective' ? 'activeRoute' : ''
                } ${user && 'd-none'}`}
              >
                Register
              </li>
            </Link>
            <Link href="/profile">
              <li className={`mx-3 ${!user && 'd-none'}`}>
                <div className="circleAvatar">
                  <img src="/avatar.png" alt="" />
                </div>
              </li>
            </Link>
          </ul>
          <div className="d-lg-none d-block pt-3">
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
