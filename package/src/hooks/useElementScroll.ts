import { useState, useEffect, RefObject } from 'react';
import useWindowSize from './useWindowSize';

export default function useElementScroll(
  elementRef: RefObject<HTMLDivElement>,
  contentsHeight: number
) {
  const [scrollPosition, setScrollPosition] = useState({
    scrollX: 0,
    scrollY: 0,
    isAtTop: true,
    isAtBottom: false,
    hasScrollbar: false,
  });
  const { height: windowHeight } = useWindowSize();

  useEffect(() => {
    const targetElement = elementRef.current;

    if (!targetElement) return;

    function handleScroll() {
      const scrollTop = targetElement ? targetElement.scrollTop : 0;
      const isAtTop = scrollTop <= 0;
      const clientHeight = targetElement ? targetElement.clientHeight : 0;
      const isAtBottom = contentsHeight - scrollTop <= clientHeight + 1;
      const hasScrollbar = contentsHeight > clientHeight;

      setScrollPosition({
        scrollX: targetElement?.scrollLeft || 0,
        scrollY: targetElement?.scrollTop || 0,
        isAtTop,
        isAtBottom,
        hasScrollbar,
      });
    }

    handleScroll();
    targetElement.addEventListener('scroll', handleScroll);

    return () => {
      if (targetElement) {
        targetElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [elementRef, contentsHeight, windowHeight]);

  return scrollPosition;
}
