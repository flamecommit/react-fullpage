'use client';

import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import useElementScroll from '../hooks/useElementScroll';
import useElementSize from '../hooks/useElementSize';
import useHash from '../hooks/useHash';
import useSwipe, { SwipeDirection } from '../hooks/useSwipe';
import FullpageContents from './FullpageContents';
import FullpageScrollbar from './FullpageScrollbar';

interface IProps {
  index?: number;
  children?: React.ReactNode;
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
    if (
      setIsAnimating === undefined ||
      setActiveIndex === undefined ||
      !allowScroll
    )
      return;
    if (isAnimating || scrollDelay) return;
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
    if (e.deltaY > 0) {
      moveToNextSection();
    }
    if (e.deltaY < 0) {
      moveToPrevSection();
    }
  };

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
