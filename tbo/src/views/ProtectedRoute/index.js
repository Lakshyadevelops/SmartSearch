// src/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { CircularProgress } from "@mui/material";

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>
        <CircularProgress size={100} />
      </div>
    )
  }
  if (!user) {
    // Redirect to a login route or show the login modal.
    // Here we assume you have a dedicated /login route.
    return <Navigate to="/login" replace />;
  }
  return children;
}
