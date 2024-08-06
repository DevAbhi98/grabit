import { useDispatch, useSelector } from "react-redux";
import { restaurantActions } from "../../../store/slices/restaurants-slice";
import ImageModal from "./ImageModal";
import AddToCartModal from "./AddToCartModal";
import EditCartItemModal from "./EditCartItemModal";
import "./restaurant-details.scss";
import { useNavigate } from "react-router-dom";

export default function CartItem({ cartItem, index, restaurantId, fromhome }) {
  const dispatch = useDispatch();

  function handleOnCartItemQuantityIncrease() {
    dispatch(
      restaurantActions.increaseCartItemQuantity({
        item: cartItem,
        index,
        restaurantId,
      })
    );
  }

  const currentMenu = useSelector((state) => state.restaurants.currentMenu);

  function findCartItem() {
    console.log(
      "currentMenu",
      currentMenu[0].items.find((item) => item.name === cartItem.name)
    );
    return currentMenu[0].items.find((item) => item.name === cartItem.name);
  }

  const tempCartItem = useSelector((state) => state.restaurants.tempCartItem);
  const editModalIndex = useSelector(
    (state) => state.restaurants.editModalIndex
  );

  function handleOnCartItemQuantityDecrease() {
    dispatch(
      restaurantActions.decreaseCartItemQuantity({
        item: cartItem,
        index,
        restaurantId,
      })
    );
  }

  function handleOnEditClick() {
    console.log("CartIndex", index);
    dispatch(restaurantActions.toggleImageEditModalOpen({ index: index }));
    dispatch(restaurantActions.setCurrentAddToCartItem({ item: cartItem }));
    console.log("CartItemXModifiers", cartItem.modifiers);

    let modifiers = [];

    cartItem.modifiers.items.forEach((item) => {
      item.items.forEach((item2) => {
        if (item2.isChecked) {
          modifiers.push({
            ...item,
            items: [{ ...item2 }],
          });
        }
      });
    });

    console.log("ModifiersX", modifiers);

    dispatch(
      restaurantActions.addItemsToTempCart({
        item: {
          ...cartItem,
          modifiers: modifiers,
          quantity: cartItem.quantity,
        },
      })
    );
  }

  const handleOnClose = () => {
    dispatch(restaurantActions.toggleImageEditModalOpen());
  };

  const isImageEditModalOpen = useSelector(
    (state) => state.restaurants.isImageEditModalOpen
  );

  let addOns = "";

  cartItem.modifiers.items.forEach((element) => {
    addOns = addOns + element.name + ": ";
    element.items.forEach((item) => {
      if (item.isChecked) {
        addOns = addOns + item.name + ", ";
      }
    });
  });

  addOns = addOns.slice(0, -2);

  function calculatePrice() {
    let price = cartItem.price * cartItem.quantity;
    let subPrice = 0;
    if (cartItem.modifiers)
      cartItem.modifiers.items.forEach((item) => {
        console.log("ItemY", item);
        item.items.forEach((item) => {
          if (item.isChecked) {
            let thePrice = 0;
            if (item.price) {
              thePrice = item.price;
            }
            subPrice += thePrice;
          }
        });
      });
    price += subPrice;
    return price.toFixed(2);
  }

  return (
    <>
      <div className="cart-container__cart-item">
        <div className="cart-container__cart-item-divider" />
        <div className="cart-container__cart-item-container">
          <img
            src={cartItem.image}
            className="cart-container__cart-item-image"
          />
          <div className="cart-container__cart-item-details">
            <h4 className="cart-container__cart-item-title">{cartItem.name}</h4>
            <p className="cart-container__cart-item-description">{addOns}</p>
            <p className="cart-container__cart-item-price">
              ${calculatePrice()}
            </p>
          </div>
          <div className="cart-conainer__cart-item-right">
            <div className="cart-container__cart-item-quantity">
              {fromhome ? (
                <p className="quantity-text">Quantity:{cartItem.quantity}</p>
              ) : (
                <>
                  <button
                    onClick={handleOnCartItemQuantityDecrease}
                    className="cart-container__cart-item-quantity-button"
                  >
                    <svg
                      viewBox="0 -192 469.33333 469"
                      xmlns="http://www.w3.org/2000/svg"
                      id="fi_1828901"
                    >
                      <path d="m437.332031.167969h-405.332031c-17.664062 0-32 14.335937-32 32v21.332031c0 17.664062 14.335938 32 32 32h405.332031c17.664063 0 32-14.335938 32-32v-21.332031c0-17.664063-14.335937-32-32-32zm0 0"></path>
                    </svg>
                  </button>
                  <p className="cart-container__cart-item-quantity-number">
                    {cartItem.quantity}
                  </p>
                  <button
                    onClick={handleOnCartItemQuantityIncrease}
                    className="cart-container__cart-item-quantity-button"
                  >
                    <svg
                      id="fi_3524388"
                      enable-background="new 0 0 512 512"
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g>
                        <path d="m467 211h-166v-166c0-24.853-20.147-45-45-45s-45 20.147-45 45v166h-166c-24.853 0-45 20.147-45 45s20.147 45 45 45h166v166c0 24.853 20.147 45 45 45s45-20.147 45-45v-166h166c24.853 0 45-20.147 45-45s-20.147-45-45-45z"></path>
                      </g>
                    </svg>
                  </button>
                </>
              )}
            </div>

            {!fromhome && (
              <div
                onClick={handleOnEditClick}
                className="cart-container__cart-item-edit"
              >
                <p>Edit</p>
              </div>
            )}
          </div>
        </div>
        <div className="cart-container__cart-item-divider" />
      </div>
      {isImageEditModalOpen && editModalIndex === index && (
        <>
          <EditCartItemModal theCartItem={cartItem} index={index} />
        </>
      )}
    </>
  );
}
