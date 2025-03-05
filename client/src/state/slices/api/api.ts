import toast from "react-hot-toast";
import api from "./axiosConfig";

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