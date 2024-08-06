import { useDispatch, useSelector } from "react-redux";
import burger from "../../images/burger.webp";
import { restaurantActions } from "../../../store/slices/restaurants-slice";
import { useMutation } from "@tanstack/react-query";
import { addItemToCart } from "../../../util/http";

export default function FoodItem({ item }) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.restaurants.cart);

  function handleOnItemClick() {
    dispatch(restaurantActions.toggleCartItemModal());
    dispatch(restaurantActions.setCurrentAddToCartItem({ item }));
    dispatch(
      restaurantActions.addItemsToTempCart({
        item: {
          ...item,
          modifiers: [],
          quantity: 1,
        },
      })
    );
  }

  return (
    <div className="restaurant-details__menu-section-item">
      <img
        className="restaurant-details__menu-section-item-image"
        src={item.image}
      />
      <div className="restaurant-details__menu-section-item-info">
        <h2 className="restaurant-details__menu-section-item-name">
          {item.name}
        </h2>
        <p className="restaurant-details__menu-section-item-price">
          ${item.price}
        </p>
      </div>

      <p className="restaurant-details__menu-section-item-description">
        {item.description}
      </p>

      <button
        onClick={handleOnItemClick}
        className="restaurant-details__menu-section-item-add-button"
      >
        Add
      </button>
    </div>
  );
}
