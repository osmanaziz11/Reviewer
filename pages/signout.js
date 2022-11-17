import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';
import useCustom from '../hooks/custom';

const Signout = () => {
  const router = useRouter();
  const { setUser } = useCustom();
  setUser(false);
  localStorage.removeItem('user');
  router.replace('/Login');
  return <div className="loader__GIF"></div>;
};
export default Signout;
