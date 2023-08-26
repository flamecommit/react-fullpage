'use client';

import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import useElementScroll from '../hooks/useElementScroll';
import useSwipe, { SwipeDirection } from '../hooks/useSwipe';
import FullpageContents from './FullpageContents';
import FullpageScrollbar from './FullpageScrollbar';

type Props = {
  children?: React.ReactNode;
  activeIndex?: number;
  sectionCount?: number;
  isAnimating?: boolean;
  setIsAnimating?: (payload: boolean) => void;
  setActiveIndex?: (payload: number) => void;
  isFooter?: boolean;
};

function FullpageSection({
  children,
  isFooter,
  activeIndex,
  sectionCount,
  isAnimating,
  setActiveIndex,
  setIsAnimating,
}: Props) {
  const section = useRef<HTMLDivElement>(null);
  const { isAtTop, isAtBottom, hasScrollbar, scrollHeight, scrollY } =
    useElementScroll(section);
  const [scrollDelay, setScrollDelay] = useState<boolean>(false);

  useEffect(() => {
    if (isAtTop || isAtBottom) {
      setScrollDelay(true);
      setTimeout(() => {
        setScrollDelay(false);
      }, 200);
    } else {
      setScrollDelay(false);
    }
  }, [isAtTop, isAtBottom]);

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
    <StyledFullpageSection
      ref={section}
      onWheel={handelWheel}
      className={isFooter ? 'is-footer' : ''}
      $isAnimating={isAnimating}
    >
      <FullpageContents>{children}</FullpageContents>
      {hasScrollbar && !isAnimating && (
        <FullpageScrollbar
          scrollHeight={scrollHeight}
          scrollY={scrollY}
          section={section}
        />
      )}
    </StyledFullpageSection>
  );
}

const StyledFullpageSection = styled.div<{ $isAnimating: boolean | undefined }>`
  overflow-x: hidden;
  overflow-y: ${(props) => (props.$isAnimating ? 'hidden' : 'auto')};
  position: relative;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  height: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
  &.is-footer {
    height: auto;
  }
`;

export default FullpageSection;
