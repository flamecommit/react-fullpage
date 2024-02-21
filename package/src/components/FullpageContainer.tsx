'use client';

import {
  Children,
  ReactNode,
  RefObject,
  cloneElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import usePrevious from '../hooks/usePrevious';
import useWindowSize from '../hooks/useWindowSize';
import FullpageWrapper from './FullpageWrapper';

interface IProps {
  children: ReactNode;
  activeIndex: number; // 현재 활성화 Section의 Index
  setActiveIndex: (afterIndex: number) => void;
  allowScroll?: boolean; // scroll 활성화 여부
  allowScrollUp?: boolean; // scroll 활성화 여부
  allowScrollDown?: boolean; // scroll 활성화 여부
  transitionDuration?: number; // Section 전환 속도
  onBeforeChange?: (beforeIndex: number, afterIndex: number) => void;
  onAfterChange?: (beforeIndex: number, afterIndex: number) => void;
  onAfterLoad?: (container: RefObject<HTMLDivElement>) => void;
  topScrollOnChange?: boolean; // Section 전환 시 Section 내부 Scroll을 항상 top 고정
}

function FullpageContainer({
  children,
  activeIndex,
  allowScroll = true,
  allowScrollUp = true,
  allowScrollDown = true,
  transitionDuration = 700,
  setActiveIndex,
  onBeforeChange,
  onAfterChange,
  onAfterLoad,
  topScrollOnChange = false,
}: IProps) {
  const [transformY, setTransformY] = useState<number>(0);
  const container = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false); // true 시 animation 진행 중
  const prevActiveIndex = usePrevious(activeIndex) as number; // 직전 activeIndex 값
  const [sectionCount, setSectionCount] = useState<number>(0); // section 총 갯수
  const [isLoaded, setIsLoaded] = useState(false);
  const { width: windowWidth, height: windowHeight } = useWindowSize();

  const callbackBeforeChange = useCallback(() => {
    if (onBeforeChange) {
      onBeforeChange(prevActiveIndex, activeIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onBeforeChange, activeIndex]);

  const callbackAfterChange = useCallback(() => {
    if (onAfterChange) {
      onAfterChange(prevActiveIndex, activeIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onAfterChange, activeIndex]);

  useEffect(() => {
    callbackBeforeChange();

    const timer = setTimeout(() => {
      setIsAnimating(false);
      callbackAfterChange();
    }, transitionDuration);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, callbackBeforeChange, callbackAfterChange]);

  /**
   * activeIndex 변경 시 container의 transformY 값을 계산합니다.
   */
  useEffect(() => {
    let temp = 0;

    if (activeIndex < 0) setActiveIndex(0);
    if (sectionCount && activeIndex > sectionCount - 1)
      setActiveIndex(sectionCount - 1);

    for (let i = 0; i <= activeIndex; i += 1) {
      if (container !== null && container.current) {
        const node = container.current.children[i];

        if (node && i > 0) {
          temp += node.clientHeight || 0;
        }
      }
    }

    setTransformY(temp);
  }, [
    windowWidth,
    windowHeight,
    activeIndex,
    setActiveIndex,
    container,
    isLoaded,
    sectionCount,
  ]);

  useEffect(() => {
    if (container !== null && container.current) {
      setSectionCount(container.current.childElementCount);
    }
  }, [container, isLoaded]);

  useEffect(() => {
    if (isLoaded && onAfterLoad) {
      onAfterLoad(container);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  /**
   * Container 마운트에 <html> 태그에 Class를 추가하고, 언마운트에 제거합니다.
   */
  useEffect(() => {
    // document.documentElement.classList.add('react-fullpage__html');
    setIsLoaded(true);
    return () => {
      // document.documentElement.classList.remove('react-fullpage__html');
      setIsLoaded(false);
    };
  }, []);

  return (
    <FullpageWrapper>
      <div
        className="react-fullpage__container"
        style={{
          transform: `translate3d(0px, -${transformY}px, 0px)`,
          transitionDuration: `${transitionDuration}ms`,
        }}
        ref={container}
        data-is-animating={isAnimating}
      >
        {isLoaded &&
          Children.map(children, (child, index) => {
            const item = child as React.ReactElement;
            return cloneElement(item, {
              index,
              activeIndex,
              setActiveIndex,
              sectionCount,
              isAnimating,
              setIsAnimating,
              allowScroll,
              allowScrollUp,
              allowScrollDown,
              topScrollOnChange,
              transitionDuration,
            });
          })}
      </div>
    </FullpageWrapper>
  );
}

export default FullpageContainer;
