import toast from "react-hot-toast";
import api from "./axiosConfig";

// Register user api call
export const login = async (email: string, password: string) => {
  try {
    const res = await api.post("/api/v1/auth/login", { email, password });
    toast.success(res.data.message);
    localStorage.setItem("token", res.data.data?.token);
    return res.data.data.token;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}

// Get loggedIn user api call
export const getLoggedInUser = async () => {
  try {
    const res = await api.get("/api/v1/auth/me");
    return res.data.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}

// Logout user api call
export const logout = async () => {
  try {
    const res = await api.get("/api/v1/auth/logout");
    localStorage.removeItem("token");
    toast.success(res.data.message);
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}

// Get all users api call
export const getAllUsers = async () => {
  try {
    const res = await api.get("/api/v1/users");
    return res.data.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}

//get message 

export const getMessage = async (id: string) => {
  try {
    const res = await api.get(`/api/v1/messages/${id}`);
    return res.data.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}
export const sendMessage = async (id: string, message: string) => {
  try {
    const res = await api.post(`/api/v1/messages/${id}`, {
      message: message
    });
    return res.data.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
}

