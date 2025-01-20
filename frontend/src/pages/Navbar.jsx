import { SignInButton } from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div>
      <div className="flex  justify-between items-center p-4">
        <Link to="/">
          <h2 className="text-xl font-medium border rounded text-white h-10 p-1 px-5">
            House & Home
          </h2>
        </Link>

        <SignInButton className="bg-green-600 text-white rounded h-10 p-1 px-5" />
      </div>
    </div>
  );
};

export default Navbar;
