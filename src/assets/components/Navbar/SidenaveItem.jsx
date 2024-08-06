import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../store/slices/ui-slice";
import { NavLink } from "react-router-dom";

export default function SidenavItem({ item, onClick }) {
  const dispatch = useDispatch();
  const activeItem = useSelector((state) => state.ui.activeMenuItem);

  function handleHover() {
    dispatch(uiActions.setActiveMenuItem({ name: item.name }));
  }

  function handleHovered() {
    dispatch(uiActions.setActiveMenuItem({ name: "" }));
  }

  return (
    <NavLink
      to={item.path}
      key={item.name}
      onMouseEnter={handleHover}
      onMouseLeave={handleHovered}
      onClick={() => {
        onClick();
        dispatch(
          uiActions.setActiveMenu({
            name: item.name,
          })
        );
      }}
      className={`${item.isActive ? "active-home-link" : "home-link"}`}
    >
      <div>
        {item.hasIcon && (
          <img
            src={`${
              item.isActive
                ? item.activeIcon
                : activeItem === item.name
                ? item.activeIcon
                : item.icon
            }`}
          />
        )}

        <p>{item.title}</p>
      </div>
    </NavLink>
  );
}
