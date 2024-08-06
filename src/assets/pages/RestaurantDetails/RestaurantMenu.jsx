import { createRef, useEffect, useRef, useState } from "react";
import MealItem from "./MealItem";
import MenuItem from "./MenuItem";
import { useSelector } from "react-redux";
import MenuSection from "./MenuSection";
import { ref } from "firebase/database";
import menuData from "../../../../backend/menu.json";

export default function RestaurantMenu({ offset }) {
  const [mealVisible, setMealVisible] = useState(false);

  const currentMealId = useSelector((state) => state.restaurants.currentMealId);
  const currentMenu = useSelector((state) => state.restaurants.currentMenu);
  const selectMenuItem = useSelector(
    (state) => state.restaurants.selectMenuItem
  );

  const menuSections = useRef();
  const refs = currentMenu.reduce((acc, value) => {
    acc[value.id] = createRef();
    return acc;
  }, {});
  const mealIdToName = {
    1: "lunch",
    2: "dinner",
    3: "breakfast",
  };
  const currentMealName = mealIdToName[currentMealId];

  console.log("CurrentMenu", currentMenu);

  function handleMealDropdown() {
    setMealVisible((prevState) => !prevState);
  }

  const menulist = useRef();

  if (selectMenuItem >= 8) {
    menulist.current.scrollLeft =
      menulist.current.scrollWidth - menulist.current.clientWidth;
  } else if (selectMenuItem <= 3) {
  }

  function handleLeftArrowClick() {
    menulist.current.scrollLeft = 0;
  }
  function handleRightArrowClick() {
    menulist.current.scrollLeft =
      menulist.current.scrollWidth - menulist.current.clientWidth;
  }

  const menu = JSON.parse(JSON.stringify(menuData)).menu[currentMealName].items;

  const handleMenuClicked = (item) => {
    const id = `menu-section-${item.id}`;
    var element = document.getElementById(id);
    var headerOffset = convertRemToPixels(14);
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  function convertRemToPixels(rem) {
    return (
      rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  }

  return (
    <div className="restaurant-details__menu">
      <div className="divider" />

      <div className="restaurant-details__menu-div">
        <div className="restaurant-details__menu-meal">
          <div
            onClick={handleMealDropdown}
            className="restaurant-details__menu-meal-dropdown"
          >
            <div className="restaurant-details__menu-meal-dropdown-box">
              <h3>
                {currentMealName.replace(/^./, (str) => str.toUpperCase())} Menu
              </h3>
              <svg
                version="1.1"
                id="fi_32195"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 451.847 451.847"
                xmlSpace="preserve"
              >
                <g>
                  <path
                    d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751
      c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0
      c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"
                  ></path>
                </g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
              </svg>
            </div>
            <div
              className={`restaurant-details__menu-meal-items ${
                mealVisible ? " visible" : " hidden"
              }`}
            >
              <MealItem
                item={{ id: 1, name: "Lunch", time: "10:30 AM - 4:59 PM" }}
              />
              <MealItem
                item={{
                  id: 2,
                  name: "Dinner",
                  time: "5:00 AM - 2:29 AM",
                }}
              />
              <MealItem
                item={{
                  id: 3,
                  name: "Breakfast",
                  time: "3:00 AM - 10:29 PM",
                }}
              />
            </div>
          </div>

          <div className="restaurant-details__menu-meal-search">
            <svg
              version="1.1"
              id="fi_54481"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 612.01 612.01"
              xmlSpace="preserve"
            >
              <g>
                <g id="_x34__4_">
                  <g>
                    <path
                      d="M606.209,578.714L448.198,423.228C489.576,378.272,515,318.817,515,253.393C514.98,113.439,399.704,0,257.493,0
              C115.282,0,0.006,113.439,0.006,253.393s115.276,253.393,257.487,253.393c61.445,0,117.801-21.253,162.068-56.586
              l158.624,156.099c7.729,7.614,20.277,7.614,28.006,0C613.938,598.686,613.938,586.328,606.209,578.714z M257.493,467.8
              c-120.326,0-217.869-95.993-217.869-214.407S137.167,38.986,257.493,38.986c120.327,0,217.869,95.993,217.869,214.407
              S377.82,467.8,257.493,467.8z"
                    ></path>
                  </g>
                </g>
              </g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </svg>
            <input placeholder="Search" />
          </div>
        </div>
        <div className="restaurant-details__menu-items-div">
          <div className="restaurant-details__menu-icons">
            <div className="menu">
              <svg
                enable-background="new 0 0 512 512"
                height="512"
                viewBox="0 0 512 512"
                width="512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m128 102.4c0-14.138 11.462-25.6 25.6-25.6h332.8c14.138 0 25.6 11.462 25.6 25.6s-11.462 25.6-25.6 25.6h-332.8c-14.138 0-25.6-11.463-25.6-25.6zm358.4 128h-460.8c-14.138 0-25.6 11.463-25.6 25.6 0 14.138 11.462 25.6 25.6 25.6h460.8c14.138 0 25.6-11.462 25.6-25.6 0-14.137-11.462-25.6-25.6-25.6zm0 153.6h-230.4c-14.137 0-25.6 11.462-25.6 25.6 0 14.137 11.463 25.6 25.6 25.6h230.4c14.138 0 25.6-11.463 25.6-25.6 0-14.138-11.462-25.6-25.6-25.6z" />
              </svg>
            </div>
            <div onClick={handleLeftArrowClick} className="left-menu-arrow">
              <svg
                version="1.1"
                id="fi_271220"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 492 492"
                xmlSpace="preserve"
              >
                <g>
                  <g>
                    <path
                      d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12
          C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084
          c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864
          l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z"
                    ></path>
                  </g>
                </g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
              </svg>
            </div>
          </div>
          <ul ref={menulist}>
            <div className="restaurant-details__menu-menu">
              {menu.map((item) => (
                <li>
                  <MenuItem
                    offset={offset}
                    ref={menuSections}
                    item={item}
                    onClick={handleMenuClicked}
                  />
                </li>
              ))}
            </div>
          </ul>
          <div onClick={handleRightArrowClick} className="right-menu-arrow">
            <svg
              version="1.1"
              id="fi_271228"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 492.004 492.004"
              xmlSpace="preserve"
            >
              <g>
                <g>
                  <path
                    d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12
          c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028
          c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265
          c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"
                  ></path>
                </g>
              </g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </svg>
          </div>
        </div>
        <div className="restaurant-details_menu-menu-line" />
      </div>

      <div className="restaurant-details__menu-items">
        <ul
          id="food-sections"
          ref={menuSections}
          className="restaurant-details__menu-list"
        >
          {currentMenu.map((item, index) => {
            const ref = createRef();
            return (
              <li key={index} ref={refs[item.id]}>
                <MenuSection item={item} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
