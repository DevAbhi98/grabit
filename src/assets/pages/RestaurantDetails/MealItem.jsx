import { useDispatch } from "react-redux";
import { restaurantActions } from "../../../store/slices/restaurants-slice";

export default function MealItem({ item }) {
  const dispatch = useDispatch();

  function handleMealClick() {
    dispatch(
      restaurantActions.setCurrentMeal({
        meal: item.id,
      })
    );
    dispatch(
      restaurantActions.setCurrentMenu({
        id: item.id,
      })
    );
  }

  return (
    <div
      onClick={handleMealClick}
      className="restaurant-details__menu-meal-item"
    >
      <h4>{item.name}</h4>
      <p>${item.time}</p>
    </div>
  );
}
