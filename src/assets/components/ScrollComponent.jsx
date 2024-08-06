import React, { useState, useEffect } from "react";

const ScrollComponent = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <p>Current Scroll Position: {scrollPosition}</p>
      {/* Your other component content */}
    </div>
  );
};

export default ScrollComponent;
