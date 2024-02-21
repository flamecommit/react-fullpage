'use client';

import { ReactNode, RefObject } from 'react';

interface IProps {
  contentsRef: RefObject<HTMLDivElement>;
  children: ReactNode;
}

function FullpageContents({ contentsRef, children }: IProps) {
  return (
    <div className="react-fullpage__contents" ref={contentsRef}>
      {children}
    </div>
  );
}

export default FullpageContents;
