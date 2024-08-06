import React, { useState } from "react";
import "./buttons.scss";

function LikeButton() {
  const [clicked, setClicked] = useState(true);

  function handleLiked() {
    console.log("LikedGotClicked!");
    setClicked((prevClicked) => !prevClicked);
  }

  return (
    <div className="like-button">
      <div>
        <i onClick={handleLiked} className={`${clicked ? "press" : ""}`}></i>
        <span>liked!</span>
      </div>
    </div>
  );
}

export default LikeButton;
