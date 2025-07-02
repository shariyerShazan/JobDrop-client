import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { MdWork } from "react-icons/md";
import { FaBuilding, FaFileAlt, FaSpinner } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { IoLocationSharp } from "react-icons/io5";
import { DiRequirejs } from "react-icons/di";
import { RxVercelLogo } from "react-icons/rx";
import axios from "axios";
import { JOB_API_ENDPOINT } from "../../utils/Api";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router";

function UpdateAdminJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const res = await axios.get(`${JOB_API_ENDPOINT}/get-job-byId/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setJobData(res.data.job);
      } else {
        toast.error("Job not found");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch job");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedData = {
      title: e.target.title.value,
      description: e.target.description.value,
      requirements: e.target.requirements.value,
      salary: e.target.salary.value,
      experienceLevel: e.target.experienceLevel.value,
      location: e.target.location.value,
      jobType: e.target.jobType.value,
      companyName: e.target.companyName.value,
      companyLogo: e.target.companyLogo.value,
    };

    try {
      const res = await axios.put(
        `${JOB_API_ENDPOINT}/update-job-admin/${id}`,
        updatedData,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/dashboard/admin-job");
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to update job");
    }
  };

  if (!jobData) {
    return <div className="flex justify-center items-center flex-col py-20 text-myPrimary">
                <div className="animate-spin text-4xl mb-4">
                  <FaSpinner size={100}/>
                </div>
                <p className="text-lg font-medium">Loading, please wait...</p>
              </div>;
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <div data-aos="fade-up" className="max-w-6xl mx-auto bg-white p-6 shadow-xl rounded-xl">
        <h2 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2 text-myPrimary">
          <MdWork className="text-4xl animate-bounce" /> Update Job
        </h2>

        <form onSubmit={handleUpdate}>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left */}
            <div className="flex flex-col gap-4" data-aos="fade-right">
              <div className="flex items-center gap-2">
                <FaFileAlt size={20} className="text-xl text-myPrimary" />
                <input
                  type="text"
                  name="title"
                  defaultValue={jobData.title}
                  placeholder="Job title"
                  className="border-2 border-mySecondary w-full p-2 rounded-md"
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <RiMoneyDollarCircleFill size={20} className="text-xl text-myPrimary" />
                <input
                  type="number"
                  name="salary"
                  defaultValue={jobData.salary}
                  placeholder="Salary in LPA"
                  className="border-2 border-mySecondary w-full p-2 rounded-md"
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <DiRequirejs size={20} className="text-xl text-myPrimary" />
                <input
                  type="text"
                  name="requirements"
                  defaultValue={jobData.requirements.join(", ")}
                  placeholder="Requirements"
                  className="border-2 border-mySecondary w-full p-2 rounded-md"
                />
              </div>
              <div className="flex items-center gap-2">
                <IoLocationSharp size={20} className="text-xl text-myPrimary" />
                <input
                  type="text"
                  name="location"
                  defaultValue={jobData.location}
                  placeholder="Office location"
                  className="border-2 border-mySecondary w-full p-2 rounded-md"
                  required
                />
              </div>
              <img
                src="https://thumbs.dreamstime.com/b/job-logo-design-vector-job-search-icon-magnifying-glass-choose-people-hire-symbol-job-employee-logo-job-logo-design-239526625.jpg"
                alt="office"
                className="w-72 mx-auto mt-4 aos-init aos-animate object-cover"
                data-aos="zoom-in"
              />
            </div>

            {/* Right */}
            <div className="flex flex-col gap-4" data-aos="fade-left">
              <textarea
                name="description"
                defaultValue={jobData.description}
                placeholder="Description about job"
                className="border-2 border-mySecondary w-full p-2 rounded-md h-[100px]"
                required
              ></textarea>
              <div className="flex gap-2">
                <select
                  name="experienceLevel"
                  defaultValue={jobData.experienceLevel}
                  className="border-2 border-mySecondary w-full p-2 rounded-md"
                  required
                >
                  <option value="Entry level">Entry level</option>
                  <option value="Mid level">Mid level</option>
                  <option value="Senior">Senior</option>
                </select>
                <select
                  name="jobType"
                  defaultValue={jobData.jobType}
                  className="border-2 border-mySecondary w-full p-2 rounded-md"
                  required
                >
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div className="flex gap-2 items-center">
                <FaBuilding size={20} className="text-xl text-myPrimary" />
                <input
                  type="text"
                  name="companyName"
                  defaultValue={jobData.companyName}
                  placeholder="Company name"
                  className="border-2 border-mySecondary w-full p-2 rounded-md"
                  required
                />
              </div>
              <div className="flex gap-2 items-center">
                <RxVercelLogo size={20} className="text-xl text-myPrimary" />
                <input
                  type="text"
                  name="companyLogo"
                  defaultValue={jobData.companyLogo}
                  placeholder="Company logo"
                  className="border-2 border-mySecondary w-full p-2 rounded-md"
                  required
                />
              </div>
              <img
                src="https://t4.ftcdn.net/jpg/10/04/10/53/360_F_1004105360_BaJnSx8DNE660NFMoi2GRB4rUPy1lbXr.jpg"
                alt="company"
                className="w-32 mx-auto my-4 animate-bounce rounded-full object-cover"
                data-aos="zoom-in"
              />
              <button
                type="submit"
                className="cursor-pointer bg-mySecondary hover:bg-myPrimary text-white font-semibold py-2 rounded-md transition-all duration-300"
              >
                Update Job
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateAdminJob;
