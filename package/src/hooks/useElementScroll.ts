import { useState, useEffect, RefObject } from 'react';

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
    scrollHeight: 0,
  });

  useEffect(() => {
    const targetElement = elementRef.current;

    if (!targetElement) return;

    function handleScroll() {
      const scrollHeight = targetElement ? targetElement.scrollHeight : 0;
      const scrollTop = targetElement ? targetElement.scrollTop : 0;
      const isAtTop = scrollTop <= 0;
      const clientHeight = targetElement ? targetElement.clientHeight : 0;
      const isAtBottom = scrollHeight - scrollTop <= clientHeight + 1;
      const hasScrollbar = scrollHeight > clientHeight;

      setScrollPosition({
        scrollX: targetElement?.scrollLeft || 0,
        scrollY: targetElement?.scrollTop || 0,
        isAtTop,
        isAtBottom,
        hasScrollbar,
        scrollHeight,
      });
    }

    handleScroll();
    targetElement.addEventListener('scroll', handleScroll);

    return () => {
      if (targetElement) {
        targetElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [elementRef, contentsHeight]);

  return scrollPosition;
}
