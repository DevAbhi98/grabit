import telephone from "../../images/telephone.svg";
import location from "../../images/location-pin.svg";
import { useState } from "react";

export default function RestaurantTopSection({ restaurant }) {
  const [infoActive, setInfoActive] = useState(false);

  function handleOnInfoClick() {
    setInfoActive((prev) => !prev);
  }

  return (
    <div className="restaurant-details__top-section">
      <div className="restaurant-details__top-section-left">
        <h1 className="restaurant-details__title">{restaurant.name}</h1>
        <div className="restaurant-details__rating">
          <p className="restaurant-details__rating-number">
            {restaurant.rating}
          </p>
          <svg viewBox="0 -10 511.98685 511" xmlns="http://www.w3.org/2000/svg">
            <path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0" />
          </svg>
          <p className="restaurant-details__rating-text">
            ({restaurant.reviews} reviews)
          </p>
          <p className="restaurant-details__rating-text">|</p>
          {restaurant.food_type.map((type, index) => (
            <>
              <p className="restaurant-details__rating-text">{type}</p>
              {index !== restaurant.food_type.length - 1 && (
                <p className="restaurant-details__rating-text">•</p>
              )}
            </>
          ))}
          <p className="restaurant-details__rating-text">|</p>
          <p className="restaurant-details__rating-text">
            {restaurant.distance}
          </p>
          <p className="restaurant-details__rating-text">•</p>
          <p className="restaurant-details__rating-text">
            {restaurant.cooking_time}
          </p>
        </div>
        <div className="restaurant-details__address">
          <p className="restaurant-details__address-text">
            {restaurant.address}
          </p>
        </div>
      </div>

      <div className="restaurant-details__top-section-right">
        <div
          onClick={handleOnInfoClick}
          className="restaurant-details__top-section-right-top"
        >
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            id="fi_2740648"
          >
            <g id="Layer_15" data-name="Layer 15">
              <path d="m16 2a14 14 0 1 0 14 14 14 14 0 0 0 -14-14zm0 26a12 12 0 1 1 12-12 12 12 0 0 1 -12 12zm-4-12a2 2 0 1 1 -2-2 2 2 0 0 1 2 2zm6 0a2 2 0 1 1 -2-2 2 2 0 0 1 2 2zm6 0a2 2 0 1 1 -2-2 2 2 0 0 1 2 2z"></path>
            </g>
          </svg>
          <div
            className={`restaurant-details__top-section-right-top-details ${
              infoActive ? "active" : ""
            }`}
          >
            <div className="restaurant-details__top-section-right-top-details-item">
              <p>Get Directions</p>
            </div>

            <div className="restaurant-details__top-section-right-top-details-item">
              <p>Call</p>
            </div>
          </div>
        </div>
        <div className="restaurant-details__buttons">
          <div className="restaurant-details__telephone">
            <button className="restaurant-details__telephone-button">
              <img src={telephone} alt="telephone" />
            </button>
            <p>Call</p>
          </div>

          <div className="restaurant-details__telephone">
            <button className="restaurant-details__telephone-button">
              <img src={location} alt="telephone" />
            </button>
            <p>Get Directions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
