'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import useElementScroll from '../hooks/useElementScroll';
import useElementSize from '../hooks/useElementSize';
import useHash from '../hooks/useHash';
import useSwipe, { SwipeDirection } from '../hooks/useSwipe';
import FullpageContents from './FullpageContents';
import FullpageScrollbar from './FullpageScrollbar';

interface IProps {
  index?: number;
  children?: ReactNode;
  activeIndex?: number;
  sectionCount?: number;
  isAnimating?: boolean;
  isLoaded?: boolean;
  allowScroll?: boolean;
  allowScrollUp?: boolean;
  allowScrollDown?: boolean;
  setIsAnimating?: (payload: boolean) => void;
  setActiveIndex?: (payload: number) => void;
  isAutoHeight?: boolean;
  name?: string;
  topScrollOnChange?: boolean;
  transitionDuration?: number;
}

function FullpageSection({
  children,
  allowScroll,
  allowScrollUp,
  allowScrollDown,
  isAutoHeight = false,
  activeIndex,
  sectionCount,
  isAnimating = false,
  setActiveIndex,
  setIsAnimating,
  name = '',
  index = 0,
  topScrollOnChange,
  transitionDuration,
}: IProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentsRef = useRef<HTMLDivElement>(null);
  const { height: contentsHeight } = useElementSize(contentsRef);
  const { isAtTop, isAtBottom, hasScrollbar, scrollY } = useElementScroll(
    sectionRef,
    contentsHeight
  );
  const [scrollDelay, setScrollDelay] = useState<boolean>(false);
  const { hashValue } = useHash();
  const deltaWeightTimer = useRef<number>(0);
  const [deltaWeight, setDeltaWeight] = useState<number>(0); // wheel 가중치
  const [lastDeltaWeight, setLastDeltaWeight] = useState<number>(0);
  // wheel 속도가 마지막 wheel 속도보다 빠르면 true 또는 wheel이벤트가 300ms 이상 없으면 true
  const wheelTokenTimer = useRef<NodeJS.Timeout | null>(null);
  const wheelToken = useRef<boolean>(true);

  useEffect(() => {
    if (hashValue) {
      if (hashValue === name) {
        if (setActiveIndex !== undefined) {
          setActiveIndex(index);
        }
        // updateHash();
      }
    }
  }, [hashValue, setActiveIndex, index, name]);

  useEffect(() => {
    setScrollDelay(isAtTop || isAtBottom);
  }, [isAtTop, isAtBottom]);

  useEffect(() => {
    if (scrollDelay) {
      const timer = setTimeout(() => {
        setScrollDelay(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [scrollDelay]);

  const moveToSection = (newIndex: number) => {
    if (setIsAnimating === undefined || setActiveIndex === undefined) return; // 타입 에러 회피용
    if (!allowScroll || isAnimating || scrollDelay) return;
    setIsAnimating(true);
    setActiveIndex(newIndex);
  };

  const moveToNextSection = () => {
    if (
      activeIndex === undefined ||
      sectionCount === undefined ||
      activeIndex >= sectionCount - 1 ||
      !allowScrollDown
    )
      return;
    if (activeIndex === index) {
      if (hasScrollbar && !isAtBottom) return;
    }
    moveToSection(activeIndex + 1);
  };

  const moveToPrevSection = () => {
    if (activeIndex === undefined || activeIndex <= 0 || !allowScrollUp) return;
    if (activeIndex === index) {
      if (hasScrollbar && !isAtTop) return;
    }
    moveToSection(activeIndex - 1);
  };

  const handelWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const t = new Date().getTime();
    if (t - deltaWeightTimer.current < 300) {
      const computed = deltaWeight + Math.abs(e.deltaY);
      if (computed > lastDeltaWeight) {
        // wheel의 속도가 lastDeltaWeight보다 높으면 token 초기화
        wheelToken.current = true;
      }
      setDeltaWeight(computed);
    } else {
      setLastDeltaWeight(deltaWeight);
      deltaWeightTimer.current = t;
      setDeltaWeight(0);
    }

    // token이 false라면 스크립트 중지
    if (!wheelToken.current) return;

    if (e.deltaY > 0) {
      moveToNextSection();
    }
    if (e.deltaY < 0) {
      moveToPrevSection();
    }
  };

  useEffect(() => {
    wheelToken.current = false;
    if (wheelTokenTimer.current !== null) {
      clearTimeout(wheelTokenTimer.current);
    }
    wheelTokenTimer.current = setTimeout(() => {
      // wheel이벤트가 300ms동안 발생하지 않으면 token 초기화
      wheelToken.current = true;
      setDeltaWeight(0);
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deltaWeight]);

  const handleSwipeEnd = (direction: SwipeDirection) => {
    if (direction === 'UP') {
      moveToNextSection();
    }

    if (direction === 'DOWN') {
      moveToPrevSection();
    }
  };

  useSwipe(sectionRef, {
    onSwipeEnd: handleSwipeEnd,
  });

  useEffect(() => {
    if (topScrollOnChange) {
      if (activeIndex !== index) {
        setTimeout(() => {
          sectionRef.current?.scrollTo(0, 0);
        }, transitionDuration);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return (
    <div
      ref={sectionRef}
      onWheel={handelWheel}
      className={`react-fullpage__section`}
      data-active={activeIndex === index}
      data-animating={isAnimating}
      style={{
        height: `${isAutoHeight ? 'auto' : '100%'}`,
      }}
    >
      <FullpageContents contentsRef={contentsRef}>{children}</FullpageContents>
      {hasScrollbar && !isAnimating && (
        <FullpageScrollbar
          contentsHeight={contentsHeight}
          scrollY={scrollY}
          sectionRef={sectionRef}
        />
      )}
    </div>
  );
}

export default FullpageSection;
