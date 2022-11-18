import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import AuthService from '../FirebaseAuth/auth';

const myContext = createContext();
export default function useCustom() {
  return useContext(myContext);
}

export function CustomHook(props) {
  const router = useRouter();
  const [NavStatus, setNavStatus] = useState(false);
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState('');
  const [error, setError] = useState('');
  const [totalReviews, setTReviews] = useState(0);
  const [selectedLang, setSLanguage] = useState('EN');
  const [ARStatus, setARStatus] = useState(false);
  const [theme, setTheme] = useState('#075ad3');

  useEffect(() => {
    setUser(localStorage.getItem('user'));
  }, []);

  const loginWithGoogle = async () => {
    const { error, user } = await AuthService.loginWithGoogle();
    setUser(user ?? false);

    setError(error ?? '');
  };

  const loginWithGithub = async () => {
    const { error, user } = await AuthService.loginWithGithub();
    setUser(user ?? false);

    setError(error ?? '');
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
  };

  const value = {
    NavStatus,
    user,
    error,
    setNavStatus,
    progress,
    setProgress,
    loginWithGoogle,
    loginWithGithub,
    logout,
    totalReviews,
    setUser,
    setTReviews,
    selectedLang,
    setSLanguage,
    ARStatus,
    setARStatus,
    theme,
    setTheme,
  };

  return <myContext.Provider value={value} {...props} />;
}
