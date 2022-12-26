import { useForm } from 'react-hook-form';
import Head from 'next/head';
import useCustom from '../hooks/custom';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Menu from '../components/sideMenu';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
  const router = useRouter();
  const { user, error, loginWithGoogle, loginWithGithub, theme } = useCustom();
  const [Loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const req = await fetch(`/api/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Username: data.Username,
        Name: data.FirstName,
        Email: data.Email,
        Password: data.Password,
      }),
    });
    const resp = await req.json();
    if (resp.status === 1) {
      router.replace('/Login');
    } else {
      setLoading(false);
      router.replace('/Register');
    }
  };

  const validateInput = (event) => {
    setValue(event.target.name, event.target.value, {
      shouldValidate: true,
    });
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
      return false;
    } else {
      toast.error(resp.message, {
        position: 'bottom-center',
        autoClose: true,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0.2,
        theme: 'dark',
      });
      return true;
    }
  };
  return (
    <>
      <Head>
        <title>{`Sign Up -  Review Detective`}</title>
      </Head>
      <div
        className="container-fluid position-relative Layout-container"
        style={{
          maxWidth: '1500px',
          overflowX: 'hidden',
          minHeight: 'calc(100vh - 190px)',
        }}
      >
        <Menu />
        <div className="container-fluid Login_board_container h-100">
          {/* Search  */}
          <div className="row  h-100">
            <div className="col d-flex login__container flex-column justify-content-center h-100 align-items-center">
              <h2 className="text-center">Register Your Account</h2>
              <p className="text-center my-2">
                This protects you from getting ripped off when shopping online.
              </p>
              <form
                action=""
                className="d-flex flex-column mt-2 justify-content-center align-items-center"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Name"
                  className={`mb-2 ${errors.FirstName ? 'validError' : ''}`}
                  autoComplete="off"
                  {...register('FirstName', {
                    onChange: validateInput,
                    maxLength: 15,
                    required: true,
                    pattern: /^[A-Za-z ]+$/,
                  })}
                />
                <input
                  type="text"
                  name=""
                  id=""
                  // onBlur: isUsernameExist,
                  placeholder="Username"
                  className={`my-2 ${errors.Username ? 'validError' : ''}`}
                  autoComplete="off"
                  {...register('Username', {
                    onChange: validateInput,
                    minLength: 4,
                    maxLength: 15,
                    required: true,
                    validate: isUsernameExist,
                  })}
                />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Email"
                  className={`my-2 ${errors.Email ? 'validError' : ''}`}
                  {...register('Email', {
                    onChange: validateInput,
                    required: true,
                    // pattern:
                    //   /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/,
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

                <button
                  className="py-2 text-white mt-4 border-0"
                  style={{ backgroundColor: theme, width: '150px' }}
                >
                  {Loading ? <div className="loader__GIF"></div> : 'Sign up'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
