import { useEffect, useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import logo from "../../../assets/images/dark-logo.svg";
import SidenavBar from "./SidenavBar";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../store/slices/ui-slice";
import SidenavItem from "./SidenaveItem";
import "./nav.scss";
import { restaurantActions } from "../../../store/slices/restaurants-slice";
import Cart from "../../pages/RestaurantDetails/Cart";
import { useLocation, useNavigate } from "react-router-dom";

export default function MainNavigationBar({ isStatic }) {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.ui.show);
  const iconMenu = useSelector((state) => state.ui.iconMenuActive);
  const cart = useSelector((state) => state.restaurants.cart);
  const isLoggedIn = useSelector((state) => state.ui.isLoggedIn);
  const cartNav = useSelector((state) => state.restaurants.cartNav);

  const [logoutMenu, setLogoutMenu] = useState(
    <>
      <button onClick={handleSignup} className="light-button">
        Signup
      </button>
      <button onClick={handleLogin} className="dark-button">
        Login
      </button>
    </>
  );

  const location = useLocation();

  const navigate = useNavigate();

  if (isStatic) {
    dispatch(uiActions.setShow({ visible: false }));
  }

  useEffect(() => {
    console.log("IsLoggedIn: ", isLoggedIn);
    if (isLoggedIn) {
      console.log("IsLoggedInTrue: ", isLoggedIn);

      setLogoutMenu(
        <div onClick={handleOnLogout} className="logout">
          <svg
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            id="fi_10812277"
          >
            <g id="Layer_16" data-name="Layer 16">
              <path d="m359.49 282.11a19 19 0 0 0 -20.49 17.33c-1.68 19.82-3.76 37.06-5.58 46.12v.11c-5.37 27.7-31.61 55.08-58.52 61.1-2.33.48-4.67.94-7 1.38 2-25.73 3.49-58.63 3.29-84 .3-38.76-3.41-98.44-6.7-122.19-5.91-43.73-32.8-92.23-62.55-112.84l-.18-.12a338.2 338.2 0 0 0 -66.1-34.71q-6.22-2.41-12.29-4.5a426.08 426.08 0 0 1 66.7-5c30.4 0 58.15 2.77 84.83 8.31 26.91 6 53.15 33.4 58.52 61.1v.11c1.81 9 3.89 26.24 5.57 46a19 19 0 0 0 37.87-3.22c-1.82-21.39-4.06-39.68-6.16-50.2-8.29-42.61-46-81.7-87.72-90.94l-.24-.05c-29.32-6.08-59.62-9.06-92.74-9.12s-63.3 3-92.62 9.13l-.25.05c-18.62 4.13-36.43 14.21-51.19 27.88a47.24 47.24 0 0 0 -10.33 10.73c-13.04 15.22-22.51 33.43-26.19 52.32-4.61 23.11-9.82 83.04-9.42 123.04-.22 21.46 1.17 48.66 3.23 72.83 1.1 15.5 2.35 29 3.55 37.66 5.91 43.73 32.8 92.23 62.56 112.84l.17.12a338.62 338.62 0 0 0 66.11 34.71c23.54 9.14 45.14 14.68 66.05 16.94h.18c28.1 2.51 53.64-21.88 61.37-57.54q9.81-1.56 19.45-3.55l.24-.05c41.73-9.24 79.43-48.33 87.72-90.94 2.1-10.54 4.35-28.87 6.17-50.31a19 19 0 0 0 -17.31-20.53z"></path>
              <path d="m512.09 229.9c0-.63 0-1.26-.1-1.89a.5.5 0 0 0 0-.12 17.39 17.39 0 0 0 -.27-1.76v-.13a18.9 18.9 0 0 0 -5.15-9.53l-68-68.06a19 19 0 0 0 -26.88 26.87l35.67 35.66h-131.17a19 19 0 0 0 0 38h131l-35.64 35.64a19 19 0 0 0 26.87 26.87l67.69-67.69a18.86 18.86 0 0 0 5.2-8.44 16.53 16.53 0 0 0 .42-1.75 2.17 2.17 0 0 0 0-.25c.09-.51.18-1 .23-1.54s0-.78 0-1.16c0-.22 0-.44 0-.66z"></path>
            </g>
          </svg>
        </div>
      );
    } else {
      setLogoutMenu(
        <>
          <button onClick={handleSignup} className="light-button">
            Signup
          </button>
          <button onClick={handleLogin} className="dark-button">
            Login
          </button>
        </>
      );
    }
  }, [isLoggedIn]);

  console.log("NavigationBarLogout: ", isLoggedIn);

  const handleScroll = () => {
    if (isStatic) {
      dispatch(uiActions.setShow({ visible: false }));
    } else {
      const currentScrollPos = window.pageYOffset;
      const visible = currentScrollPos < 100;
      dispatch(uiActions.setShow({ visible: visible }));
      if (!visible) {
        dispatch(uiActions.setSideMenu({ visible: false }));
        dispatch(uiActions.setIconMenu({ visible: false }));
      }
    }
  };

  function handleCartClicked() {
    if (sideMenuActive) {
      dispatch(uiActions.toggleSideMenu());
    }

    dispatch(restaurantActions.toggleCartOpen());
  }

  function handleUserClick() {
    dispatch(uiActions.toggleIconMenu());
  }

  function handleOnLogout() {
    dispatch(uiActions.toggleLogoutModal());
  }

  const sideMenuActive = useSelector((state) => state.ui.sideMenuActive);

  const handleClick = () => {
    if (cartNav) {
      dispatch(restaurantActions.toggleCartOpen());
    }
    dispatch(uiActions.toggleSideMenu());
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleLogin() {
    console.log("Login Clicked");
    dispatch(uiActions.toggleLogin());
  }

  function handleSignup() {
    dispatch(uiActions.toggleSignup());
  }

  function handleOnLogoClick() {
    navigate("/");
  }

  console.log("LocationTest", location.pathname);

  return (
    <>
      <nav className={`navbar ${show ? "hidden" : "visible"}`}>
        <HamburgerMenu handleClick={handleClick} isActive={sideMenuActive} />

        <div onClick={handleOnLogoClick} className="dark-logo-div">
          <img src={logo} />
          <h1>GrabIt!</h1>
        </div>

        <div className="right-section">
          {!location.pathname.includes("checkout") && (
            <div
              onClick={handleCartClicked}
              className="right-section__cart-div"
            >
              <div className="right-section__cart-div__cart-icon">
                <svg
                  id="fi_5337564"
                  enable-background="new 0 0 32 32"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="_01">
                    <g>
                      <path d="m23.8 30h-15.6c-3.3 0-6-2.7-6-6v-.2l.6-16c.1-3.3 2.8-5.8 6-5.8h14.4c3.2 0 5.9 2.5 6 5.8l.6 16c.1 1.6-.5 3.1-1.6 4.3s-2.6 1.9-4.2 1.9c0 0-.1 0-.2 0zm-15-26c-2.2 0-3.9 1.7-4 3.8l-.6 16.2c0 2.2 1.8 4 4 4h15.8c1.1 0 2.1-.5 2.8-1.3s1.1-1.8 1.1-2.9l-.6-16c-.1-2.2-1.8-3.8-4-3.8z"></path>
                    </g>
                    <g>
                      <path d="m16 14c-3.9 0-7-3.1-7-7 0-.6.4-1 1-1s1 .4 1 1c0 2.8 2.2 5 5 5s5-2.2 5-5c0-.6.4-1 1-1s1 .4 1 1c0 3.9-3.1 7-7 7z"></path>
                    </g>
                  </g>
                </svg>
              </div>
              <div className="right-section__cart-div__cart-items">
                {cart.length}
              </div>
            </div>
          )}

          {logoutMenu}
        </div>

        <button
          onClick={handleUserClick}
          className="authentication-section-icons"
        >
          <div>
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <g id="Layer_2" data-name="Layer 2">
                <path d="m16 17a6 6 0 1 1 6-6 6 6 0 0 1 -6 6zm0-10a4 4 0 1 0 4 4 4 4 0 0 0 -4-4z" />
                <path d="m16 31a15 15 0 0 1 -11.59-5.49l-.52-.64.52-.63a15 15 0 0 1 23.18 0l.52.63-.52.64a15 15 0 0 1 -11.59 5.49zm-9.49-6.12a13 13 0 0 0 19 0 13 13 0 0 0 -19 0z" />
                <path d="m16 31a15 15 0 1 1 11.59-5.49 15 15 0 0 1 -11.59 5.49zm0-28a13 13 0 1 0 13 13 13 13 0 0 0 -13-13z" />
                <path d="m5.18 24.88s10.07 11.25 20.32 1.12l1.32-1.12s-8.56-8.88-17.25-3.55z" />
                <circle cx="16" cy="11" r="5" />
              </g>
            </svg>
          </div>
        </button>
      </nav>

      <SidenavBar show={show} isActive={sideMenuActive} />

      <div
        className={`authentication-menu ${iconMenu ? "active-icon-menu" : ""} ${
          show ? "hidden" : "visible"
        }`}
      >
        <ul className={`menu-list`}>
          <li>
            <SidenavItem
              onClick={handleLogin}
              item={{
                hasIcon: true,
                name: "login",
                activeIcon: "",
                icon: "/src/assets/images/login.svg",
                title: "Login",
                isActive: false,
              }}
            />
            <SidenavItem
              onClick={handleSignup}
              item={{
                hasIcon: true,
                name: "signup",
                activeIcon: "",
                icon: "/src/assets/images/signup.svg",
                title: "Signup",
                isActive: false,
              }}
            />
            <SidenavItem
              onClick={handleSignup}
              item={{
                hasIcon: true,
                name: "logout",
                activeIcon: "",
                icon: "/src/assets/images/signup.svg",
                title: "Logout",
                isActive: false,
              }}
            />
          </li>
        </ul>
      </div>

      <Cart />
    </>
  );
}
