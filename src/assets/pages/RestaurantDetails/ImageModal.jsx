// ImageModal.jsx
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restaurantActions } from "../../../store/slices/restaurants-slice";
import close from "../../../assets/images/close.svg";
import "./close.scss";
import { createPortal } from "react-dom";

function ImageModal({ onClose }) {
  const images = useSelector((state) => state.restaurants.imageModalImages);

  const currentImageIndex = useSelector(
    (state) => state.restaurants.currentImageIndex
  );

  const dispatch = useDispatch();

  function handleOnNext() {
    dispatch(restaurantActions.goToNextImage());
  }

  function handleOnPrevious() {
    dispatch(restaurantActions.goToPreviousImage());
  }

  useEffect(() => {}, []);

  console.log("CurrentImageIndex", currentImageIndex);
  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case "ArrowUp":
          // Arrow Up key is pressed
          dispatch(restaurantActions.goToNextImage());
          // Add your logic for arrow up key press here
          break;
        case "ArrowDown":
          // Arrow Down key is pressed
          dispatch(restaurantActions.goToPreviousImage());
          // Add your logic for arrow down key press here
          break;
        case "ArrowLeft":
          // Arrow Left key is pressed
          dispatch(restaurantActions.goToPreviousImage());
          // Add your logic for arrow left key press here
          break;
        case "ArrowRight":
          // Arrow Right key is pressed
          dispatch(restaurantActions.goToNextImage());
          // Add your logic for arrow right key press here
          break;
        default:
          // Handle other key presses if needed
          break;
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("keydown", handleKeyPress);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return createPortal(
    <div className="image-modal">
      <div className="image-modal-container centered">
        <div onClick={handleOnPrevious} className="arrow-left">
          <svg
            version="1.1"
            id="fi_271220"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 492 492"
            xmlSpace="preserve"
          >
            <g>
              <g>
                <path
                  d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12
			C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084
			c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864
			l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z"
                ></path>
              </g>
            </g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
          </svg>
        </div>
        <div className="modal-images">
          <img src={images[currentImageIndex]} alt="modal" />

          <div onClick={onClose} className="close">
            <svg
              id="fi_2976286"
              enable-background="new 0 0 320.591 320.591"
              height="512"
              viewBox="0 0 320.591 320.591"
              width="512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <g id="close_1_">
                  <path d="m30.391 318.583c-7.86.457-15.59-2.156-21.56-7.288-11.774-11.844-11.774-30.973 0-42.817l257.812-257.813c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875l-259.331 259.331c-5.893 5.058-13.499 7.666-21.256 7.288z"></path>
                  <path d="m287.9 318.583c-7.966-.034-15.601-3.196-21.257-8.806l-257.813-257.814c-10.908-12.738-9.425-31.908 3.313-42.817 11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414-6.35 5.522-14.707 8.161-23.078 7.288z"></path>
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div onClick={handleOnNext} className="arrow-right ">
          <svg
            version="1.1"
            id="fi_271228"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 492.004 492.004"
            xmlSpace="preserve"
          >
            <g>
              <g>
                <path
                  d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12
			c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028
			c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265
			c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"
                ></path>
              </g>
            </g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
          </svg>
        </div>

        <div className="image-count">
          <div
            onClick={handleOnPrevious}
            className="arrow-left static-position"
          >
            <svg
              version="1.1"
              id="fi_271220"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 492 492"
              xmlSpace="preserve"
            >
              <g>
                <g>
                  <path
                    d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12
			C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084
			c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864
			l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z"
                  ></path>
                </g>
              </g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </svg>
          </div>
          <p>
            {currentImageIndex + 1} of {images.length}
          </p>
          <div onClick={handleOnNext} className="arrow-right static-position">
            <svg
              version="1.1"
              id="fi_271228"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 492.004 492.004"
              xmlSpace="preserve"
            >
              <g>
                <g>
                  <path
                    d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12
			c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028
			c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265
			c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"
                  ></path>
                </g>
              </g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </svg>
          </div>
        </div>
      </div>
      <div onClick={onClose} className="close-mobile">
        <svg
          id="fi_2976286"
          enable-background="new 0 0 320.591 320.591"
          height="512"
          viewBox="0 0 320.591 320.591"
          width="512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <g id="close_1_">
              <path d="m30.391 318.583c-7.86.457-15.59-2.156-21.56-7.288-11.774-11.844-11.774-30.973 0-42.817l257.812-257.813c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875l-259.331 259.331c-5.893 5.058-13.499 7.666-21.256 7.288z"></path>
              <path d="m287.9 318.583c-7.966-.034-15.601-3.196-21.257-8.806l-257.813-257.814c-10.908-12.738-9.425-31.908 3.313-42.817 11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414-6.35 5.522-14.707 8.161-23.078 7.288z"></path>
            </g>
          </g>
        </svg>
      </div>

      <div className="image-backdrop"></div>
    </div>,
    document.getElementById("modal")
  );
}

export default ImageModal;
