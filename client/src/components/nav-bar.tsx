import React from "react";
import { ModeToggle } from "./mode-toggle";
import Container from "./container";
import Logo from "./logo";

const NavBar = () => {
  return (
    <div className="fixed top-0 w-full flex justify-center">
      <div className="container w-full h-20 flex justify-between items-center">
        <Logo />
        <ModeToggle />
      </div>
    </div>
  );
};

export default NavBar;
