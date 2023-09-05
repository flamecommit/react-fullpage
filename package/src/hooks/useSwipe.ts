import { useEffect, RefObject } from 'react';

const SWIPE_THRESHOLD = 30;

export type SwipeDirection = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const calculateDirection = (x: number, y: number): SwipeDirection => {
  const angle = Math.atan2(y, x) * (180 / Math.PI);

  if (angle >= -45 && angle <= 45) {
    return 'RIGHT';
  }
  if (angle >= 45 && angle <= 135) {
    return 'DOWN';
  }
  if (angle >= -135 && angle <= -45) {
    return 'UP';
  }
  return 'LEFT';
};

const useSwipe = (
  ref: RefObject<HTMLElement>,
  {
    onSwipeStart,
    onSwipeEnd,
  }: {
    onSwipeStart?: () => void;
    onSwipeEnd?: (direction: SwipeDirection) => void;
  }
) => {
  useEffect(() => {
    let startX: number;
    let startY: number;
    let endX: number;
    let endY: number;
    let isSwiping = false;

    const handleTouchStart = (event: TouchEvent) => {
      if (!ref.current || !event.touches[0]) return;

      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
      isSwiping = true;

      if (onSwipeStart) {
        onSwipeStart();
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isSwiping || !ref.current || !event.touches[0]) return;

      endX = event.touches[0].clientX;
      endY = event.touches[0].clientY;

      const deltaX = endX - startX;
      const deltaY = endY - startY;

      if (
        Math.abs(deltaX) > SWIPE_THRESHOLD ||
        Math.abs(deltaY) > SWIPE_THRESHOLD
      ) {
        const direction = calculateDirection(deltaX, deltaY);
        if (onSwipeEnd) {
          onSwipeEnd(direction);
        }
        isSwiping = false;
      }
    };

    const handleTouchEnd = () => {
      isSwiping = false;
    };

    const element = ref.current;

    element?.addEventListener('touchstart', handleTouchStart, {
      passive: true,
    });
    element?.addEventListener('touchmove', handleTouchMove, {
      passive: true,
    });
    element?.addEventListener('touchend', handleTouchEnd);

    return () => {
      element?.removeEventListener('touchstart', handleTouchStart);
      element?.removeEventListener('touchmove', handleTouchMove);
      element?.removeEventListener('touchend', handleTouchEnd);
    };
  }, [ref, onSwipeStart, onSwipeEnd]);
};

export default useSwipe;
