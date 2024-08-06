import { useDispatch, useSelector } from "react-redux";
import SidenavItem from "./SidenaveItem";

export default function SidenavBar({ isActive, show }) {
  const menu = useSelector((state) => state.ui.menu);

  return (
    <nav
      className={`main-side-nav${isActive ? " is-curtain" : ""} ${
        show ? "hidden" : "visible"
      }`}
    >
      <ul className="menu-list">
        {Object.keys(menu).map((item, index) => {
          return (
            <li key={index}>
              <SidenavItem item={menu[item]} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
