import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface IProps {
  children: React.ReactNode;
}

const FullpageWrapper = ({ children }: IProps) => {
  const wrapper = useRef<HTMLDivElement>(null);
  const [parentsNode, setParentsNode] = useState<HTMLElement[]>([]);
  const temp: HTMLElement[] = [];

  const initParentsClassName = useCallback((target: HTMLElement | null) => {
    if (target) {
      const parentNode = target.parentNode as HTMLElement | null;

      if (parentNode && parentNode.classList) {
        temp.push(parentNode);
        initParentsClassName(parentNode);
      } else {
        setParentsNode(temp);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const wrapperCurrent = wrapper.current;

    if (wrapperCurrent) {
      initParentsClassName(wrapperCurrent);
    }

    if (parentsNode.length) {
      parentsNode.forEach((node) => {
        node.classList.add('react-fullpage__parents');
      });
    }

    return () => {
      parentsNode.forEach((node) => {
        node.classList.remove('react-fullpage__parents');
      });
    };
  }, [initParentsClassName, parentsNode]);

  return (
    <div className="react-fullpage__wrapper" ref={wrapper}>
      {children}
    </div>
  );
};

export default FullpageWrapper;
