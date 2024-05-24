import { useEffect, useRef, useState } from 'react';

export default function useSwipe(data: any) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;

      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft <= scrollWidth - clientWidth);
    }
  };

  const scroll = (direction: 'right' | 'left') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 500;
      if (direction === 'left') {
        current.scrollTo({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
      }
    }

    checkScroll();
  };

  return { scroll, scrollContainerRef, showLeftButton, showRightButton };
}
