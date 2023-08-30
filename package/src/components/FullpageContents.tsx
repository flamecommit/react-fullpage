'use client';

import * as React from 'react';

interface IProps {
  children: React.ReactNode;
}

function FullpageContents({ children }: IProps) {
  return <div className="react-fullpage__contents">{children}</div>;
}

export default FullpageContents;
