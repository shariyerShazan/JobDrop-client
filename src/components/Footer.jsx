import React from "react";
import { FaFacebook, FaInstagram , FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import { Link } from "react-router";

function Footer() {
  return (
    <footer className=" py-8 mt-10 border-t-2 border-myPrimary shadow-xl ">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2">JobDrop</h2>
          <p className="text-sm">
            Your trusted career partner. We connect talents with top companies and provide endless job opportunities.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:font-extrabold ">Home</Link></li>
            <li><Link to="/jobs" className="hover:font-extrabold">Jobs</Link></li>
            <li><Link to="/about" className="hover:font-extrabold">About Us</Link></li>
            <li><Link to="/profile" className="hover:font-extrabold">Profile</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl">
          <a
  href="https://facebook.com"
  target="_blank"
  rel="noreferrer"
  className="p-2 rounded-full hover:text-blue-600 hover:scale-125 transition-colors"
>
  <FaFacebook className="" />
</a>

<a
  href="https://instagram.com"
  target="_blank"
  rel="noreferrer"
  className="p-2 rounded-full hover:text-pink-500 hover:scale-125 transition-colors"
>
  <FaInstagram className="" />
</a>

<a
  href="https://linkedin.com"
  target="_blank"
  rel="noreferrer"
  className="p-2 rounded-full hover:text-blue-700 hover:scale-125 transition-colors"
>
  <FaLinkedin className="" />
</a>

<a
  href="https://twitter.com"
  target="_blank"
  rel="noreferrer"
  className="p-2 rounded-full hover:text-sky-500  hover:scale-125 transition-colors"
>
  <FaTwitter className="" />
</a>

<a
  href="https://github.com"
  target="_blank"
  rel="noreferrer"
  className="p-2 rounded-full hover:text-gray-700 hover:scale-125 transition-colors"
>
  <FaGithub className="" />
</a>

          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-4 border-t border-white/30 pt-4 text-center text-sm">
        © {new Date().getFullYear()} JobDrop. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
