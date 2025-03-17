import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/slices/store";
import { getLoggedInUser } from "../state/slices/api/api";
import { setUser } from "../state/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Auth = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  if (!token) {
    navigate("/");
  }
  return <>{children}</>;
};

export default Auth;
