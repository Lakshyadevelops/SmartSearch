// src/LogoutButton.js
import React from "react";
import { useAuth } from "../AuthProvider";
import { CircularProgress } from "@mui/material";

const LogoutButton = () => {
  const { setUser } = useAuth();
  //Add a loader and then redirect to login page
  const [loading, setLoading] = React.useState(false);

  const handleLogout = () => {
    setLoading(true);
    fetch("http://127.0.0.1:8000/logout", { credentials: "include" })
      .then((res) => {
        if (res.ok) {
          setUser(null); // Update the auth state in React
            setLoading(false);
        }
      })
      .catch((err) => console.error(err));
      if(!loading){
        window.location.href = "/login";
        }
  };
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

  return (
    <button
      onClick={handleLogout}
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        zIndex: 10000,
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
