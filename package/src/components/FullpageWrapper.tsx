import * as React from 'react';
import '../../assets/ReactFullpage.css';

interface IProps {
  children: React.ReactNode;
}

const FullpageWrapper = ({ children }: IProps) => {
  return <div className="react-fullpage__wrapper">{children}</div>;
};

export default FullpageWrapper;
