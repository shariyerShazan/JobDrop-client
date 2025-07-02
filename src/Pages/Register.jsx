import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { USER_API_ENDPOINT } from "../utils/Api";
import axios from "axios";
import { toast } from "react-toastify";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

function Register() {

  const [eyeOpen, setEyeOpen] = useState(false)
  const navigate = useNavigate()
  const [error, setError] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault();
    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const role = e.target.role.value;
    // const contactNumber = e.target.contactNumber.value;
    // console.log(fullName, password);

    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/register`,
        { fullName, email, password, role
          // , contactNumber 
        },
        { withCredentials: true }
      );
    
      if (res?.data?.success) {
        toast.success(res?.data?.message || "Registration successful");
        setError("");
        navigate('/login')
        e.target.reset();
      } else {
        setError(res?.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message || error.message || "Server error");
    }
    
  };
  return (
    <div className="w-[90%] h-[70vh] mx-auto flex flex-col gap-4  justify-center items-center sm:mt-12 mt-32">
      <div className="relative p-[2px] rounded-xl animated-border group ">
        <div className="rounded-xl h-full bg-white  grid grid-cols-1 sm:grid-cols-2">
        <div className="flex justify-center items-center bg-purple-300 p-22 rounded-xl rounded-b-[50%] sm:rounded-bl-xl  sm:rounded-r-[50%]">
          <span className="" >
                Already have an account? <br />
                <Link to={"/login"} className="btn bg-mySecondary hover:bg-myPrimary w-full rounded-full">Login</Link>
              </span>
          </div>
          <form className="p-22" action="" onSubmit={handleRegister}>
          <h2 className="text-2xl font-bold  mb-5 w-max mx-auto ">
            Register your account
          </h2>
            <div className="flex flex-col gap-3">
              <input
                className="rounded-full p-2 min-w-72 border-mySecondary border-2 block sm:hidden sm:group-hover:block"
                type="text"
                name="fullName"
                placeholder="Enter your name here"
              />

              <input
                className="rounded-full p-2 min-w-72 border-mySecondary border-2 block sm:hidden sm:group-hover:block"
                type="email"
                name="email"
                placeholder="Enter your email here"
              />
              {/* <input
                className="rounded-full p-2 min-w-72 border-mySecondary border-2 block sm:hidden sm:group-hover:block"
                type="text"
                name="contactNumber"
                placeholder="Enter your phone number here"
              /> */}
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
              <select name="role" id="" defaultValue={"Student"} className="border-mySecondary border-2 p-2 rounded-full cursor-pointer block sm:hidden sm:group-hover:block">
                <option value="Student">Student</option>
                <option value="Recruiter">Recruiter</option>
              </select>
              <hr />

              <button
                type="submit"
                className="btn rounded-full bg-mySecondary hover:bg-myPrimary"
              >
                Register
              </button>
              
                <span className="text-red-500">
                  {error}
                </span>
              
              
            </div>
          </form>
         
          
        </div>
      </div>
      
    </div>
  );
}

export default Register;
