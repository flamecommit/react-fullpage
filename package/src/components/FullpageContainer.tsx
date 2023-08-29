'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import FullpageWrapper from './FullpageWrapper';
import usePrevious from '../hooks/usePrevious';

interface IProps {
  children: React.ReactNode;
  controlIndex?: number;
  onBeforeChange?: (beforeIndex: number, afterIndex: number) => void;
  onAfterChange?: (beforeIndex: number, afterIndex: number) => void;
}

function FullpageContainer({
  children,
  controlIndex,
  onBeforeChange,
  onAfterChange,
}: IProps) {
  const [transformY, setTransformY] = useState<number>(0);
  const container = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false); // true 시 animation 진행 중
  const [activeIndex, setActiveIndex] = useState<number>(0); // 현재 활성화 된 Section Index
  const prevActiveIndex = usePrevious(activeIndex) as number; // 직전 activeIndex 값
  const [sectionCount, setSectionCount] = useState<number>(0); // section 총 갯수
  const [isLoaded, setIsLoaded] = useState(false);

  const callbackBeforeChange = useCallback(() => {
    if (onBeforeChange) {
      onBeforeChange(prevActiveIndex, activeIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onAfterChange, activeIndex]);

  const callbackAfterChange = useCallback(() => {
    if (onAfterChange) {
      onAfterChange(prevActiveIndex, activeIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onAfterChange, activeIndex]);

  useEffect(() => {
    if (!isAnimating) return;

    callbackBeforeChange();

    setTimeout(() => {
      setIsAnimating(false);
      callbackAfterChange();
    }, 700);
  }, [isAnimating, callbackBeforeChange, callbackAfterChange]);

  /**
   * activeIndex 변경 시 container의 transformY 값을 계산합니다.
   */
  useEffect(() => {
    let temp = 0;

    for (let i = 0; i <= activeIndex; i += 1) {
      if (container !== null && container.current) {
        const node = container.current.children[i];

        if (node && i > 0) {
          temp += node.clientHeight || 0;
        }
      }
    }

    setTransformY(temp);
  }, [activeIndex]);

  useEffect(() => {
    if (container !== null && container.current) {
      setSectionCount(container.current.childElementCount);
    }
  }, [container, isLoaded]);

  /**
   * Container 마운트에 <html> 태그에 Class를 추가하고, 언마운트에 제거합니다.
   */
  useEffect(() => {
    document.documentElement.classList.add('react-fullpage__html');
    setIsLoaded(true);
    return () => {
      document.documentElement.classList.remove('react-fullpage__html');
      setIsLoaded(false);
    };
  }, []);

  /**
   * Component 외부에서 controlIndex를 사용하여 activeIndex를 조작합니다.
   */
  useEffect(() => {
    try {
      if (
        !controlIndex ||
        controlIndex < 0 ||
        controlIndex > sectionCount - 1
      ) {
        throw new Error('invalid controlIndex');
      } else {
        setActiveIndex(controlIndex);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  }, [controlIndex, sectionCount]);

  return (
    <FullpageWrapper>
      <div
        className="react-fullpage__container"
        style={{
          transform: `translate3d(0px, -${transformY}px, 0px)`,
        }}
        ref={container}
        data-is-animating={isAnimating}
      >
        {isLoaded &&
          React.Children.map(children, (child, index) => {
            const item = child as React.ReactElement;
            return React.cloneElement(item, {
              index,
              activeIndex,
              sectionCount,
              isAnimating,
              setIsAnimating,
              setActiveIndex,
            });
          })}
      </div>
    </FullpageWrapper>
  );
}

export default FullpageContainer;
