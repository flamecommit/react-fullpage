'use client';

import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import useElementScroll from '../hooks/useElementScroll';
import useSwipe, { SwipeDirection } from '../hooks/useSwipe';
import FullpageContents from './FullpageContents';

type Props = {
  children: React.ReactNode;
  activeIndex: number;
  sectionCount: number;
  isAnimating: boolean;
  setIsAnimating: (payload: boolean) => void;
  setActiveIndex: (payload: number) => void;
  isFooter?: boolean;
};

function FullpageSection({ children, isFooter, activeIndex, sectionCount, isAnimating, setActiveIndex, setIsAnimating }: Props) {
  const section = useRef<HTMLDivElement>(null);
  const { isAtTop, isAtBottom, hasScrollbar } = useElementScroll(section);
  const [scrollDelay, setScrollDelay] = useState<boolean>(false);

  useEffect(() => {
    if (isAtTop || isAtBottom) {
      setScrollDelay(true)
      setTimeout(() => {
        setScrollDelay(false)
      }, 200)
    } else {
      setScrollDelay(false)
    }
  }, [isAtTop, isAtBottom])

  const moveToSection = (newIndex: number) => {
    if (isAnimating || scrollDelay) return;
    setIsAnimating(true)
    setActiveIndex(newIndex)
  }

  const moveToNextSection = () => {
    if (activeIndex >= sectionCount - 1) return;
    if (hasScrollbar && !isAtBottom) return;
    moveToSection(activeIndex + 1)
  };

  const moveToPrevSection = () => {
    if (activeIndex <= 0) return;
    if (hasScrollbar && !isAtTop) return;
    moveToSection(activeIndex - 1)
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
    >
      <FullpageContents>{children}</FullpageContents>
    </StyledFullpageSection>
  );
}

const StyledFullpageSection = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  height: 100%;
  &.is-footer {
    height: auto;
  }
`;

export default FullpageSection;
