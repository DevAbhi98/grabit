import { createSlice, current } from "@reduxjs/toolkit";
import { addItemToCart } from "../../util/http";
import menu from "../../../backend/menu.json";

// const initialState = {
//     restaurants:[]
// }

const initialState = {
  cartNav: false,
  isImageEditModalOpen: false,
  addToCartItem: {},
  tempCartItem: {
    modifiers: [],
  },
  cart: [],
  currentMealId: 1,
  isImageModalOpen: false,
  currentImageIndex: 0,
  selectMenuItem: 1,
  currentMenu: [],
  cartItemModal: false,
  imageModalImages: [],
  restaurants: [],
  currentRestaurantId: -999,
  editModalIndex: -1,
  onCheckout: false,
};

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    // check if the state.tempCartItem.modifiers array has any element with same name value as modifier name value
    // if we do not have an item with same modifier name we add the modifier in the state.tempCartItem.modifiers, and add an array named items, and add the item form payload to that array
    // if we do have a same value we check if the items array in that modifier as an item with same name value as the payload item name value
    // if have this condition we now check if the requiredSelection value from modifier is greater than 1
    // if that is true, we remove the item if the isChecked value is false
    // if the requiredSelection value is 1, we check if the isChecked value is true or false, if its true, we remove any element from the items array that does not have the same name value as the payload item name value

    setRestaurantId(state, action) {
      state.currentRestaurantId = action.payload.id;
    },

    saveRestaurants(state, action) {
      state.restaurants = [...action.payload.restaurants];
    },

    toggleImageEditModalOpen(state, action) {
      state.isImageEditModalOpen = !state.isImageEditModalOpen;
      if (action.payload) {
        state.editModalIndex = action.payload.index;
      }
    },
    setCartWindow(state, action) {
      state.cartNav = action.open;
    },

    toggleCartOpen(state, action) {
      state.cartNav = !state.cartNav;
    },

    increaseCartItemQuantity(state, action) {
      const index = state.cart.findIndex(
        (i) => i.id === Number(action.payload.restaurantId)
      );

      console.log("IncreaseItemIndex", index);

      if (index != -1) {
        state.cart[index].items[action.payload.index].quantity++;
      }
      addItemToCart(state.cart);
    },

    decreaseCartItemQuantity(state, action) {
      const cartIndex = state.cart.findIndex(
        (i) => i.id === Number(action.payload.restaurantId)
      );
      if (action.payload.index != -1 && cartIndex != -1) {
        if (
          !(state.cart[cartIndex].items[action.payload.index].quantity <= 1)
        ) {
          state.cart[cartIndex].items[action.payload.index].quantity--;
        } else {
          state.cart.splice(cartIndex, 1);
          state.cartItemModal = false;
          state.addToCartItem = {};
          state.tempCartItem = {
            modifiers: [],
          };
        }
      }
      addItemToCart(state.cart);
    },

    addItemsToTempCart(state, action) {
      state.tempCartItem = {
        ...action.payload.item,
      };
      console.log("SeeTemCartItem", state.tempCartItem);
    },
    addToCart(state, action) {
      const itemX = state.tempCartItem.modifiers;

      console.log("ItemNameX", { ...itemX });

      itemX.forEach((element) => {
        element.items.forEach((element1) => {
          console.log("ItemNameX: ", element1.name + element1.isChecked);
        });
      });

      console.log(
        "AddToCartItem",
        JSON.parse(JSON.stringify(state.addToCartItem))
      );

      state.addToCartItem.modifiers.items.forEach((element) => {
        element.items.forEach((element1) => {
          console.log("CheckboxItems", { ...element1 });
        });
      });

      state.addToCartItem.modifiers.items.forEach((element1) => {
        state.tempCartItem.modifiers.forEach((element2) => {
          if (element1.name === element2.name) {
            console.log("ItemNameModifiers: ", element1.name);
            element1.items.forEach((element3) => {
              element2.items.forEach((element4) => {
                if (element3.name === element4.name) {
                  element3.isChecked = true;
                  console.log("ItemNameU", element3.name + element3.isChecked);
                } else {
                  element3.isChecked = false;
                }
              });
            });
          }
        });
      });

      state.addToCartItem.modifiers.items.forEach((element) => {
        element.items.forEach((element1) => {
          console.log("ItemNameY", element1.name + element1.isChecked);
        });
      });

      state.addToCartItem.instructions = action.payload.instructions;

      const index = state.cart.findIndex(
        (item) => item.id === Number(action.payload.restaurantId)
      );

      if (index === -1) {
        state.cart = [
          ...state.cart,
          {
            id: Number(action.payload.restaurantId),
            items: [state.addToCartItem],
          },
        ];
      } else {
        console.log("CartIndex", index);

        state.cart[index].items = [
          ...state.cart[index].items,
          state.addToCartItem,
        ];
      }

      addItemToCart(state.cart, action.payload.restaurantId);
      state.cartItemModal = false;
      state.isImageEditModalOpen = false;
      state.addToCartItem = {};
      state.tempCartItem = {
        modifiers: [],
      };
    },

    clearRestaurantCart(state, action) {
      state.cart.forEach((element) => {
        if (Number(action.payload) === element.id) {
          state.cart.splice(state.cart.indexOf(element), 1);
        }
      });
    },

    setCartItems(state, action) {
      action.payload.cart && (state.cart = action.payload.cart);
      console.log("TheCartItems", action.payload.cart);
    },
    setCart(state, action) {
      console.log(
        "AddToCartItem",
        JSON.parse(JSON.stringify(state.addToCartItem))
      );
      state.addToCartItem.modifiers.items.forEach((element1) => {
        console.log("addToCartModifier", element1);
        state.tempCartItem.modifiers.forEach((element2) => {
          if (element1.name === element2.name) {
            element1.items.forEach((element3) => {
              console.log("ItemNameU", element3.name + element3.isChecked);
              element2.items.forEach((element4) => {
                console.log("ItemNameT", element4.name + element4.isChecked);
                if (element3.name === element4.name) {
                  element3.isChecked = true;
                } else {
                  element3.isChecked = false;
                }
              });
            });
          }
        });
      });

      if (action.payload) {
        if (action.payload.quantity) {
          state.addToCartItem.quantity = action.payload.quantity;
        } else {
          state.addToCartItem.quantity = state.tempCartItem.quantity;
        }
      }

      console.log("CartJson: ", JSON.parse(JSON.stringify(state.cart)));

      if (action.payload) {
        console.log("CartJson: ", action.payload.index);
      }

      state.addToCartItem.instructions = action.payload.instructions;

      const index = state.cart.findIndex(
        (item) => item.id === Number(action.payload.restaurantId)
      );

      if (action.payload.found) {
        console.log("ItemFoundPInside", action.payload.index);
        const index = state.cart.findIndex(
          (item) => item.id === Number(action.payload.restaurantId)
        );

        console.log("ItemFoundP", index);

        if (action.payload.index !== undefined) {
          console.log(
            "ItemFoundCart",
            JSON.parse(JSON.stringify(state.addToCartItem))
          );
          state.cart[index].items[action.payload.index2] = state.addToCartItem;
          state.cart[index].items.splice(action.payload.index, 1);
          console.log("ItemFoundCart1", action.payload.index);
          console.log("ItemFoundCart2", action.payload.index2);
          console.log(
            "ItemFoundCart",
            JSON.parse(JSON.stringify(state.cart[index].items))
          );
        }
      } else {
        console.log("ItemFoundP", action.payload.index);
        state.cart[index].items[action.payload.index] = state.addToCartItem;
      }

      console.log("CartJson: ", JSON.parse(JSON.stringify(state.cart)));
      addItemToCart(state.cart);
      state.cartItemModal = false;
      state.isImageEditModalOpen = false;
      state.addToCartItem = {};
      state.tempCartItem = {
        modifiers: [],
      };
    },

    increaseQuantity(state, action) {
      state.tempCartItem.quantity++;
    },

    decreaseQuantity(state, action) {
      if (!(state.tempCartItem.quantity <= 1)) {
        state.tempCartItem.quantity--;
      } else {
        const cartIndex = state.cart.findIndex(
          (i) => i.name === state.tempCartItem.name
        );

        if (cartIndex != -1) {
          state.cart.splice(cartIndex, 1);
        }

        state.cartItemModal = false;
        state.addToCartItem = {};
        state.tempCartItem = {
          modifiers: [],
        };
      }
    },
    setCartItem(state, action) {
      const modifier = action.payload.modifier;
      const item = action.payload.item;
      const cartItem = action.payload.cartItem;

      const cartItemIndex = state.cart.findIndex(
        (item) => cartItem.name === item.name
      );

      if (cartIndex != -1) {
        const modifierIndex = state.cart[cartItemIndex].modifiers.findIndex(
          (modifierItem) => modifierItem.name === modifier.name
        );

        if (modifierIndex === -1) {
          console.log("ItemXAdding");
          state.cart[cartItemIndex] = {
            ...state.cartItem,
            modifiers: [
              ...state.cart[cartItemIndex].modifiers,
              {
                ...modifier,
                items: [item],
              },
            ],
          };
        } else {
          if (modifier.requiredSelection === 1) {
            if (item.isChecked) {
              console.log("ItemXAdding");
              state.cart[cartItemIndex].modifiers[modifierIndex].items = [
                ...state.cart[cartItemIndex].modifiers[modifierIndex].items,
                item,
              ];
              console.log("ItemXFiltering");
              state.cart[cartItemIndex].modifiers[modifierIndex].items.forEach(
                (element, index) => {
                  if (element.name !== item.name) {
                    state.cart[cartItemIndex].modifiers[
                      modifierIndex
                    ].items.splice(index, 1);
                  }
                }
              );

              console.log(
                "ItemXFilteredItems",
                state.cart[cartItemIndex].modifiers[modifierIndex].items
              );
            }
          } else {
            const itemIndex = state.cart[cartItemIndex].modifiers[
              modifierIndex
            ].items.findIndex((i) => i.name === item.name);
            if (item.isChecked) {
              if (itemIndex === -1) {
                console.log("ItemXAddingCheckbox");
                state.cart[cartItemIndex].modifiers[modifierIndex].items = [
                  ...state.cart[cartItemIndex].modifiers[modifierIndex].items,
                  item,
                ];
              }
            } else {
              console.log("ItemXFilteringCheckbox");
              state.cart[cartItemIndex].modifiers[modifierIndex].items.forEach(
                (element, index) => {
                  if (element.name === item.name) {
                    state.cart[cartItemIndex].modifiers[
                      modifierIndex
                    ].items.splice(index, 1);
                  }
                }
              );
              console.log(
                "ItemXFilteredItemsCheck",
                state.cart[cartItemIndex].modifiers[modifierIndex].items.length
              );
            }
          }
          console.log("ItemXFinalList", state.cart[cartItemIndex]);
        }
      }
    },
    settempCartItem(state, action) {
      const isUpdate = action.payload.isUpdate;
      const modifier = action.payload.modifier;
      const item = action.payload.item;
      const index = action.payload.index;
      console.log("ChangingTempCart");

      const modifierIndex = state.tempCartItem.modifiers.findIndex(
        (modifierItem) => modifierItem.name === modifier.name
      );

      state.tempCartItem.modifiers.forEach((element, index) => {
        element.items.forEach((element1, index1) => {
          if (element1.name === item.name) {
            element1.splice(index, 0);
          }
        });
      });

      if (modifierIndex === -1) {
        console.log("ItemXAdding");
        state.tempCartItem = {
          ...state.addToCartItem,
          modifiers: [
            ...state.tempCartItem.modifiers,
            {
              ...modifier,
              items: [item],
            },
          ],
        };
      } else {
        if (modifier.requiredSelection === 1) {
          console.log("ItemXChecked", item.isChecked);
          if (item.isChecked) {
            console.log("ItemXAdding");
            state.tempCartItem.modifiers[modifierIndex].items = [
              ...state.tempCartItem.modifiers[modifierIndex].items,
              item,
            ];
            console.log("ItemXFiltering");
            state.tempCartItem.modifiers[modifierIndex].items.forEach(
              (element, index) => {
                if (element.name !== item.name) {
                  state.tempCartItem.modifiers[modifierIndex].items.splice(
                    index,
                    1
                  );
                }
              }
            );

            console.log(
              "ItemXFilteredItems",
              state.tempCartItem.modifiers[modifierIndex].items
            );
          }
        } else {
          const itemIndex = state.tempCartItem.modifiers[
            modifierIndex
          ].items.findIndex((i) => i.name === item.name);
          if (item.isChecked) {
            if (itemIndex === -1) {
              console.log("ItemXAddingCheckbox");
              state.tempCartItem.modifiers[modifierIndex].items = [
                ...state.tempCartItem.modifiers[modifierIndex].items,
                item,
              ];
            }
          } else {
            console.log("ItemXFilteringCheckbox");
            state.tempCartItem.modifiers[modifierIndex].items.forEach(
              (element, index) => {
                if (element.name === item.name) {
                  state.tempCartItem.modifiers[modifierIndex].items.splice(
                    index,
                    1
                  );
                }
              }
            );
            console.log(
              "ItemXFilteredItemsCheck",
              state.tempCartItem.modifiers[modifierIndex].items.length
            );
          }
        }
        console.log("ItemXFinalList", state.tempCartItem);
      }

      const itemX = state.tempCartItem.modifiers;

      itemX.forEach((element) => {
        element.items.forEach((element1) => {
          console.log("ItemNameX", element1.name + element1.isChecked);
        });
      });
      console.log("ItemNameX", { ...itemX });
    },
    toggleCartItemModal(state, action) {
      state.cartItemModal = !state.cartItemModal;
    },
    removeCartItem(state, action) {
      state.tempCartItem.modifiers = [];
    },
    setCurrentAddToCartItem(state, action) {
      state.addToCartItem = {
        quantity: 1,
        ...action.payload.item,
      };
    },
    setCurrentMenu(state, action) {
      const menuData = JSON.parse(JSON.stringify(menu));
      console.log("MenuData", menuData);
      if (action.payload.id === 1) {
        state.currentMenu = menuData.menu.lunch.items;
      } else if (action.payload.id === 2) {
        state.currentMenu = menuData.breakfast.items;
      } else {
        state.currentMenu = menuData.dinner.items;
      }
    },
    setCurrentMeal(state, action) {
      state.currentMealId = action.payload.meal;
    },
    selectMenuItem(state, action) {
      console.log("Payload", action.payload);
      state.selectMenuItem = action.payload.id;
    },
    addToFavs(state, action) {},
    setCurrentImageIndex(state, action) {
      state.currentImageIndex = action.payload.index;
    },
    toggleImageModal(state, action) {
      state.isImageModalOpen = !state.isImageModalOpen;
      if (action.payload) {
        if (action.payload.images) {
          state.imageModalImages = action.payload.images;
        }
      }
    },
    goToNextImage(state, action) {
      if (state.currentImageIndex >= state.imageModalImages.length - 1) {
      } else {
        state.currentImageIndex++;
      }
    },
    goToPreviousImage(state, action) {
      if (state.currentImageIndex <= 0) {
        return;
      }
      state.currentImageIndex--;
    },
  },
});

export const restaurantActions = restaurantsSlice.actions;

export default restaurantsSlice.reducer;
