import { useState, useEffect, RefObject } from 'react';

export default function useElementSize(elementRef: RefObject<HTMLDivElement>) {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const targetElement = elementRef.current;

    if (!targetElement) return;

    const setElementSize = () => {
      const targetWidth = targetElement ? targetElement.clientWidth : 0;
      const targetHeight = targetElement ? targetElement.clientHeight : 0;

      setWidth(targetWidth);
      setHeight(targetHeight);
    };

    const resizeObserver = new ResizeObserver(() => {
      setElementSize();
    });

    setElementSize();
    resizeObserver.observe(targetElement);

    return () => resizeObserver.disconnect(); // clean up
  }, [elementRef]);

  return { width, height };
}
