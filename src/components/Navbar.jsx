import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="Container">
        <Link to="/">
          <h1>Product Inventory</h1>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
