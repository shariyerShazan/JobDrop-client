import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { MdWork } from 'react-icons/md';
import { FaBuilding, FaFileAlt } from 'react-icons/fa';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { IoLocationSharp } from 'react-icons/io5';
import { DiRequirejs } from "react-icons/di";
import { RxVercelLogo } from "react-icons/rx";
import axios from 'axios';
import { JOB_API_ENDPOINT } from '../../utils/Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

function CreateJobs() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSubmitJob = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;
    const requirements = e.target.requirements.value;
    const salary = e.target.salary.value;
    const experienceLevel = e.target.experienceLevel.value;
    const location = e.target.location.value;
    const jobType = e.target.jobType.value;
    const companyName = e.target.companyName.value;
    const companyLogo = e.target.companyLogo.value;

    try {
      const res = await axios.post(
        `${JOB_API_ENDPOINT}/create-job`,
        {
          title,
          description,
          requirements,
          salary,
          experienceLevel,
          location,
          jobType,
          companyName,
          companyLogo,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast(res.data.message);
        navigate("/Dashboard/admin-job");
        e.target.reset();
      } else {
        toast.error(res.data.message || "Something went wrong");
      }

    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div data-aos="fade-up" className="max-w-6xl mx-auto bg-white p-6 shadow-xl rounded-xl">
        <h2 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2 text-myPrimary">
          <MdWork className="text-4xl animate-bounce" /> Create a New Job
        </h2>

        <form onSubmit={handleSubmitJob}>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Side */}
            <div className="flex flex-col gap-4" data-aos="fade-right">
              <div>
                <label className="block font-medium mb-1 text-gray-700">Job Title</label>
                <div className="flex items-center gap-2">
                  <FaFileAlt size={20} className="text-xl text-myPrimary" />
                  <input
                    type="text"
                    name="title"
                    placeholder="Job title"
                    className="border-2 border-mySecondary w-full p-2 rounded-md"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-700">Salary (in LPA)</label>
                <div className="flex items-center gap-2">
                  <RiMoneyDollarCircleFill size={20} className="text-xl text-myPrimary" />
                  <input
                    type="number"
                    name="salary"
                    placeholder="Salary in LPA"
                    className="border-2 border-mySecondary w-full p-2 rounded-md"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-700">Requirements</label>
                <div className="flex items-center gap-2">
                  <DiRequirejs size={20} className="text-xl text-myPrimary" />
                  <input
                    type="text"
                    name="requirements"
                    placeholder="Requirements (e.g. React, Node, Express)"
                    className="border-2 border-mySecondary w-full p-2 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-700">Location</label>
                <div className="flex items-center gap-2">
                  <IoLocationSharp size={20} className="text-xl text-myPrimary" />
                  <input
                    type="text"
                    name="location"
                    placeholder="Office location"
                    className="border-2 border-mySecondary w-full p-2 rounded-md"
                    required
                  />
                </div>
              </div>

              <img
                src="https://thumbs.dreamstime.com/b/job-logo-design-vector-job-search-icon-magnifying-glass-choose-people-hire-symbol-job-employee-logo-job-logo-design-239526625.jpg"
                alt="office"
                className="w-72 mx-auto mt-4 aos-init aos-animate object-cover rounded-full"
                data-aos="zoom-in"
              />
            </div>

            {/* Right Side */}
            <div className="flex flex-col gap-4" data-aos="fade-left">
              <div>
                <label className="block font-medium mb-1 text-gray-700">Job Description</label>
                <textarea
                  name="description"
                  placeholder="Description about job"
                  className="border-2 border-mySecondary w-full p-2 rounded-md h-[100px]"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-700">Experience Level & Job Type</label>
                <div className="flex gap-2">
                  <select
                    name="experienceLevel"
                    className="border-2 border-mySecondary w-full p-2 rounded-md"
                    required
                  >
                    <option value={""}>Slelect exprerience </option>
                    <option value={"Entry level"}>Entry level</option>
                    <option value={"Mid level"}>Mid level</option>
                    <option value={"Senior"}>Senior</option>
                  </select>

                  <select
                    name="jobType"
                    className="border-2 border-mySecondary w-full p-2 rounded-md"
                    required
                  >
                    <option value={""}>Select a job type</option>
                    <option value={"Full Time"}>Full Time</option>
                    <option value={"Part Time"}>Part Time</option>
                    <option value={"Internship"}>Internship</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-700">Company Name</label>
                <div className="flex gap-2 items-center">
                  <FaBuilding size={20} className="text-xl text-myPrimary" />
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Company name"
                    className="border-2 border-mySecondary w-full p-2 rounded-md"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-700">Company Logo URL</label>
                <div className="flex gap-2 items-center">
                  <RxVercelLogo size={20} className="text-xl text-myPrimary" />
                  <input
                    type="text"
                    name="companyLogo"
                    placeholder="Company logo"
                    className="border-2 border-mySecondary w-full p-2 rounded-md"
                    required
                  />
                </div>
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
                Create Job
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateJobs;
