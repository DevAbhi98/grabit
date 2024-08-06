// ScrollListener.js
import React, { useEffect, useState } from "react";

const ScrollListenerComponent = ({ children, onScrollDown, onScrollUp }) => {
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const handleScroll = () => {
    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollTop > lastScrollTop) {
      onScrollDown();
    } else {
      onScrollUp();
    }

    setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return <>{children}</>;
};

export default ScrollListenerComponent;
