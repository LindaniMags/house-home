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
import ProtectedPage from "./pages/ProtectedPage";
import ProtectedHome from "./pages/ProtectedHome";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const App = () => {
  return (
    <ClerkProvider
      publishableKey={
        PUBLISHABLE_KEY ||
        pk_test_dml0YWwtY29sbGllLTg4LmNsZXJrLmFjY291bnRzLmRldiQ
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/protected" element={<ProtectedHome />} />
        <Route path="/houses/create" element={<CreateHouse />} />
        <Route path="/houses/details/:id" element={<HouseDetails />} />
        <Route path="/houses/edit/:id" element={<EditHouse />} />
        <Route path="/houses/delete/:id" element={<DeleteHouse />} />
      </Routes>
    </ClerkProvider>
  );
};

export default App;
