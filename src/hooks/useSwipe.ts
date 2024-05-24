import { useEffect, useRef, useState } from 'react';

export default function useSwipe(data: any) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current;

        setShowLeftButton(scrollLeft > 0);
        setShowRightButton(scrollLeft <= scrollWidth - clientWidth);
      }
    };
    checkScroll();
  }, [data]);

  const scroll = (direction: any) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 500;
      if (direction === 'left') {
        current.scrollTo({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return { scroll, scrollContainerRef, showLeftButton, showRightButton };
}
