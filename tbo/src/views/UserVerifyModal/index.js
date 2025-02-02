// src/UserModal.js
import React from "react";
import robot from '../../assets/robot.png'
import Button from '@mui/material/Button';


const UserVerifyModal = () => {
  const handleLogin = () => {
    // Redirect the user to the backend's OAuth login endpoint.
    window.location.href = "http://127.0.0.1:8000/login";
  };

  const modalStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  };

  const contentStyle = {
    background: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    textAlign: "center",
    maxWidth: "90%",
  };

  return (
    <div  className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center" style={{backgroundColor: "rgba(0, 0, 0, 0.7)"}}>
      <div style={contentStyle} className="w-[40%]">
        <div className="flex justify-center items-center m-4">

                <img src={robot} alt="robot" className="w-40 floatii"  />
        </div>
        <p className="justify-center flex items-center mb-2 font-bold text-3xl bg-gradient-to-r from-orange-400 via-pink-500 to-blue-400 bg-clip-text text-transparent">
              Welcome, Voyager !
        </p>
        <p className="text-orange-500 font-bold">I'll be the Assistant you need to easify your search and travel experience !</p>
        <p className="font-serif font-semibold text-orange-300">Please Login to continue</p>
        <button onClick={handleLogin} className="bg-orange-400 p-2 rounded-2xl text-white">Sign In with Google  </button>
        {/* <Button variant="contained" style={{borderRadius:"150px"}}>
            Sign In with Google
        </Button> */}
      </div>
    </div>
  );
};

export default UserVerifyModal;
