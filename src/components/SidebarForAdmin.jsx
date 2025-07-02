import React from "react";
import { MdDownloadDone } from "react-icons/md";
import { IoCreate } from "react-icons/io5";
import { FaRegFileAlt } from "react-icons/fa";
import { NavLink } from "react-router"; 
import { TiMessages } from "react-icons/ti";

function SidebarForAdmin() {
  const role = "Recruiter";

  const adminLinks = [
    { name: "Create Job", to: "create-job", logo: <IoCreate size={20} /> },
    { name: "Your Creation", to: "admin-job", logo: <FaRegFileAlt size={20} /> },
    { name: "Applicants", to: "applicants", logo: <MdDownloadDone size={20} /> },
    { name: "Chat with Applicants", to: "chats", logo: <TiMessages size={20} /> },
  ];

  const studentLinks = [
    { name: "Create Job", to: "create-job", logo: <IoCreate size={20} /> },
    { name: "Your Creation", to: "admin-job", logo: <FaRegFileAlt size={20} /> },
    { name: "Applicants", to: "applicants", logo: <MdDownloadDone size={20} /> },
  ];

  const getAllLinks = (role) => {
    if (role === "Student") {
      return studentLinks;
    } else if (role === "Recruiter") {
      return adminLinks;
    } else {
      return [];
    }
  };

  const allLinks = getAllLinks(role);

  return (
    <div className="p-5 bg-white min-h-[80vh] space-y-2 shadow-xl">
      {allLinks.map((link, idx) => (
        <NavLink
          key={idx}
          to={link.to}
          className={({ isActive }) =>
            `flex items-center gap-3 text-lg px-4 py-4 rounded-md transition-all ${
              isActive
                ? "bg-myPrimary/85 hover:bg-myPrimary text-white shadow font-semibold"
                : "hover:bg-mySecondary/60  text-gray-800"
            }`
          }
        >
          {link.logo}
          {link.name}
        </NavLink>
      ))}
    </div>
  );
}

export default SidebarForAdmin;
