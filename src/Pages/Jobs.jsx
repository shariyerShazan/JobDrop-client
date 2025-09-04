import React, { useEffect, useState } from "react";
import axios from "axios";
import { JOB_API_ENDPOINT } from "../utils/Api";
import AOS from "aos";
import "aos/dist/aos.css";
import { MdWork } from "react-icons/md";
import { toast } from "react-toastify";
import { Link } from "react-router";
import { FaBriefcase } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";


function Jobs() {
  useEffect(()=>{
    document.title = "Jobs | JobDrop"
  }, [])
  
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("card");
  const [salarySort, setSalarySort] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 9;

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${JOB_API_ENDPOINT}/get-all-job`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setJobs(res.data.job);
        setFilteredJobs(res.data.job);
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let temp = [...jobs];

    // Search filter
    if (searchTerm) {
      temp = temp.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Experience filter
    if (experienceFilter) {
      temp = temp.filter((job) => job.experienceLevel === experienceFilter);
    }

    // Type filter
    if (typeFilter) {
      temp = temp.filter((job) => job.jobType === typeFilter);
    }

    // Salary sorting
    if (salarySort === "low") {
      temp.sort((a, b) => a.salary - b.salary);
    } else if (salarySort === "high") {
      temp.sort((a, b) => b.salary - a.salary);
    }

    setFilteredJobs(temp);
    setCurrentPage(1); // reset to first page after filter
  }, [searchTerm, salarySort, experienceFilter, typeFilter, jobs]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div className="min-h-screen py-10 px-4 ">
      <div className=" mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-myPrimary flex items-center gap-2">
          <MdWork className="text-4xl animate-bounce" /> All Jobs
        </h2>

       <div className="grid grid-cols-30 gap-4">
         {/* Filters */}
         <div className="flex gap-4 flex-col col-span-5 ">
          <input
            type="text"
            placeholder="Search by title"
            className="border border-myPrimary p-2 rounded"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            onChange={(e) => setExperienceFilter(e.target.value)}
            className="border  border-myPrimary p-2 rounded"
          >
            <option value="">All Experience</option>
            <option value="Entry level">Entry level</option>
            <option value="Mid level">Mid level</option>
            <option value="Senior">Senior</option>
          </select>
          <select
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border  border-myPrimary p-2 rounded"
          >
            <option value="">All Types</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Internship">Internship</option>
          </select>
          <select
            onChange={(e) => setSalarySort(e.target.value)}
            className="border  border-myPrimary p-2 rounded"
          >
            <option value="">Sort by Salary</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
          <div className="mb-6 text-right">
          <button
            onClick={() => setView(view === "card" ? "table" : "card")}
            className="w-full bg-myPrimary/80 hover:bg-myPrimary cursor-pointer text-white px-4 py-2 rounded shadow"
          >
            {view === "card" ? "Switch to Table View" : "Switch to Card View"}
          </button>
        </div>
        </div>
        

        <div className="col-span-25">
            {/* Jobs */}
        {loading ? (
          <div className="flex justify-center items-center flex-col py-20 text-myPrimary">
          <div className="animate-spin text-4xl mb-4">
            <FaSpinner size={100}/>
          </div>
          <p className="text-lg font-medium">Loading, please wait...</p>
        </div>
        
        ) : filteredJobs.length === 0 ? (
          <div className="flex h-[50vh] justify-center items-center flex-col py-10 text-gray-600">
  <div className="text-4xl mb-2 text-myPrimary animate-bounce">
    <FaBriefcase size={100}/>
  </div>
  <p className="text-lg font-medium">No Job Found</p>
</div>

        ) : view === "card" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentJobs.map((job, index) => (
            <div
              key={job._id}
              data-aos="fade-up"
              data-aos-delay={`${index * 300}`}
              className="bg-white border border-myPrimary rounded-xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all"
            >
              <h3 className="text-xl font-bold text-myPrimary mb-3 flex items-center gap-2">
                <MdWork className=" animate-bounce" /> {job.title}
              </h3>
              <div className="space-y-1 text-sm text-gray-700">
                <p><strong>Type:</strong> {job.jobType}</p>
                <p><strong>Experience:</strong> {job.experienceLevel}</p>
                <p><strong>Salary:</strong> ${job.salary} LPA</p>
                <p><strong>Company:</strong> {job.companyName}</p>
                <p><strong>Location:</strong> {job.location}</p>
              </div>
              <div className="mt-4 text-right">
                <Link
                  to={`/job-details/${job._id}`}
                  className="inline-block bg-mySecondary hover:bg-myPrimary text-white px-4 py-2 rounded shadow transition-all duration-200"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        ) : (
          <div className="overflow-x-auto shadow-xl  rounded-xl">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-mySecondary text-white">
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Experience</th>
                <th className="p-3 text-left">Salary (LPA)</th>
                <th className="p-3 text-left">Company</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentJobs.map((job, index) => (
                <tr
                  key={job._id}
                  className=" hover:bg-myPrimary/10 transition"
                  data-aos="fade-up"
                  data-aos-delay={`${index * 300}`}
                >
                  <td className="p-3 font-semibold text-myPrimary">{job.title}</td>
                  <td className="p-3">{job.jobType}</td>
                  <td className="p-3">{job.experienceLevel}</td>
                  <td className="p-3">${job.salary}</td>
                  <td className="p-3">{job.companyName}</td>
                  <td className="p-3">{job.location}</td>
                  <td className="p-3">
                    <Link
                      to={`/job-details/${job._id}`}
                      className="bg-mySecondary hover:bg-myPrimary text-white py-1 px-3 rounded shadow text-sm"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        )}
        </div>
       </div>

{totalPages > 1 && (
  <div className="mt-12 flex justify-center gap-2 items-center flex-wrap">
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
      disabled={currentPage === 1}
    >
      Prev
    </button>

    {[...Array(totalPages)].map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentPage(index + 1)}
        className={`px-3 py-1 rounded cursor-pointer ${
          currentPage === index + 1
            ? "bg-myPrimary text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        {index + 1}
      </button>
    ))}

    <button
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
)}
      </div>
    </div>
  );
}

export default Jobs;
