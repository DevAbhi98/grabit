import { useDispatch } from "react-redux";
import restaurant_image from "../../images/restaurant-one.webp";
import { restaurantActions } from "../../../store/slices/restaurants-slice";

export default function RestaurantImages({ restaurant }) {
  const dispatch = useDispatch();

  function toggleImageModal(index) {
    console.log("Opeing image modal", index);
    dispatch(
      restaurantActions.toggleImageModal({
        images: [restaurant.image, ...restaurant.images],
      })
    );
    dispatch(restaurantActions.setCurrentImageIndex({ index }));
  }

  const restaurantImages = restaurant.images.slice(0, 3);

  return (
    <div className="restaurant-images__container">
      <img
        onClick={() => toggleImageModal(0)}
        src={restaurant.image}
        className="restaurant-details__image"
        alt="restaurant-image"
      />

      {restaurantImages.map((image, index) => (
        <div className="restaurant-images__item">
          <img
            onClick={() => toggleImageModal(index + 1)}
            src={image}
            alt="restaurant-image"
          />
        </div>
      ))}

      <div
        onClick={() => toggleImageModal(3)}
        className="restaurant-images__item"
      >
        <div className="restaurant-images__item-more">
          <svg
            viewBox="0 0 426.66667 426.66667"
            xmlns="http://www.w3.org/2000/svg"
            id="fi_1828925"
          >
            <path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0"></path>
          </svg>
          <p>See more</p>
        </div>

        <img src={restaurant.images[3]} alt="restaurant-image" />
      </div>
    </div>
  );
}
