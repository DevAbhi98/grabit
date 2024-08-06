import { Children } from "react";
import "./buttons.scss";

export default function PlaystoreButton({ children, title, store }) {
  return (
    <div className="store-button">
      {children}
      <div>
        <p>{title}</p>
        <h2 className="store-title">{store}</h2>
      </div>
    </div>
  );
}
