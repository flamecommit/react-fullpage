'use client';

import * as React from 'react';

interface IProps {
  contentsRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}

function FullpageContents({ contentsRef, children }: IProps) {
  return (
    <div className="react-fullpage__contents" ref={contentsRef}>
      {children}
    </div>
  );
}

export default FullpageContents;
