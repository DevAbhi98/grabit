import { useDispatch, useSelector } from "react-redux";
import { restaurantActions } from "../../../store/slices/restaurants-slice";
import { forwardRef, useEffect, useRef } from "react";
import useOnScreen from "../../components/hooks/useOnScreen";
import menuData from "../../../../backend/menu.json";

const MenuItem = forwardRef(function MenuItem({ offset, ref, item, onClick }) {
  const sectionRef = useRef();
  const dispatch = useDispatch();

  const isVisible = useOnScreen(sectionRef);

  const menu = JSON.parse(JSON.stringify(menuData)).menu;
  const selectMenuItem = useSelector(
    (state) => state.restaurants.selectMenuItem
  );

  function convertRemToPixels(rem) {
    return (
      rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  }
  console.log("4Rem" + convertRemToPixels(4) + "px");

  function handleItemClick() {
    dispatch(
      restaurantActions.selectMenuItem({
        id: item.id,
      })
    );
    onClick(item);
  }

  return (
    <div
      ref={sectionRef}
      onClick={handleItemClick}
      className="restaurant-details__menu-menu-item"
    >
      <p className={`${item.id === selectMenuItem ? "selected" : ""}`}>
        {item.name}
      </p>
      {item.id === selectMenuItem && (
        <div className="restaurant-details__menu-menu-selected-line" />
      )}
    </div>
  );
});

export default MenuItem;
