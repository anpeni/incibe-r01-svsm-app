import { useEffect, useState } from 'react';

export const useIsDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'neoris-dark',
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsDarkMode(localStorage.getItem('theme') === 'neoris-dark');
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return isDarkMode;
};
