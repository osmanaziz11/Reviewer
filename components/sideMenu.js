import Link from 'next/link';
import { useRouter } from 'next/router';
import useCustom from '../hooks/custom';

const Menu = () => {
  const router = useRouter();
  const { NavStatus } = useCustom();
  return (
    <div
      className={`container-fluid end-0 d-md-none d-block main__container ${
        NavStatus && 'opacity-100 visible'
      } position-fixed`}
    >
      <div className="row h-100">
        <div className="col h-100">
          <ul className="list-unstyled p-0 d-flex flex-column align-items-center w-100 h-100">
            <li className="my-3">
              <Link href="/About">
                <a className={router.pathname == '/' ? 'activeRoute' : ''}>
                  About
                </a>
              </Link>
            </li>
            <li className="my-3">
              <Link href="/Detective">
                <a
                  className={
                    router.pathname == '/portfolio' ? 'activeRoute' : ''
                  }
                >
                  Detective
                </a>
              </Link>
            </li>
            <li className="my-3">
              <Link href="/">
                <a
                  className={router.pathname == '/wedding' ? 'activeRoute' : ''}
                >
                  Support
                </a>
              </Link>
            </li>
            <li className="my-3">
              <Link href="/Login">
                <a
                  className={router.pathname == '/wedding' ? 'activeRoute' : ''}
                >
                  Login
                </a>
              </Link>
            </li>
            <li className="my-3">
              <Link href="/Register">
                <a
                  className={router.pathname == '/wedding' ? 'activeRoute' : ''}
                >
                  Register
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Menu;
