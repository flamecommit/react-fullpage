import React, { useEffect } from 'react';
import '../styles/Global.css';

type Props = {
  children: React.ReactNode;
};

const FullpageWrapper = ({ children }: Props) => {
  useEffect(() => {
    document.documentElement.classList.add('__react_fullpage-html');

    // cleanup 함수에서 클래스를 제거하도록 합니다.
    return () => {
      document.documentElement.classList.remove('__react_fullpage-html');
    };
  }, []);

  return <div className="__react_fullpage-wrapper">{children}</div>;
};

export default FullpageWrapper;
