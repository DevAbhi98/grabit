import CartSectionItem from "./AddToCartSectionItem";

export default function AddCartSection({ item, fromCart, cartItem }) {
  return (
    <div className="add-to-cart-modal__bottom-section">
      <h2 className="add-to-cart-modal__bottom-section-title">{item.name}</h2>
      <p className="add-to-cart-modal__bottom-section-description">
        Select {item.requiredSelection}
      </p>
      {item.items.map((sectionItem) => (
        <CartSectionItem
          item={sectionItem}
          modifier={{
            ...item,
            items: [],
          }}
          fromCart={fromCart && fromCart}
          theCartItem={cartItem && cartItem}
          checkboxType={`${item.requiredSelection > 1 ? "checkbox" : "radio"}`}
        />
      ))}
    </div>
  );
}
