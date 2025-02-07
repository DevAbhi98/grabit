import { Link } from "react-router-dom";
import LikeButton from "../../../components/Buttons/LikeButton";
import Rating from "./Rating";

export default function RestaurantCard({ category, id, restaurant }) {
  return (
    <Link className="restaurant-card-link" to={`${restaurant.id}`}>
      <div id={`${category}-restaurant-${id}`} className="restaurant-card">
        <div className="top-section">
          <img src={restaurant.image} />
          <h2>{restaurant.name}</h2>
          <div className="shadow" />
          <Rating />
        </div>
        <div className="delivery-section">
          <svg
            height="1rem"
            viewBox="0 0 32 32"
            width="1rem"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="_40-Fast-delivery" data-name="40-Fast-delivery">
              <path d="m29.91 15.6-2.21-5a1 1 0 0 0 -.91-.6h-5.35l.32-2.89a1 1 0 0 0 -.25-.78 1 1 0 0 0 -.74-.33h-13.77a1 1 0 0 0 0 2h5a1 1 0 0 1 0 2h-7a1 1 0 0 0 0 2h10a1 1 0 0 1 0 2h-7a1 1 0 0 0 0 2h4a1 1 0 0 1 0 2h-8a1 1 0 0 0 0 2h2a1 1 0 0 1 0 2h-1a1 1 0 0 0 0 2h2.85a2.78 2.78 0 0 0 .6 1.14 2.58 2.58 0 0 0 1.93.86 3.13 3.13 0 0 0 2.83-2h7.64a2.78 2.78 0 0 0 .6 1.14 2.58 2.58 0 0 0 1.93.86 3.13 3.13 0 0 0 2.83-2h2a1 1 0 0 0 1-.89l.77-7a.89.89 0 0 0 -.07-.51zm-19.53 8.4a.55.55 0 0 1 -.44-.19.9.9 0 0 1 -.19-.7 1.23 1.23 0 0 1 1.08-1.11.55.55 0 0 1 .44.19.9.9 0 0 1 .19.7 1.23 1.23 0 0 1 -1.08 1.11zm13 0a.55.55 0 0 1 -.44-.19.9.9 0 0 1 -.19-.7 1.23 1.23 0 0 1 1.08-1.11.55.55 0 0 1 .44.19.9.9 0 0 1 .19.7 1.23 1.23 0 0 1 -1.08 1.11zm4.5-7h-4.42a1 1 0 0 1 -.74-.33 1 1 0 0 1 -.25-.78l.33-3a1 1 0 0 1 1-.88h2.33l1.87 4.15z" />
              <path d="m4 16a1 1 0 0 0 0-2h-1a1 1 0 0 0 0 2z" />
            </g>
          </svg>
          <p>{restaurant.distance}</p>
          <div className="dot" />
          <p>{restaurant.cooking_time}</p>
          <p className="reviews">{restaurant.status}</p>
        </div>
        <p className="address">{restaurant.address}</p>
        <LikeButton />
      </div>
    </Link>
  );
}
