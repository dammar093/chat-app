import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        {
          email,
          password,
        }
      );
      console.log(response.data);
      toast.success(response.data.message);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
