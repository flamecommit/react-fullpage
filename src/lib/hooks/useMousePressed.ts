import { useEffect, useState, RefObject } from 'react';

const useMousePressed = (targetRef: RefObject<HTMLElement>) => {
  const [isMousePressed, setIsMousePressed] = useState<boolean>(false);

  const handleMouseDown = () => {
    setIsMousePressed(true);
  };

  const handleMouseUp = () => {
    setIsMousePressed(false);
  };

  useEffect(() => {
    const targetElement =
      'current' in targetRef ? targetRef.current : (targetRef as HTMLElement);

    if (!targetElement) return;

    targetElement.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      targetElement.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [targetRef]);

  return isMousePressed;
};

export default useMousePressed;
