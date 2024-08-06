import { useEffect, useRef, useState } from "react";
import FoodItem from "./FoodItem";
import { restaurantActions } from "../../../store/slices/restaurants-slice";
import { useDispatch } from "react-redux";
import useWasSeen from "../../components/hooks/useWasSeen";

export default function MenuSection({ item }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const prevScrollY = useRef(0);

  const handleScroll = () => {
    const currentPosition =
      window.scrollY || document.documentElement.scrollTop;
    setIsScrollingUp(currentPosition < scrollPosition);
    setScrollPosition(currentPosition);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScrollEvent = () => {
      const currentScrollY =
        window.scrollY || document.documentElement.scrollTop;
      setIsScrollingUp(prevScrollY.current > currentScrollY);
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScrollEvent);
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(false);

  function convertRemToPixels(rem) {
    return (
      rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  }

  const targetElement = document.getElementById("menu-section-" + item.id);

  if (targetElement) {
    const rect = targetElement.getBoundingClientRect();

    if (isScrollingUp) {
      // Calculate the visible portion of the element
      const visibleHeight =
        Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

      // Check if at least 60% of the element is visible
      if (visibleHeight >= rect.height * 0.05) {
        dispatch(restaurantActions.selectMenuItem({ id: item.id }));
      }
    } else {
      if (targetElement.offsetTop + convertRemToPixels(38) <= scrollPosition) {
        dispatch(restaurantActions.selectMenuItem({ id: item.id }));
      }
    }
  }

  return (
    <div
      id={`menu-section-${item.id}`}
      className="restaurant-details__menu-section"
    >
      <h1 className="restaurant-details__menu-section-title">{item.name}</h1>
      {item.description && (
        <p className="restaurant-details__menu-section-description">
          {item.description}
        </p>
      )}
      <ul className="restaurant-details__menu-section-items">
        {item.items.map((item) => (
          <FoodItem item={item} />
        ))}
      </ul>
    </div>
  );
}
