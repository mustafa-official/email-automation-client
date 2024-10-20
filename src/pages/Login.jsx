// import { useState } from "react";

import { useContext, useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();
  const { loginUser, loading, setLoading } = useContext(AuthContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    try {
      setLoading(true);
      await loginUser(email, password);
      toast.success("Login Successfully");
      form.reset();
      navigate("/smtp");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="mt-5">
      <div>
        <form
          className="lg:col-span-3 md:col-span-2 max-w-lg w-full p-6 mx-auto"
          onSubmit={handleLogin}
        >
          <div className="mb-10">
            <h3 className="text-gray-800 text-4xl font-extrabold">Login</h3>
          </div>

          <div className="relative flex items-center">
            <label className="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
              Email
            </label>
            <input
              required
              type="email"
              placeholder="Enter email"
              name="email"
              className="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-blue-600 rounded-md outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#bbb"
              stroke="#bbb"
              className="w-[18px] h-[18px] absolute right-4"
              viewBox="0 0 682.667 682.667"
            >
              <g transform="matrix(1.33 0 0 -1.33 0 682.667)">
                <path
                  fill="none"
                  strokeMiterlimit="10"
                  strokeWidth="40"
                  d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                ></path>
              </g>
            </svg>
          </div>

          <div className="relative flex items-center mt-8">
            <label className="text-gray-800 text-[13px] bg-white absolute px-2 top-[-9px] left-[18px] font-semibold">
              Password
            </label>
            <input
              required
              type={showPassword ? "password" : "text"}
              placeholder="Enter password"
              name="password"
              className="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-blue-600 rounded-md outline-none"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 cursor-pointer"
            >
              {showPassword ? (
                <IoIosEye size={25} color="#bbb" />
              ) : (
                <IoIosEyeOff size={25} color="#bbb" />
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-md"
              />
              <label
                htmlFor="remember-me"
                className="ml-3 block text-sm  text-gray-800"
              >
                Remember me
              </label>
            </div>
            <div>
              <a
                href="#"
                className="text-blue-600 font-semibold text-sm hover:underline"
              >
                Forgot Password?
              </a>
            </div>
          </div>

          <div className="mt-12">
            <button
              disabled={loading}
              type="submit"
              className="w-full disabled:cursor-not-allowed shadow-xl h-11 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
        <p className="text-sm text-gray-800  text-center">
          Dont have an account{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
