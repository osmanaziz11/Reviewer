import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

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
  const dbinit = 0;
  const dbfinal = 0;

  useEffect(() => {
    setUser(localStorage.getItem('user'));
  }, []);

  const value = {
    NavStatus,
    user,
    error,
    setNavStatus,
    progress,
    setProgress,
    dbinit,
    dbfinal,

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
