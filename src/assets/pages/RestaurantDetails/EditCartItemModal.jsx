import { useDispatch, useSelector } from "react-redux";
import CartSection from "./AddToCartSection";
import { restaurantActions } from "../../../store/slices/restaurants-slice";
import { createPortal } from "react-dom";
import lodag from "lodash";
import { useEffect, useState } from "react";
import ThemeInput from "../../components/Inputs/BigTextArea";

export default function EditCartItemModal({ theCartItem, index }) {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.restaurants.addToCartItem);
  const tempCartItem = useSelector((state) => state.restaurants.tempCartItem);
  const cart = useSelector((state) => state.restaurants.cart);
  const [inputText, setInputText] = useState("");
  const restaurantId = useSelector(
    (state) => state.restaurants.currentRestaurantId
  );

  console.log("CartIndexX", index);

  function handleOnCartItemClose() {
    dispatch(restaurantActions.toggleImageEditModalOpen());
    dispatch(restaurantActions.removeCartItem());
  }

  useEffect(() => {
    setInputText((prevState) => theCartItem.instructions);
  }, []);

  console.log("CartItemXEdit", tempCartItem);

  function increaseQuantity() {
    dispatch(restaurantActions.increaseQuantity());
  }

  function decreaseQuantity() {
    dispatch(restaurantActions.decreaseQuantity());
  }

  function handleOnAddToCart() {
    findItemInCart((found, indexX, quantity) => {
      console.log("ItemFoundX");
      if (found) {
        console.log("ItemFound", index);
        dispatch(
          restaurantActions.setCart({
            index: indexX,
            index2: index,
            quantity: quantity + cartItem.quantity,
            instructions: inputText,
            restaurantId: restaurantId,
            found: found,
          })
        );
      } else {
        console.log("ItemFoundNot");
        dispatch(
          restaurantActions.setCart({
            index: index,
            instructions: inputText,
            restaurantId: restaurantId,
            found: found,
          })
        );
      }
    });
  }

  let theItem = cartItem;

  function calculatePrice() {
    let price = tempCartItem.price * tempCartItem.quantity;
    let subPrice = 0;
    if (tempCartItem.modifiers)
      tempCartItem.modifiers.forEach((item) => {
        console.log("ItemY", item);
        item.items.forEach((item) => {
          let thePrice = 0;
          if (item.price) {
            thePrice = item.price;
          }
          subPrice += thePrice;
        });
      });
    price += subPrice;
    return price.toFixed(2);
  }

  function findItemInCart(onFound) {
    let found1 = false;
    let foundedItem = {};
    let indexX = -1;

    console.log("ItemXData", cart);

    const cartIndex = cart.findIndex(
      (item) => item.id === Number(restaurantId)
    );

    cart[cartIndex].items.forEach((item, indexx) => {
      console.log("ItemXDataIndex1", indexx);
      console.log("ItemXDataIndex2", index);
      // console.log("ItemXData", item);
      if (indexx !== index) {
        if (item.name === tempCartItem.name) {
          console.log("ItemXDataInside", indexx);
          console.log("insideItem");
          console.log("insiItemXDataInsidedeItem", item);
          let items = [];
          let tempItems = tempCartItem.modifiers;
          item.modifiers.items.forEach((item) => {
            tempCartItem.modifiers.forEach((tempItem) => {
              if (item.name === tempItem.name) {
                item.items.forEach((item2) => {
                  tempItem.items.forEach((tempItem) => {
                    if (item2.name === tempItem.name) {
                      items.push(item);
                    }
                  });
                });
              }
            });
          });

          let combinedItems = [];

          items.forEach((item) => {
            const modifier = item;
            const items = item.items.filter((item) => item.isChecked);
            if (items.length > 0) {
              combinedItems.push({ ...modifier, items });
            }
          });

          console.log("CombinedItemsX", combinedItems);
          console.log("CombinedItemsX", tempItems);

          if (lodag.isEqual(combinedItems, tempItems)) {
            console.log("ItemXData", item);
            indexX = indexx;
            found1 = true;
            foundedItem = item;
          }
        }
      }
    });
    onFound(found1, indexX, foundedItem.quantity);
  }

  function handleOnChangeInstructions(e) {
    console.log("MyValue", e.target.value);
    setInputText((prevState) => e.target.value);
  }

  return createPortal(
    <div className="add-to-cart">
      <div className="add-to-cart-modal">
        <div className="add-to-cart-modal__top-section">
          <div className="add-to-cart-modal__top-section-container">
            <h1>{theItem.name}</h1>
            <div
              onClick={handleOnCartItemClose}
              className="add-to-cart-modal__top-section__close-btn"
            >
              <svg
                height="329pt"
                viewBox="0 0 329.26933 329"
                width="329pt"
                xmlns="http://www.w3.org/2000/svg"
                id="fi_1828778"
              >
                <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"></path>
              </svg>
            </div>
          </div>

          <div className="dark-divider" />
        </div>
        <div className="add-to-cart-modal__content">
          <div className="divider" />
          <p className="add-to-cart-modal__description">
            {theItem.description}
          </p>
          <div className="add-to-cart-modal__image">
            <img src={theItem.image} />
          </div>
          {theItem.modifiers &&
            theItem.modifiers.items.map((item) => (
              <CartSection fromCart={true} item={item} cartItem={theItem} />
            ))}
          <div className="add-to-cart-modal__bottom-section">
            <h2 className="add-to-cart-modal__bottom-section-title">
              User Preferences
            </h2>
            <p className="add-to-cart-modal__bottom-section-description m-t-1">
              Update Special Instructions
            </p>
            <ThemeInput
              text={inputText}
              setInputText={handleOnChangeInstructions}
              placeholder="Add your instructions here"
            />
          </div>
        </div>

        <div className="add-to-cart-modal__bottom-btn-section">
          <div className="dark-divider" />
          <div className="add-to-cart-modal__bottom-btn-section__container">
            <div className="add-to-cart-modal__bottom-btn-section__quantity">
              <div className="add-to-cart-modal__bottom-btn-section__quantity-btns">
                <button onClick={decreaseQuantity}>
                  <svg
                    viewBox="0 -192 469.33333 469"
                    xmlns="http://www.w3.org/2000/svg"
                    id="fi_1828901"
                  >
                    <path d="m437.332031.167969h-405.332031c-17.664062 0-32 14.335937-32 32v21.332031c0 17.664062 14.335938 32 32 32h405.332031c17.664063 0 32-14.335938 32-32v-21.332031c0-17.664063-14.335937-32-32-32zm0 0"></path>
                  </svg>
                </button>
                <p>{tempCartItem.quantity}</p>
                <button onClick={increaseQuantity}>
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
              </div>
            </div>
            <div className="add-to-cart-modal__bottom-btn-section__add-btn">
              <button onClick={handleOnAddToCart}>
                Update - ${calculatePrice()}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="backdrop" />
    </div>,
    document.getElementById("modal")
  );
}
