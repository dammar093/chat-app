import { useEffect } from "react";
import { io } from "socket.io-client";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import toast, { Toaster } from "react-hot-toast";

function App() {
  useEffect(() => {
    const socket = io("http://localhost:3000", {
      withCredentials: true,
    });
    socket.on("connect", () => {
      console.log(`Connected to server with id ${socket.id}`);
    });
    socket.on("message", (data) => {
      toast.success(data);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
