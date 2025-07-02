import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router";
import {
  FaBrain,
  FaUserShield,
  FaBell,
  FaRegFileAlt,
  FaGlobe,
  FaThumbtack,
  FaChartLine,
  FaComments,
} from "react-icons/fa";

const features = [
  {
    title: "Smart Job Matching",
    desc: "Matches you with jobs that fit your skills.",
    icon: <FaBrain className="text-4xl text-myPrimary mx-auto" />,
  },
  {
    title: "Verified Employers",
    desc: "Only real & trusted companies post here.",
    icon: <FaUserShield className="text-4xl text-myPrimary mx-auto" />,
  },
  {
    title: "Real-Time Notifications",
    desc: "Get instant updates for job postings.",
    icon: <FaBell className="text-4xl text-myPrimary mx-auto" />,
  },
  {
    title: "Easy Apply",
    desc: "Apply to jobs with just one click.",
    icon: <FaRegFileAlt className="text-4xl text-myPrimary mx-auto" />,
  },
  {
    title: "Remote Jobs",
    desc: "Work from anywhere in the world.",
    icon: <FaGlobe className="text-4xl text-myPrimary mx-auto" />,
  },
  {
    title: "Saved Jobs",
    desc: "Bookmark jobs to apply later.",
    icon: <FaThumbtack className="text-4xl text-myPrimary mx-auto" />,
  },
  {
    title: "Profile Dashboard",
    desc: "Track your applications easily.",
    icon: <FaChartLine className="text-4xl text-myPrimary mx-auto" />,
  },
  {
    title: "Employer Chat",
    desc: "Connect with recruiters directly.",
    icon: <FaComments className="text-4xl text-myPrimary mx-auto" />,
  },
];

const animationTypes = [
  "fade-up",
  "fade-right",
  "fade-left",
  "zoom-in",
  "fade-up",
  "fade-down",
  "flip-left",
  "flip-right",
];

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-gray-800">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center text-myPrimary mb-3">About JobDrop</h1>
      <p className="text-center text-lg mb-12 text-gray-600 max-w-2xl mx-auto">
        JobDrop is the platform that connects skilled individuals with top companies. We aim to make job hunting fast, personalized, and trustworthy for everyone.
      </p>

      {/* Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((item, index) => (
          <div
            key={index}
            data-aos={animationTypes[index]}
            className="bg-white border border-gray-200 p-6 rounded-xl shadow hover:shadow-lg transition duration-300 text-center"
          >
            <div className="mb-3">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-myPrimary">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 bg-myPrimary/10 p-8 rounded-xl text-center border-x-4 border-myPrimary">
        <h2 className="text-2xl font-semibold text-myPrimary mb-2"> Ready to land your dream job?</h2>
        <p className="mb-4 text-gray-700">Explore thousands of opportunities waiting just for you.</p>
        <Link
          to={"/jobs"}
          className="inline-block bg-myPrimary text-white px-6 py-2 rounded-lg shadow hover:bg-opacity-90 transition"
        >
          Browse Jobs
        </Link>
      </div>
    </div>
  );
};

export default About;
