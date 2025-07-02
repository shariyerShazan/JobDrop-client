import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { IoMenu } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { SiCountingworkspro } from "react-icons/si";
import { TbInfoOctagon } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/Api";
import { toast } from "react-toastify";
import { MdDashboard } from "react-icons/md";
import { PiNetworkBold } from "react-icons/pi";
import { MyContext } from "../context/MyContext";

const Navbar = () => {
  const { user , setUser } = useContext(MyContext);
  const role = user?.role;
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const allAdminLinks = [
    { name: "Home", to: "/", logo: <FaHome /> },
    { name: "Jobs", to: "/jobs", logo: <SiCountingworkspro /> },
    { name: "Dashboard", to: "/Dashboard", logo: <MdDashboard /> },
    { name: "About", to: "/about", logo: <TbInfoOctagon /> },
  ];
  const normalLink= [
    { name: "Home", to: "/", logo: <FaHome /> },
    { name: "Jobs", to: "/jobs", logo: <SiCountingworkspro /> },
    // { name: "Dashboard", to: "/Dashboard", logo: <MdDashboard /> },
    { name: "About", to: "/about", logo: <TbInfoOctagon /> },
  ];
  const allStudentLinks = [
    { name: "Home", to: "/", logo: <FaHome /> },
    { name: "Jobs", to: "/jobs", logo: <SiCountingworkspro /> },
    { name: "My applied job", to: "/my-applied-job", logo: <PiNetworkBold /> },
    { name: "About", to: "/about", logo: <TbInfoOctagon /> },
  ];
  const getAllLinks = (role) => {
    if (role === "Student") {
      return allStudentLinks;
    } else if (role === "Recruiter") {
      return allAdminLinks;
    } else {
      return normalLink ;
    }
  };
  const allLinks = getAllLinks(role);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/logout`,
        {},
        { withCredentials: true }
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message || "Logout successful");
        setOpenModal(false);
        setUser(null)
        setOpenMobileMenu(false);
        navigate("/login-register");
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      toast.error(msg);
    }
  };

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "font-bold border-b-2 border-myPrimary rounded-md px-6 py-1 flex items-center gap-2"
      : "hover:border-b-2 hover:border-myPrimary hover:rounded-md px-6 py-1 flex items-center gap-2";

  return (
    <div className="shadow-md bg-white relative z-50">
      <div className="w-[90%] mx-auto">
        <div className="px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-myPrimary">JobDrop</div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-6 text-base">
            {allLinks.map((link, idx) => (
              <NavLink key={idx} to={link.to} className={navLinkStyle}>
                {link.logo} {link.name}
              </NavLink>
            ))}
          </div>

          {/* Profile Picture or Login (Desktop) */}
          <div className="relative hidden md:block">
            {user ? (
              <>
                <img
                  src={
                    user?.profile?.profilePhoto ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt="profile"
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-myPrimary object-cover"
                  onClick={() => {
                    setOpenModal(!openModal);
                    setOpenMobileMenu(false);
                  }}
                />

                {/* Desktop Modal */}
                {openModal && (
                  <div className="absolute right-0 mt-2 w-44 bg-white text-gray-800 shadow-lg rounded-lg z-50">
                    <div className="px-4 py-3 text-sm">
                      <NavLink
                        to="/profile"
                        className="flex gap-2 items-center w-full text-left rounded px-2 py-1 hover:border-b-2 hover:border-myPrimary"
                        onClick={() => setOpenModal(false)}
                      >
                        <CgProfile size={18} />
                        View Profile
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="flex gap-2 items-center w-full text-left rounded px-2 py-1 mt-1 hover:border-b-2 hover:border-myPrimary cursor-pointer"
                      >
                        <IoLogOutOutline size={18} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <NavLink
                to="/login-register"
                className="font-semibold text-myPrimary px-4 py-2 border border-myPrimary rounded hover:bg-myPrimary hover:text-white transition"
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile Icons */}
          <div className="md:hidden flex items-center gap-3">
            <IoMenu
              className="text-3xl text-myPrimary cursor-pointer"
              onClick={() => {
                setOpenMobileMenu(!openMobileMenu);
                setOpenModal(false);
              }}
            />
            {user ? (
              <img
                src={
                  user?.profile?.profilePhoto ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuNhTZJTtkR6b-ADMhmzPvVwaLuLdz273wvQ&s"
                }
                alt="profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-myPrimary"
                onClick={() => {
                  setOpenModal(!openModal);
                  setOpenMobileMenu(false);
                }}
              />
            ) : (
              <NavLink
                to="/login-register"
                className="font-semibold text-myPrimary px-4 py-2 border border-myPrimary rounded hover:bg-myPrimary hover:text-white transition"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {openMobileMenu && (
        <div className="md:hidden absolute top-full right-0 w-[60%] bg-white shadow-md rounded-b-lg py-3 z-40 text-center flex flex-col gap-3">
          {allLinks.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.to}
              onClick={() => setOpenMobileMenu(false)}
              className={navLinkStyle}
            >
              {link.logo} {link.name}
            </NavLink>
          ))}
        </div>
      )}

      {/* Mobile Profile Modal */}
      {openModal && (
        <div className="md:hidden absolute top-full right-0 w-[60%] bg-white shadow-md rounded-b-lg py-3 z-40 text-center">
          <NavLink
            to="/profile"
            className="flex gap-2 items-center text-left px-6 py-2 hover:border-b-2 rounded-md hover:border-myPrimary"
            onClick={() => setOpenModal(false)}
          >
            <CgProfile size={20} />
            View Profile
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex gap-2 items-center w-full text-left px-6 py-2 hover:border-b-2 rounded-md hover:border-myPrimary cursor-pointer"
          >
            <IoLogOutOutline size={20} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
