import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Toaster } from "react-hot-toast";
import Auth from "./components/Auth";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <Auth>
              <Home />
            </Auth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
