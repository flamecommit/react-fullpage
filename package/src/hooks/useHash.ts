import { useState, useEffect } from 'react';

function useHash() {
  const [hashValue, setHashValue] = useState<string>('');

  useEffect(() => {
    const handleHashChange = () => {
      const newHashValue = window.location.hash.substring(1);
      setHashValue(newHashValue);
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const updateHash = (newHashValue?: string) => {
    if (newHashValue) {
      window.location.hash = newHashValue;
      setHashValue(newHashValue);
    } else {
      window.history.replaceState(
        null,
        document.title,
        window.location.pathname,
      );
      setHashValue('');
    }
  };

  return { hashValue, updateHash };
}

export default useHash;
