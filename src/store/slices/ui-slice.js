import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentMeal: "dinner",
  isNavStatic: false,
  isLogin: false,
  isSignup: false,
  activeMenuItem: "",
  sideMenuActive: false,
  show: false,
  iconMenuActive: false,
  isLoggedIn: false,
  isLogoutModal: false,
  onHomePage: true,
  menu: {
    home: {
      hasIcon: true,
      path: "/",
      name: "home",
      activeIcon: "/src/assets/images/home-selected.svg",
      icon: "/src/assets/images/home.svg",
      title: "Home",
      isActive: true,
    },
    ["privacy-policy"]: {
      hasIcon: true,
      name: "privacy-policy",
      activeIcon: "/src/assets/images/privacy-policy-selected.svg",
      icon: "/src/assets/images/privacy-policy.svg",
      title: "Privacy Policy",
      isActive: false,
    },
    ["terms-conditions"]: {
      hasIcon: true,
      name: "terms-conditions",
      activeIcon: "/src/assets/images/terms-conditions-selected.svg",
      icon: "/src/assets/images/terms-conditions.svg",
      title: "Terms & Conditions",
      isActive: false,
    },
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setOnHomePage(state, action) {
      state.onHomePage = action.payload.onHomePage;
    },

    toggleLogoutModal(state, action) {
      state.isLogoutModal = !state.isLogoutModal;
    },

    logout(state, action) {
      state.isLoggedIn = false;
    },

    setLoggedIn(state, action) {
      state.isLoggedIn = action.payload.loggedIn;
    },

    setCurrentMeal(state, action) {
      state.currentMeal = action.payload.meal;
    },

    // Toggle the isNavStatic property

    toggleNavStatic(state, action) {
      state.isNavStatic = !state.isNavStatic;
    },

    setNavStatic(state, action) {
      state.isNavStatic = action.payload.visible;
    },

    toggleLogin(state, action) {
      state.isLogin = !state.isLogin;
    },

    toggleSignup(state, action) {
      state.isSignup = !state.isSignup;
    },

    setShow(state, action) {
      state.show = action.payload.visible;
    },

    setActiveMenuItem(state, action) {
      state.activeMenuItem = action.payload.name;
    },

    setIconMenu(state, action) {
      state.iconMenuActive = action.payload.name;
    },

    toggleIconMenu(state, action) {
      state.iconMenuActive = !state.iconMenuActive;
    },

    toggleSideMenu(state, action) {
      state.sideMenuActive = !state.sideMenuActive;
    },

    setSideMenu(state, action) {
      state.sideMenuActive = action.payload.visible;
    },

    setActiveMenu(state, action) {
      const menuName = action.payload.name;

      // Create a new menu object with updated isActive properties
      const updatedMenu = {};

      // Set isActive to true for the active menu item
      updatedMenu[menuName] = {
        ...state.menu[menuName],
        isActive: true,
      };

      // Set isActive to false for all other menu items
      Object.keys(state.menu).forEach((name) => {
        if (name !== menuName) {
          updatedMenu[name] = {
            ...state.menu[name],
            isActive: false,
          };
        }
      });

      // Return a new state with the updated menu object
      state.menu = {
        ...state.menu,
        ...updatedMenu,
      };
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
