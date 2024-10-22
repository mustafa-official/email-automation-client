import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import { FiUserPlus } from "react-icons/fi";
import { PiTelegramLogo } from "react-icons/pi";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleToggle = () => {
    setProfileOpen(!profileOpen);
  };

  const handleLogout = async () => {
    try {
      await logOutUser();
      navigate("/");
      toast.success("Logout Successful");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <nav className="bg-transparent sticky flex items-center shadow-md h-[66px] backdrop-blur-[6px] top-0 left-0 right-0  z-50">
      <div className="container px-6 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <h2 className="text-xl flex text-[#201e1e] items-center font-bold">
            <span className="font-medium  text-[19px]">pathao</span>MaiL
            <PiTelegramLogo className="rotate-[5deg] text-black" size={18} />
          </h2>
          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-500  hover:text-gray-600  focus:outline-none focus:text-gray-600 "
              aria-label="toggle menu"
            >
              {!isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute inset-x-0 z-20 w-full px-4 py-4 transition-all duration-300 ease-in-out bg-white  md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center ${
            isOpen ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-full"
          }`}
        >
          <div className="flex flex-col items-center md:flex-row gap-5">
            {!user && (
              <Link to="/register">
                <h2 className="ml-2  relative inline-block">
                  <button className="px-[16px] py-[8px] rounded-full  border w-max bg-[#1f1d1d] hover:bg-transparent text-white hover:border-[#1f1d1d] hover:text-[#1f1d1d] text-[16px] transform transition duration-200">
                    <h4 className="flex items-center font-medium gap-2">
                      <span>Register</span>
                      <FiUserPlus className="animate-pulse" size={18} />
                    </h4>
                  </button>
                </h2>
              </Link>
            )}
            {user && (
              <>
                <p className="text-neutral-900  duration-300 transform">
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? "  font-extrabold text-black"
                        : "hover:font-medium"
                    }
                  >
                    Dashboard
                  </NavLink>
                </p>
                <p className="text-neutral-900  duration-300 transform">
                  <NavLink
                    to="/smtp"
                    className={({ isActive }) =>
                      isActive
                        ? "  font-extrabold text-black"
                        : "hover:font-medium"
                    }
                  >
                    SMTP
                  </NavLink>
                </p>
                <p className="text-neutral-900 duration-300 transform">
                  <NavLink
                    to="/customer"
                    className={({ isActive }) =>
                      isActive
                        ? "  font-extrabold text-black"
                        : "hover:font-medium"
                    }
                  >
                    Customers
                  </NavLink>
                </p>
                <p className="text-neutral-900 duration-300 transform">
                  <NavLink
                    to="/campaign"
                    className={({ isActive }) =>
                      isActive
                        ? "  font-extrabold text-black"
                        : "hover:font-medium"
                    }
                  >
                    Campaign
                  </NavLink>
                </p>
              </>
            )}
            {user && (
              <div className="relative  w-max mx-auto">
                <button
                  title={user?.displayName}
                  type="button"
                  id="dropdownToggle"
                  className="px-[6px] min-w-44 py-[6px] hover:border hover:border-blue-300  flex justify-center items-center rounded-full text-[#333] text-sm border border-gray-300 outline-none bg-gray-100"
                  onClick={handleToggle}
                >
                  <img
                    src="https://readymadeui.com/profile_6.webp"
                    className="w-7 h-7 mr-[6px] rounded-full shrink-0"
                    alt="Profile"
                  />
                  <span className="hidden sm:flex">
                    {user?.displayName.length > 12
                      ? `${user?.displayName.slice(0, 12)}...`
                      : user?.displayName}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[10px] h-[10px] mr-1 fill-gray-600 inline ml-1"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                      clipRule="evenodd"
                      data-original="#000000"
                    />
                  </svg>
                </button>

                {profileOpen && (
                  <ul
                    id="dropdownMenu"
                    className="absolute block bg-white shadow-2xl  py-2 z-[1000] min-w-max  mt-1 rounded-lg max-h-96 overflow-auto"
                  >
                    <li
                      title={user?.email}
                      className="py-2.5  px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="w-4 h-4 mr-3"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M337.711 241.3a16 16 0 0 0-11.461 3.988c-18.739 16.561-43.688 25.682-70.25 25.682s-51.511-9.121-70.25-25.683a16.007 16.007 0 0 0-11.461-3.988c-78.926 4.274-140.752 63.672-140.752 135.224v107.152C33.537 499.293 46.9 512 63.332 512h385.336c16.429 0 29.8-12.707 29.8-28.325V376.523c-.005-71.552-61.831-130.95-140.757-135.223zM446.463 480H65.537V376.523c0-52.739 45.359-96.888 104.351-102.8C193.75 292.63 224.055 302.97 256 302.97s62.25-10.34 86.112-29.245c58.992 5.91 104.351 50.059 104.351 102.8zM256 234.375a117.188 117.188 0 1 0-117.188-117.187A117.32 117.32 0 0 0 256 234.375zM256 32a85.188 85.188 0 1 1-85.188 85.188A85.284 85.284 0 0 1 256 32z"
                          data-original="#000000"
                        ></path>
                      </svg>
                      {user?.email.length > 12
                        ? `${user?.email.slice(0, 12)}...`
                        : user?.email}
                    </li>

                    <button
                      onClick={() => handleLogout()}
                      className="py-2.5 px-5 flex group  items-center w-full hover:bg-gray-100 text-[#333] hover:text-red-500 text-sm cursor-pointer"
                    >
                      <span className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="w-4 h-4 mr-3 transition rotate-90 group-hover:rotate-0 group-hover:text-red-500"
                          viewBox="0 0 6.35 6.35"
                        >
                          <path
                            d="M3.172.53a.265.266 0 0 0-.262.268v2.127a.265.266 0 0 0 .53 0V.798A.265.266 0 0 0 3.172.53zm1.544.532a.265.266 0 0 0-.026 0 .265.266 0 0 0-.147.47c.459.391.749.973.749 1.626 0 1.18-.944 2.131-2.116 2.131A2.12 2.12 0 0 1 1.06 3.16c0-.65.286-1.228.74-1.62a.265.266 0 1 0-.344-.404A2.667 2.667 0 0 0 .53 3.158a2.66 2.66 0 0 0 2.647 2.663 2.657 2.657 0 0 0 2.645-2.663c0-.812-.363-1.542-.936-2.03a.265.266 0 0 0-.17-.066z"
                            data-original="#000000"
                          ></path>
                        </svg>
                        Logout
                      </span>
                    </button>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
