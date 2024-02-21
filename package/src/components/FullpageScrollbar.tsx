'use client';

import { RefObject, useEffect, useRef, useState } from 'react';
import useMousePosition from '../hooks/useMousePosition';
import useMousePressed from '../hooks/useMousePressed';
import useWindowSize from '../hooks/useWindowSize';

interface IProps {
  contentsHeight: number;
  scrollY: number;
  sectionRef: RefObject<HTMLDivElement>;
}

function FullpageScrollbar({ contentsHeight, scrollY, sectionRef }: IProps) {
  const handler = useRef<HTMLButtonElement>(null);
  const { y: mouseY } = useMousePosition();
  const isMousePressed = useMousePressed(handler);
  const [handlerHeight, setHandlerHeight] = useState<number>(0);
  const [handlerTop, setHandlerTop] = useState<number>(0);
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const [pressMouseY, setPressMouseY] = useState<number>(0);
  const [pressScrollY, setPressScrollY] = useState<number>(0);

  useEffect(() => {
    setHandlerTop(
      (100 - (windowHeight / contentsHeight) * 100) *
        (scrollY / (contentsHeight - windowHeight))
    );
    setHandlerHeight((windowHeight / contentsHeight) * 100);
  }, [windowHeight, contentsHeight, scrollY]);

  useEffect(() => {
    if (isMousePressed) {
      setPressMouseY(mouseY);
      setPressScrollY(scrollY);
    } else {
      // 삼성브라우저에서 인풋창에 키보드가 사라지는 현상으로 주석처리
      // window.getSelection()?.removeAllRanges();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMousePressed]);

  useEffect(() => {
    if (isMousePressed) {
      const newScrollY =
        ((mouseY - pressMouseY) / windowHeight) * contentsHeight + pressScrollY;

      if (sectionRef.current) {
        sectionRef.current.scrollTo(0, newScrollY);
      }
    }
  }, [
    mouseY,
    pressMouseY,
    windowWidth,
    windowHeight,
    contentsHeight,
    pressScrollY,
    isMousePressed,
    sectionRef,
  ]);

  return (
    <div
      className="react-fullpage__scrollbar"
      style={{ height: `${contentsHeight}px` }}
    >
      <div
        className="react-fullpage__scrollbar-sticker"
        style={{ height: `${windowHeight}px` }}
      >
        <div
          className="react-fullpage__scrollbar-container"
          style={{ height: `${windowHeight}px` }}
        >
          <button
            type="button"
            ref={handler}
            className={`react-fullpage__scrollbar-handler ${
              isMousePressed && 'is-pressed'
            }`}
            style={{ top: `${handlerTop}%`, height: `${handlerHeight}%` }}
            data-is-pressed={isMousePressed}
          ></button>
        </div>
      </div>
    </div>
  );
}

export default FullpageScrollbar;
