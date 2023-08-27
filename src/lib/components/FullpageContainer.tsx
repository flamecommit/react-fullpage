'use client';

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import FullpageWrapper from './FullpageWrapper';

type Props = {
  children: React.ReactNode;
};

function FullpageContainer({ children }: Props) {
  const [transformY, setTransformY] = useState<number>(0);
  const container = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [sectionCount, setSectionCount] = useState<number>(0);

  useEffect(() => {
    if (!isAnimating) return;

    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  }, [isAnimating]);

  useEffect(() => {
    let temp = 0;

    for (let i = 0; i <= activeIndex; i += 1) {
      if (container !== null && container.current && i > 0) {
        temp += container.current.children[i].clientHeight || 0;
      }
    }

    setTransformY(temp);
  }, [activeIndex]);

  useEffect(() => {
    if (container !== null && container.current) {
      setSectionCount(container.current.childElementCount);
    }
  }, [container]);

  return (
    <FullpageWrapper>
      <StyledFullpageContainer
        $transformY={transformY}
        ref={container}
        data-is-animating={isAnimating}
      >
        {React.Children.map(children, (child, index) => {
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
      </StyledFullpageContainer>
    </FullpageWrapper>
  );
}

const StyledFullpageContainer = styled.div<{
  $transformY: number;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 700ms;
  transform: ${(props) => `translate3d(0px, -${props.$transformY}px, 0px)`};
`;

export default FullpageContainer;
