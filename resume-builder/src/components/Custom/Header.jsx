import { UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { SiAltiumdesigner } from "react-icons/si";
import { Link } from "react-router-dom";

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="p-3 px-5 flex justify-between shadow-md">
      <SiAltiumdesigner size={25} className="cursor-pointer" />
      {isSignedIn ? (
        <div className="flex gap-2 items-center">
          <Link to ={"/dashboard"}>
          <button className="bg-blue-500 p-1 cursor-pointer">Dashboard</button>
          </Link>
          <UserButton/>
        </div>
      ) : (
        <Link to={"/auth/Sign-in"}>
          <button
            style={{ backgroundColor: "#9f5bff" }}
            className="text-white rounded-sm"
          >
            Get Started
          </button>
        </Link>
      )}
    </div>
  );
}

export default Header;
