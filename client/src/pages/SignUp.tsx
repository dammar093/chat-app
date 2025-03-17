import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { resgisterUser } from "../state/slices/api/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/slices/store";
import { setToken } from "../state/slices/authSlice";

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const signUpUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = await resgisterUser(name, email, password);
    dispatch(setToken(token));
    if (token) {
      setName("");
      setEmail("");
      setPassword("");
      navigate("/");
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="card bg-base border-1 border-white w-96 shadow-sm p-2">
        <form className="flex flex-col gap-4 p-6" onSubmit={signUpUser}>
          <h2 className="text-2xl font-semibold">Create an account</h2>
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
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                type="input"
                required
                placeholder="Fullname"
                minLength={3}
                maxLength={30}
                value={name}
                onChange={(e) => setName(e.target.value)}
                title="Must be 3 to 30 characters"
              />
            </label>
            <p className="validator-hint hidden">Must be 3 to 30 characters</p>
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
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="Password"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                title="Password must be at least 6 characters long"
              />
            </label>
            <p className="validator-hint hidden">
              Password must be at least 6 characters long.
            </p>
          </div>
          <div className="form-control">
            <button type="submit" className="btn w-full btn-primary ">
              Signup
            </button>
          </div>
        </form>
        <p className="text-center text-md text-gray-500">
          Already have an account{" "}
          <Link className="text-primary" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
