import React from 'react';

type Props = {
  children: React.ReactNode;
};

const FullpageWrapper = ({ children }: Props) => {
  return <div className="react-fullpage__wrapper">{children}</div>;
};

export default FullpageWrapper;
