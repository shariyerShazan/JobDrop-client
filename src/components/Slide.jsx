import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const Slide = () => {
  return (
    <div
      className="relative w-full h-[60vh] flex items-center justify-center text-white px-4"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/80"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Find Your <span className="text-myPrimary">Dream Job</span> Today
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-200">
          Explore thousands of job opportunities from top recruiters and companies.
        </p>
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 bg-myPrimary/80 hover:bg-myPrimary cursor-pointer text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition font-semibold shadow"
        >
          Browse Jobs <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default Slide;
