import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { USER_API_ENDPOINT } from "../utils/Api";
import { MyContext } from "../context/MyContext";

function LoginRegister() {
  const { setUser } = useContext(MyContext);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [eyeOpen, setEyeOpen] = useState(false);
  const [error, setError] = useState("");

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setEyeOpen(false);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const role = e.target.role.value;

    if (isLogin) {
      try {
        const res = await axios.post(
          `${USER_API_ENDPOINT}/login`,
          { email, password, role },
          { withCredentials: true }
        );
        if (res?.data?.success) {
          setUser(res?.data?.user);
          toast.success(res?.data?.message || "Login successful");
          navigate("/");
          e.target.reset();
        } else {
          setError(res?.data?.message || "Login failed");
        }
      } catch (err) {
        setError(err?.response?.data?.message || err.message || "Server error");
      }
    } else {
      const fullName = e.target.fullName.value;
      try {
        const res = await axios.post(
          `${USER_API_ENDPOINT}/register`,
          { fullName, email, password, role },
          { withCredentials: true }
        );
        if (res?.data?.success) {
          toast.success(res?.data?.message || "Registration successful");
          navigate("/login");
          e.target.reset();
        } else {
          setError(res?.data?.message || "Registration failed");
        }
      } catch (err) {
        setError(err?.response?.data?.message || err.message || "Server error");
      }
    }
  };

  return (
    <div className="w-full max-w-[900px] mx-auto h-[70vh] flex items-center justify-center overflow-hidden ">
      <div className="relative w-full h-[500px] bg-white shadow-xl rounded-2xl overflow-hidden ">
        <div className={`absolute top-0 left-0 w-full h-full flex transition-transform duration-1000 ease-in-out ${isLogin ? "translate-x-0" : "-translate-x-full"}`}>
          {/* Login Side */}
          <div className="w-1/2 h-full bg-purple-300 flex flex-col items-center justify-center p-8">
            <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
            <p className="mb-6">To keep connected with us please login with your personal info</p>
            <button onClick={handleToggle} className="btn bg-mySecondary hover:bg-myPrimary rounded-full">Register</button>
          </div>

          <div className="w-1/2 h-full flex items-center justify-center p-8 bg-white">
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
              <h2 className="text-2xl font-bold mb-4">Login</h2>
              <input type="email" name="email" placeholder="Email" required className="rounded-full p-2  border-mySecondary border-2 w-full mb-3" />
              <div className="relative mb-3">
                <input type={eyeOpen ? "text" : "password"} name="password" placeholder="Password" required className="rounded-full p-2  border-mySecondary border-2 w-full " />
                {eyeOpen ? <IoMdEyeOff size={20} className="absolute right-3 top-3 cursor-pointer" onClick={() => setEyeOpen(false)} /> : <IoMdEye size={20} className="absolute right-3 top-3 cursor-pointer" onClick={() => setEyeOpen(true)} />}
              </div>
              <select name="role" className="rounded-full p-2  border-mySecondary border-2 w-full mb-4">
                <option value="">Select a Role</option>
                <option value="Student">Student</option>
                <option value="Recruiter">Recruiter</option>
              </select>
              <button type="submit" className="btn w-full bg-mySecondary hover:bg-myPrimary">Login</button>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
          </div>
        </div>

        <div className={`absolute top-0 left-0 w-full h-full flex transition-transform duration-1000 ease-in-out ${isLogin ? "translate-x-full" : "translate-x-0"}`}>
          {/* Register Side */}
          <div className="w-1/2 h-full flex items-center justify-center p-8 bg-white">
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
              <h2 className="text-2xl font-bold mb-4">Register</h2>
              <input type="text" name="fullName" placeholder="Full Name" required className="rounded-full p-2  border-mySecondary border-2 w-full mb-3" />
              <input type="email" name="email" placeholder="Email" required className="rounded-full p-2  border-mySecondary border-2 w-full mb-3" />
              <div className="relative mb-3">
                <input type={eyeOpen ? "text" : "password"} name="password" placeholder="Password" required className="rounded-full p-2  border-mySecondary border-2 w-full" />
                {eyeOpen ? <IoMdEyeOff className="absolute right-3 top-3 cursor-pointer" onClick={() => setEyeOpen(false)} /> : <IoMdEye className="absolute right-3 top-3 cursor-pointer" onClick={() => setEyeOpen(true)} />}
              </div>
              <select name="role" className="rounded-full p-2  border-mySecondary border-2 w-full mb-4">
                <option value="">Select a Role</option>
                <option value="Student">Student</option>
                <option value="Recruiter">Recruiter</option>
              </select>
              <button type="submit" className="btn w-full bg-mySecondary hover:bg-myPrimary">Register</button>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
          </div>

          <div className="w-1/2 h-full bg-purple-300 flex flex-col items-center justify-center p-8">
            <h2 className="text-2xl font-bold mb-4">Hello, Friend!</h2>
            <p className="mb-6">Enter your personal details and start your journey with us</p>
            <button onClick={handleToggle} className="btn bg-mySecondary hover:bg-myPrimary rounded-full">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
