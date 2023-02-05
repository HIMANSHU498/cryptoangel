import React from "react";
import { Link } from "react-router-dom";

import "./Navmenu.css";
const Navmenu = () => {
  return (
    <div className="navmenu">
      <Link to="/" className="menu">
        Home
      </Link>
      <Link to="/fundraisers" className="menu">
        Fundraisers
      </Link>
      <Link to="/create" className="menu">
        Create
      </Link>

      <Link to="aboutus" className="menu">
        About us
      </Link>
    </div>
  );
};

export default Navmenu;
