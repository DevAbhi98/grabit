import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restaurantActions } from "../../../store/slices/restaurants-slice";

export default function AddToCartSectionItem({
  item,
  modifier,
  checkboxType,
  fromCart,
  theCartItem,
}) {
  const checkbox = useRef();
  const dispatch = useDispatch();

  const tempCartItem = useSelector((state) => state.restaurants.tempCartItem);

  useEffect(() => {
    console.log("ItemChangedTemp", true);
    const indexOne = tempCartItem.modifiers.findIndex(
      (i) => modifier.name === i.name
    );

    console.log("FoundModifier", indexOne);

    if (indexOne > -1) {
      const indexTwo = tempCartItem.modifiers[indexOne].items.findIndex(
        (i) => item.name === i.name
      );

      console.log("FoundModifierItem", indexOne);
      if (indexTwo > -1) {
        checkbox.current.checked =
          tempCartItem.modifiers[indexOne].items[indexTwo].isChecked;
      } else {
        checkbox.current.checked = false;
      }
    } else {
      checkbox.current.checked = false;
    }
  }, [tempCartItem.modifiers]);

  function handleOnItemClick() {
    console.log("ItemChanged", true);

    if (checkboxType === "radio") {
      if (!item.isChecked) {
        checkbox.current.checked = true;
        dispatch(
          restaurantActions.settempCartItem({
            item: { ...item, isChecked: checkbox.current.checked },
            modifier,
          })
        );
      }
    } else {
      checkbox.current.checked = !checkbox.current.checked;
      dispatch(
        restaurantActions.settempCartItem({
          item: { ...item, isChecked: checkbox.current.checked },
          modifier,
        })
      );
    }
  }

  function handleOnChange() {
    console.log("ItemChanged", true);
    if (fromCart) {
      dispatch(
        restaurantActions.settempCartItem({
          item: { ...item, isChecked: checkbox.current.checked },
          modifier,
        })
      );
    } else {
      dispatch(
        restaurantActions.settempCartItem({
          item: { ...item, isChecked: checkbox.current.checked },
          modifier,
        })
      );
    }
  }

  console.log("itemCheckbox", checkboxType);

  return (
    <div
      onClick={handleOnItemClick}
      className="add-to-cart-modal__bottom-section-item"
    >
      <div className="add-to-cart-modal__bottom-section-item-details-container">
        <input
          className="add-to-cart-modal__bottom-section-item-checkbox"
          type={checkboxType}
          ref={checkbox}
          isChecked={item.isChecked}
          onClick={handleOnChange}
        />
        <div className="add-to-cart-modal__bottom-section-item-details">
          <h3 className="add-to-cart-modal__bottom-section-item-title">
            {item.name}
          </h3>
          <p className="add-to-cart-modal__bottom-section-item-description">
            {item.calories && item.calories > 0 && item.calories + " cal"}
          </p>
        </div>
        {item.price > 0 && (
          <p className="add-to-cart-modal__bottom-section-item-price">
            ${item.price}
          </p>
        )}
      </div>

      <div className="divider" />
    </div>
  );
}
