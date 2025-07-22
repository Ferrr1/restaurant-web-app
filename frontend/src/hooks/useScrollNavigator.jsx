import { useRef } from "react";

export const useScrollNavigator = () => {
  const scrollRef = useRef(null);

  const handleScroll = (direction = "right", percentage = 0.5) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.offsetWidth * percentage;

      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return { scrollRef, handleScroll };
};
