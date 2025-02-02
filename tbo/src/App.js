// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./views/HomePage";
import Results from "./views/Results";
import Carousel2 from "./views/Carousel/NewCarousel";
import ChatBox from "./views/ChatBox";
import HotelBooking from "./views/HotelBooking";
import HotelModal from "./views/HotelModal";
import LoginPage from "./views/Login";
import { AuthProvider } from "./views/AuthProvider";
import { ProtectedRoute } from "./views/ProtectedRoute";
import LogoutButton from "./views/LogoutButton"; // We'll create this next

function App() {
  return (
    <AuthProvider>
      <LogoutButton />
      <Routes>
        {/* A dedicated login route */}
        <Route path="/login" element={<LoginPage />} />
        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          }
        />
        <Route
          path="/carousel"
          element={
            <ProtectedRoute>
              <Carousel2 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <ChatBox />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hotelbooking"
          element={
            <ProtectedRoute>
              <HotelBooking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/modal"
          element={
            <ProtectedRoute>
              <HotelModal />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
