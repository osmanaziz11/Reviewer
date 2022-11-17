import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../../components/Layout';
import Board from './components/Board';

const Detective = () => {
  const router = useRouter();
  const key = localStorage.getItem('user') !== null;
  if (!key) {
    router.replace('/Login');
    return <h1>Loading...</h1>;
  }
  return (
    <Layout title="Detective">
      <Board></Board>
    </Layout>
  );
};
export default Detective;
