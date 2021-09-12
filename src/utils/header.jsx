import React from "react";

const Header = ({ title, colorName = "white" }) => (
  <div>
    <h2 style={{ color: colorName }} className="mt-3 text-center">
      {title}
    </h2>
  </div>
);

export default Header;
