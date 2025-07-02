import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { USER_API_ENDPOINT } from "../utils/Api";
import { MyContext } from "../context/MyContext";


function Login() {
const {setUser} = useContext(MyContext)
  const [eyeOpen, setEyeOpen] = useState(false)
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const role = e.target.role.value;

    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/login`,
        { email, password, role },
        { withCredentials: true }
      );

      if (res?.data?.success) {
        setUser(res?.data?.user)
        toast.success(res?.data?.message || "Login successful");
        setError("");
        navigate("/");
        e.target.reset();
      } else {
        setError(res?.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      setError(
        error?.response?.data?.message || error.message || "Server error"
      );
    }
  };

  return (
    <div className="w-[90%] h-[70vh] mx-auto flex  gap-4 justify-center items-center sm:mt-12 mt-22">
      <div className="relative p-[2px]  rounded-xl animated-border group ">
        <div className="grid grid-cols-1 sm:grid-cols-2 rounded-xl h-full bg-white ">
          <form
            action=""
            className=" gap-5 p-22"
            onSubmit={handleLogin}
          >
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-bold  mb-5 w-max mx-auto">
                Login your account
              </h2>
              <input
                className="rounded-full p-2 min-w-72 border-mySecondary border-2 block sm:hidden sm:group-hover:block"
                type="email"
                name="email"
                placeholder="Enter your email here"
              />
             <div className="relative">
             <input
                className="  rounded-full p-2 min-w-72 border-mySecondary border-2 block sm:hidden sm:group-hover:block"
                type={`${eyeOpen? "text" : "password"}`}
                name="password"
                placeholder="Enter your password here"
              />
              {
                !eyeOpen?  <IoMdEye onClick={()=>{setEyeOpen(!eyeOpen)}} size={20} className=" absolute top-1/4 right-4 block sm:hidden sm:group-hover:block cursor-pointer" /> : <IoMdEyeOff onClick={()=>{setEyeOpen(!eyeOpen)}}  size={20} className=" absolute top-1/4 right-4 block sm:hidden sm:group-hover:block cursor-pointer" />
              }
              </div> 
              <select
                name="role"
                id=""
                defaultValue={"Student"}
                className="border-mySecondary border-2 p-2 rounded-full cursor-pointer block sm:hidden sm:group-hover:block"
              >
                <option value="Student">Student</option>
                <option value="Recruiter">Recruiter</option>
              </select>
              <hr />

              <button
                type="submit"
                className="btn rounded-full bg-mySecondary hover:bg-myPrimary"
              >
                Login
              </button>
              <span className="text-red-500">{error}</span>
            </div>
           
          </form>
          <div className="flex justify-center items-center bg-purple-300 p-22 rounded-xl rounded-t-[50%] sm:rounded-t-xl sm:rounded--xl sm:rounded-l-[50%]">
              <span className="">
                Have no account? <br />{" "}
                <Link to={"/register"} className="bg-mySecondary hover:bg-myPrimary btn w-full rounded-full">Register</Link>
              </span>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
