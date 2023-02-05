import React from "react";
import "./Logo.css";
import logo from "./../../assets/logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
    </div>
  );
};

export default Logo;
