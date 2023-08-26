'use client';

import React, { RefObject, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useWindowSize from '../hooks/useWindowSize';
import useMousePressed from '../hooks/useMousePressed';
import useMousePosition from '../hooks/useMousePosition';

type TProps = {
  scrollHeight: number;
  scrollY: number;
  section: RefObject<HTMLDivElement>;
};

function FullpageScrollbar({ scrollHeight, scrollY, section }: TProps) {
  const handler = useRef<HTMLButtonElement>(null);
  const { y: mouseY } = useMousePosition();
  const isMousePressed = useMousePressed(handler);
  const [handlerHeight, setHandlerHeight] = useState<number>(0);
  const [handlerTop, setHandlerTop] = useState<number>(0);
  const { height: windowHeight } = useWindowSize();
  const [pressMouseY, setPressMouseY] = useState<number>(0);
  const [pressScrollY, setPressScrollY] = useState<number>(0);

  useEffect(() => {
    setHandlerTop(
      (100 - (windowHeight / scrollHeight) * 100) *
        (scrollY / (scrollHeight - windowHeight)),
    );
    setHandlerHeight((windowHeight / scrollHeight) * 100);
  }, [windowHeight, scrollHeight, scrollY]);

  useEffect(() => {
    if (isMousePressed) {
      setPressMouseY(mouseY);
      setPressScrollY(scrollY);
    } else {
      window.getSelection()?.removeAllRanges();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMousePressed]);

  useEffect(() => {
    if (isMousePressed) {
      const newScrollY =
        ((mouseY - pressMouseY) / windowHeight) * scrollHeight + pressScrollY;

      if (section.current) {
        section.current.scrollTo(0, newScrollY);
      }

      console.log(newScrollY);
    }
  }, [
    mouseY,
    pressMouseY,
    windowHeight,
    scrollHeight,
    pressScrollY,
    isMousePressed,
    section,
  ]);

  return (
    <StyledFullpageScrollbar
      className="__react-fullpage-scrollbar"
      style={{ height: `${scrollHeight}px` }}
    >
      <div
        className="__react-fullpage-scrollbar-sticker"
        style={{ height: `${windowHeight}px` }}
      >
        <div
          className="__react-fullpage-scrollbar-container"
          style={{ height: `${windowHeight}px` }}
        >
          <button
            type="button"
            ref={handler}
            className={`__react-fullpage-scrollbar-handler ${
              isMousePressed && 'is-pressed'
            }`}
            style={{ top: `${handlerTop}%`, height: `${handlerHeight}%` }}
            data-is-pressed={isMousePressed}
          ></button>
        </div>
      </div>
    </StyledFullpageScrollbar>
  );
}

const StyledFullpageScrollbar = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  width: 8px;
  .__react-fullpage-scrollbar-sticker {
    position: sticky;
    top: 0;
    width: 100%;
  }
  .__react-fullpage-scrollbar-container {
    overflow: hidden;
    position: relative;
    width: 100%;
  }
  .__react-fullpage-scrollbar-handler {
    border: none;
    border-radius: 4px;
    background: none;
    appearance: none;
    cursor: pointer;
    position: absolute;
    padding: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.3);
    cursor: default;
    &.is-pressed {
      background: rgba(0, 0, 0, 0.6);
    }
  }
`;

export default FullpageScrollbar;
