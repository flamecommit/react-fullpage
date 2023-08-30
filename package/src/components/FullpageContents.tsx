'use client';

import * as React from 'react';

type Props = {
  children: React.ReactNode;
};

function FullpageContents({ children }: Props) {
  return <div className="react-fullpage__contents">{children}</div>;
}

export default FullpageContents;
