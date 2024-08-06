import React from "react";
import logo from "../../images/logo.svg";

const ErrorNavbar = () => {
  return (
    <nav className="navbar error-nav">
      <div className="error-navbar-logo">
        <img src={logo} alt="Logo" />
        <h1>GrabIt!</h1>
      </div>
    </nav>
  );
};

export default ErrorNavbar;
