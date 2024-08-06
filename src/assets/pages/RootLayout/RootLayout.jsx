import { useState, Fragment } from "react";
import MainNavigationBar from "../../components/Navbar/MainNavigationBar";
import ScrollListenerComponent from "../../components/ScrollListenerComponent";
import LoginModal from "../../components/Modals/LoginModal";
import Modal from "../../components/Modals/Modal";
import { useDispatch, useSelector } from "react-redux";
import SignupModal from "../../components/Modals/SignupModal";
import { Outlet } from "react-router-dom";
import ImageModal from "../RestaurantDetails/ImageModal";
import { restaurantActions } from "../../../store/slices/restaurants-slice";
import MainFooter from "../Home/Footer/MainFooter";
import LogoutModal from "../../components/Modals/LogoutModal";
import { uiActions } from "../../../store/slices/ui-slice";

export default function RootLayout() {
  const [isNavbarVisible, setNavbarVisible] = useState(true);
  const isLogin = useSelector((state) => state.ui.isLogin);
  const isSignup = useSelector((state) => state.ui.isSignup);
  const isNavStatic = useSelector((state) => state.ui.isNavStatic);
  const isImageModalOpen = useSelector(
    (state) => state.restaurants.isImageModalOpen
  );
  const isLogoutModal = useSelector((state) => state.ui.isLogoutModal);
  const isLoggedIn = useSelector((state) => state.ui.isLoggedIn);

  const dispatch = useDispatch();
  const handleScrollDown = () => {
    if (isNavbarVisible) {
      setNavbarVisible(false);
    }
  };

  const handleScrollUp = () => {
    if (!isNavbarVisible) {
      setNavbarVisible(true);
    }
  };

  function handleBackdropClicked() {
    dispatch(restaurantActions.toggleImageModal());
    dispatch(restaurantActions.setCurrentImageIndex({ index: 0 }));
  }

  function handleOnLogoutClose() {
    dispatch(uiActions.toggleLogoutModal());
  }

  console.log("LogoutState", localStorage.getItem("loggedIn"));

  dispatch(
    uiActions.setLoggedIn({
      loggedIn: JSON.parse(localStorage.getItem("loggedIn")),
    })
  );
  console.log("LogoutState", isLoggedIn);
  function handleOnLogout() {
    dispatch(uiActions.logout());
    localStorage.setItem("loggedIn", false);
    localStorage.removeItem("user");
    dispatch(uiActions.toggleLogoutModal());
    dispatch(uiActions.setLoggedIn({ loggedIn: false }));
  }

  return (
    <Fragment>
      <Modal open={isLogin} onClose={() => {}}>
        <LoginModal />
      </Modal>

      {isLogoutModal && (
        <LogoutModal onClose={handleOnLogoutClose} onLogout={handleOnLogout} />
      )}

      <Modal open={isSignup} onClose={() => {}}>
        <SignupModal />
      </Modal>
      <ScrollListenerComponent
        onScrollDown={handleScrollDown}
        onScrollUp={handleScrollUp}
      >
        <MainNavigationBar isVisible={isNavbarVisible} isStatic={isNavStatic} />
      </ScrollListenerComponent>
      <main>
        <Outlet />
      </main>
      <MainFooter />
    </Fragment>
  );
}
