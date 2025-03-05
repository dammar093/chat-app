import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../state/slices/api/api";
import { AppDispatch } from "../state/slices/store";
import { useDispatch } from "react-redux";
import { setToken } from "../state/slices/authSlice";

const Login = () => {
  const [formValues, setFormValues] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = await login(formValues.email, formValues.password);
    dispatch(setToken(token));
    if (token) {
      setFormValues({ name: "", email: "", password: "" });
      navigate("/");
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="card bg-base border-1 border-white w-96 shadow-sm p-2">
        <form className="flex flex-col gap-4 p-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold">Login</h2>
          <div className="form-control">
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                placeholder="Enter your eamil."
                value={formValues?.email}
                onChange={(e) =>
                  setFormValues({ ...formValues, email: e.target.value })
                }
                required
              />
            </label>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>
          </div>
          <div className="form-control">
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                type="password"
                required
                placeholder="Enter your password"
                minLength={6}
                value={formValues?.password}
                onChange={(e) =>
                  setFormValues({ ...formValues, password: e.target.value })
                }
                title="Password must be at least 6 characters long"
              />
            </label>
            <p className="validator-hint hidden">
              Password must be at least 6 characters long.
            </p>
          </div>
          <div className="form-control">
            <button type="submit" className="btn w-full btn-primary ">
              Loign
            </button>
          </div>
        </form>
        <p className="text-center text-md text-gray-500">
          Don't have an account{" "}
          <Link className="text-primary" to={"/signup"}>
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
