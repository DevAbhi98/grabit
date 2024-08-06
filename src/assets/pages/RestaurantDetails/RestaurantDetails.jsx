import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../store/slices/ui-slice";
import "./restaurant-details.scss";
import { restaurantActions } from "../../../store/slices/restaurants-slice";
import RestaurantTopSection from "./RestaurantTopSection";
import RestaurantImages from "./RestaurantImages";
import RestaurantMenu from "./RestaurantMenu";
import ImageModal from "./ImageModal";
import AddToCartModal from "./AddToCartModal";
import CartItem from "./CartiItem";
import { useParams } from "react-router-dom";
import { fetchRestaurantById, fetchRestaurants } from "../../../util/http";
import { useQuery } from "@tanstack/react-query";
import Lottie from "react-lottie";
import animationData from "../../lotties/loader.json";

export default function RestaurantDetails({ restaurant }) {
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const isImageModalOpen = useSelector(
    (state) => state.restaurants.isImageModalOpen
  );
  const params = useParams();
  const cartItems = useSelector((state) => state.restaurants.cart);

  const cartItemModal = useSelector((state) => state.restaurants.cartItemModal);
  const restaurantID = params.restaurantId;
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["restaurant-details", restaurantID],
    queryFn: () => fetchRestaurantById(restaurantID),
  });

  const {
    data: restaurantData,
    isPending: restaurantPending,
    isError: restaurantisError,
    error: restaurantError,
  } = useQuery({
    queryKey: ["restaurants-details"],
    queryFn: fetchRestaurants,
  });

  useEffect(() => {
    if (restaurantData) {
      if (restaurantData.length > 0)
        dispatch(
          restaurantActions.saveRestaurants({ restaurants: restaurantData })
        );
    }
  }, [restaurantData]);

  const loaderOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // convert rem to px

  function convertRemToPx(rem) {
    const fontSize = document.documentElement.style.fontSize;
    return rem * parseFloat(fontSize);
  }

  useEffect(() => {
    const handleScroll = () => {
      const newOffset = convertRemToPx(4) + convertRemToPx(1);
      setOffset(newOffset);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (cartItems.length < 1) {
      dispatch(restaurantActions.setCartWindow({ open: false }));
    }
  }, [cartItems]);

  useEffect(() => {
    dispatch(uiActions.setShow({ visible: true }));
    dispatch(uiActions.setNavStatic({ visible: true }));
    dispatch(
      restaurantActions.setCurrentMenu({
        id: 1,
      })
    );
  }, []);

  const handleOnClose = () => {
    dispatch(restaurantActions.toggleImageModal());
  };

  useEffect(() => {
    if (isImageModalOpen) {
      document.getElementById("body").classList.add("disable-scroll");
    } else {
      document.getElementById("body").classList.remove("disable-scroll");
    }
  }, [isImageModalOpen]);

  useEffect(() => {
    if (cartItemModal) {
      document.getElementById("body").classList.add("disable-scroll");
    } else {
      document.getElementById("body").classList.remove("disable-scroll");
    }
  }, [cartItemModal]);

  useEffect(() => {
    dispatch(uiActions.setOnHomePage({ onHomePage: false }));
  }, []);

  useEffect(() => {
    dispatch(restaurantActions.setRestaurantId({ id: params.restaurantId }));
  }, []);

  return (
    <>
      {isPending ? (
        <div className="restaurant-loader">
          <div className="restaurant-loader-content">
            <Lottie options={loaderOptions}></Lottie>
            <h1>Please wait while we setup shop!</h1>
          </div>
        </div>
      ) : (
        <div className="restaurant-details">
          <div className="restaurant-details-container">
            {isImageModalOpen && (
              <>
                <ImageModal onClose={handleOnClose} />
              </>
            )}

            {cartItemModal && (
              <>
                <AddToCartModal restaurantId={params.restaurantId} />
              </>
            )}

            <div className="restaurant-details__content">
              <RestaurantTopSection restaurant={data} />
              <RestaurantImages restaurant={data} />
              <RestaurantMenu offset={offset} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
