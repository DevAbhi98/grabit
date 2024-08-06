import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/slices/ui-slice";

export default function Backdrop() {
  const isActive = useSelector((state) => state.ui.sideMenuActive);
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch(uiActions.toggleSideMenu());
      }}
      className={`backdrop${
        isActive ? " backdrop-visible" : " backdrop-hidden"
      } `}
    />
  );
}
