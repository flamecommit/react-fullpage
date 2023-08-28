import React from 'react';

type Props = {
  children: React.ReactNode;
};

function FullpageContents({ children }: Props) {
  return <div className="__react_fullpage-contents">{children}</div>;
}

export default FullpageContents;
