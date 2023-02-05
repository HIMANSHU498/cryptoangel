import React from "react";
import "./Header.css";
import Home from "./Main/Home";
import Logo from "./Navbar/Logo";
import Navmenu from "./Navbar/Navmenu";
import Navright from "./Navbar/Navright";
const Header = () => {
  return (
    <>
      <div className="header">
        <Logo />
        <Navmenu />
        <Navright />
      </div>
    </>
  );
};

export default Header;
