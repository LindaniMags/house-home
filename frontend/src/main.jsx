import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { ClerkProvider } from "@clerk/clerk-react";
import Home from "./pages/Home";
import HouseDetails from "./pages/HouseDetails";
import EditHouse from "./pages/EditHouse";
import CreateHouse from "./pages/CreateHouse";
import DeleteHouse from "./pages/DeleteHouse";
import ProtectedHome from "./pages/ProtectedHome";
import ProtectedPage from "./pages/ProtectedPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Search from "./pages/Search.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/protected" element={<ProtectedHome />} />
          <Route path="/houses/create" element={<CreateHouse />} />
          <Route path="/houses/details/:id" element={<HouseDetails />} />
          <Route path="/houses/edit/:id" element={<EditHouse />} />
          <Route path="/houses/delete/:id" element={<DeleteHouse />} />
          <Route path="/info" element={<ProtectedPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/houses/dashboard/:id" element={<Dashboard />} />
        </Routes>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>
);
