import React from "react";
import ErrorNavbar from "../components/Navbar/ErrorNavbar";
import ErrorImage from "../images/error.png";

function ErrorPage() {
  return (
    <div className="error-page">
      <ErrorNavbar />

      <div className="error-page-content">
        <img src={ErrorImage} />
        <h1>Uh-oh! The Dish is Missing</h1>
        <p>
          Oops! It seems like the dish you're craving has vanished into thin
          air. Our chefs are working hard to bring it back to the menu. In the
          meantime, why not explore our other mouthwatering delicacies?
        </p>
      </div>
    </div>
  );
}

export default ErrorPage;
