'use client';

import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import useElementScroll from '../hooks/useElementScroll';
import useSwipe, { SwipeDirection } from '../hooks/useSwipe';
import FullpageContents from './FullpageContents';
import FullpageScrollbar from './FullpageScrollbar';
import useHash from '../hooks/useHash';

type Props = {
  index?: number;
  children?: React.ReactNode;
  activeIndex?: number;
  sectionCount?: number;
  isAnimating?: boolean;
  isLoaded?: boolean;
  setIsAnimating?: (payload: boolean) => void;
  setActiveIndex?: (payload: number) => void;
  isAutoHeight?: boolean;
  name?: string;
};

function FullpageSection({
  children,
  isAutoHeight = false,
  activeIndex,
  sectionCount,
  isAnimating = false,
  setActiveIndex,
  setIsAnimating,
  name = '',
  index = 0,
}: Props) {
  const section = useRef<HTMLDivElement>(null);
  const { isAtTop, isAtBottom, hasScrollbar, scrollHeight, scrollY } =
    useElementScroll(section);
  const [scrollDelay, setScrollDelay] = useState<boolean>(false);
  const { hashValue, updateHash } = useHash();

  useEffect(() => {
    if (hashValue) {
      if (hashValue === name) {
        if (setActiveIndex !== undefined) {
          setActiveIndex(index);
        }
        updateHash();
      }
    }
  }, [hashValue, setActiveIndex, index, name, updateHash]);

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
    if (setIsAnimating === undefined || setActiveIndex === undefined) return;
    if (isAnimating || scrollDelay) return;
    setIsAnimating(true);
    setActiveIndex(newIndex);
  };

  const moveToNextSection = () => {
    if (activeIndex === undefined || sectionCount === undefined) return;
    if (activeIndex >= sectionCount - 1) return;
    if (hasScrollbar && !isAtBottom) return;
    moveToSection(activeIndex + 1);
  };

  const moveToPrevSection = () => {
    if (activeIndex === undefined) return;
    if (activeIndex <= 0) return;
    if (hasScrollbar && !isAtTop) return;
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

  useSwipe(section, {
    onSwipeEnd: handleSwipeEnd,
  });

  return (
    <div
      ref={section}
      onWheel={handelWheel}
      className="react-fullpage__section"
      style={{
        overflowY: `${isAnimating ? 'hidden' : 'auto'}`,
        height: `${isAutoHeight ? 'auto' : '100%'}`,
      }}
    >
      <FullpageContents>{children}</FullpageContents>
      {hasScrollbar && !isAnimating && (
        <FullpageScrollbar
          scrollHeight={scrollHeight}
          scrollY={scrollY}
          section={section}
        />
      )}
    </div>
  );
}

export default FullpageSection;
