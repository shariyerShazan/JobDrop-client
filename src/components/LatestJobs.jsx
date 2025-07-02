import React, { useEffect, useState } from "react";
import axios from "axios";
import { JOB_API_ENDPOINT } from "../utils/Api";
import { Link } from "react-router";
// import { FaMapMarkerAlt } from "react-icons/fa";
import { MdWork } from "react-icons/md";
// import { SiOpenaccess } from "react-icons/si";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";


function LatestJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800 });
    fetchLatestJobs();
  }, []);

  const fetchLatestJobs = async () => {
    try {
      const res = await axios.get(`${JOB_API_ENDPOINT}/get-all-job`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setJobs(res.data.job.slice(0, 6));
      } else {
        toast.error(res.data.message || "Failed to load latest jobs");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error while fetching jobs");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center flex-col py-20 text-myPrimary">
    <div className="animate-spin text-4xl mb-4">
      <FaSpinner size={100}/>
    </div>
    <p className="text-lg font-medium">Loading, please wait...</p>
  </div>
  ;
  }

  if (!jobs.length) {
    return <div className="flex h-[50vh] justify-center items-center flex-col py-10 text-gray-600">
    <div className="text-4xl mb-2 text-myPrimary animate-bounce">
      <FaBriefcase size={100}/>
    </div>
    <p className="text-lg font-medium">No Job Found</p>
  </div>
  ;
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-myPrimary text-center mb-8">
          Latest Job Postings
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {jobs.map((job, index) => (
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

        <div className="text-center mt-8">
          <Link
            to="/jobs"
            className="bg-myPrimary/80 font-semibold btn hover:bg-myPrimary rounded-md"
          >
            View All Jobs
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LatestJobs;
