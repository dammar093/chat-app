import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./state/slices/store";
import { getLoggedInUser } from "./state/slices/api/api";
import { setUser } from "./state/slices/userSlice";

function App() {
  const dispatch = useDispatch();
  const token =
    useSelector((state: RootState) => state.auth.token) ||
    localStorage.getItem("token");

  useEffect(() => {
    const currentUser = async () => {
      const user = await getLoggedInUser();
      dispatch(setUser(user));
    };
    currentUser();
  }, [dispatch, token]);

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={token ? <Home /> : <Login />} />
        <Route path="/login" element={token ? <Home /> : <Login />} />
        <Route path="/signup" element={token ? <Home /> : <SignUp />} />
      </Routes>
    </>
  );
}

export default App;
