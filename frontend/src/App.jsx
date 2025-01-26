import React from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import HouseDetails from "./pages/HouseDetails";
import EditHouse from "./pages/EditHouse";
import CreateHouse from "./pages/CreateHouse";
import DeleteHouse from "./pages/DeleteHouse";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import ProtectedHome from "./pages/ProtectedHome";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const App = () => {
  return (
    <div>
      <SignedOut>
        <Home />
      </SignedOut>
      <SignedIn>
        <ProtectedHome />
      </SignedIn>
    </div>
  );
};

export default App;
