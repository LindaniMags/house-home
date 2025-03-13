import React, { useState } from "react";
import { Link } from "react-router";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { UserButton, useUser, SignInButton } from "@clerk/clerk-react";

const AuthenticatedNavbar = ({ showCreateListing = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isSignedIn } = useUser();

  return (
    <div className="shadow-xl">
      <nav className="relative">
        <div className="flex justify-between items-center p-4">
          <Link to="/">
            <h2 className="text-xl font-medium border border-green-600 rounded text-green-600 h-10 p-1 px-5">
              House & Home
            </h2>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-3 items-center">
            {isSignedIn ? (
              <>
                {showCreateListing ? (
                  <Link to="/houses/create">
                    <button className="bg-green-600 text-white rounded h-10 p-1 px-5 hover:bg-green-800 hover:font-semibold">
                      Create Listing
                    </button>
                  </Link>
                ) : (
                  <Link to={`/houses/dashboard/${user?.id}`}>
                    <button className="bg-green-600 text-white rounded h-10 p-1 px-5 hover:bg-green-800 hover:font-semibold">
                      Dashboard
                    </button>
                  </Link>
                )}
                <UserButton />
              </>
            ) : (
              <SignInButton className="bg-green-600 text-white rounded h-10 p-1 px-5 hover:bg-green-800 hover:font-semibold" />
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-green-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <IoMdClose /> : <IoMdMenu />}
          </button>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="absolute top-full right-0 w-48 bg-white rounded-lg shadow-lg py-2 z-50 md:hidden">
              {isSignedIn ? (
                <>
                  {showCreateListing ? (
                    <Link to="/houses/create">
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                        Create Listing
                      </button>
                    </Link>
                  ) : (
                    <Link to={`/houses/dashboard/${user?.id}`}>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                        Dashboard
                      </button>
                    </Link>
                  )}
                  <div className="px-4 py-2">
                    <UserButton />
                  </div>
                </>
              ) : (
                <div className="px-4 py-2">
                  <SignInButton className="bg-green-600 text-white rounded h-10 p-1 px-5 hover:bg-green-800 hover:font-semibold w-full" />
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default AuthenticatedNavbar;
