import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { TbBrandMeta } from 'react-icons/tb';
import Head from 'next/head';
import useCustom from '../hooks/custom';
import { useEffect } from 'react';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';
import { firebaseApp } from '../firebase/firebase.config';
const Login = () => {
  const { user, setUser, error, theme } = useCustom();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.replace('/Detective');
    }
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const req = await fetch(`/api/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Username: data.Username,
        Password: data.Password,
      }),
    });
    const resp = await req.json();
    if (resp.status === 1) {
      localStorage.setItem('user', JSON.stringify(resp.body));
      setUser(true);
      router.replace('/Detective');
      return <h1>Loading...</h1>;
    } else {
      setError('Password', { type: 'custom', message: 'Invalid Password' });
    }
  };

  const isUsernameExist = async (event) => {
    const req = await fetch(`/api/username`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Username: event }),
    });
    const resp = await req.json();
    if (resp.status === 1) {
      return true;
    } else return false;
  };

  const validateInput = (event) => {
    setValue(event.target.name, event.target.value, { shouldValidate: true });
  };
  return (
    <>
      <Head>
        <title>{`Login -  Review Detective`}</title>
      </Head>
      <div
        className="container-fluid position-relative Layout-container"
        style={{
          maxWidth: '1500px',
          overflowX: 'hidden',
          minHeight: 'calc(100vh - 190px)',
        }}
      >
        <div className="container-fluid Login_board_container h-100">
          {/* Search  */}
          <div className="row  h-100">
            <div className="col d-flex login__container flex-column justify-content-center h-100 align-items-center">
              <h2 className="text-center">Login To Your Account</h2>
              <p className="text-center my-2">
                This protects you from getting ripped off when shopping online.
              </p>
              <form
                action=""
                className="d-flex flex-column mt-2"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Username"
                  className={`mb-3 ${errors.Username ? 'validError' : ''}`}
                  autoComplete="off"
                  {...register('Username', {
                    onChange: validateInput,
                    minLength: 4,
                    maxLength: 10,
                    required: true,
                    // pattern: /([A-Za-z_])([0-9])/,
                    validate: isUsernameExist,
                  })}
                />
                <input
                  type="password"
                  name=""
                  id=""
                  className={`${errors.Password ? 'validError' : ''}`}
                  placeholder="Password"
                  autoComplete="off"
                  {...register('Password', {
                    onChange: validateInput,
                    required: true,
                    minLength: 5,
                    maxLength: 15,
                  })}
                />
                <p className="text-center mt-3">Forget Password?</p>
                <ul className="list-unstyled m-0 p-0 social d-flex my-3 justify-content-center align-items-center">
                  <li className="shadow">
                    <FcGoogle
                      style={{
                        color: 'white',
                        fontSize: '2rem',
                        marginRight: '5px',
                      }}
                    />
                  </li>
                  <li className="mx-3 shadow">
                    <TbBrandMeta
                      style={{
                        color: '#0C8CE9',
                        fontSize: '2rem',
                        marginRight: '5px',
                      }}
                    />
                  </li>
                  <li className=" shadow">
                    <AiFillGithub
                      style={{
                        color: 'white',
                        fontSize: '2rem',
                        marginRight: '5px',
                      }}
                    />
                  </li>
                </ul>
                <button
                  className="px-5 py-3 text-white mt-3"
                  style={{ backgroundColor: theme }}
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
