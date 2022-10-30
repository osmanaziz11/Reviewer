import Image from 'next/image';
import Layout from '../components/Layout';
import useCustom from '../hooks/custom';

const Index = () => {
  const { user } = useCustom();
  console.log(user);
  const { displayName, photoURL } = user;
  console.log(photoURL);
  return (
    <Layout title="Welcome">
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="text-center">Welcome</h1>
            <p className="text-center">{displayName}</p>
            <div>
              {/* <Image
                width={300}
                height={200}
                className="rounded-circle shadow-4-strong"
                alt="avatar2"
                src={photoURL}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Index;
