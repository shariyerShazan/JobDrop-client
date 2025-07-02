import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "../utils/Api";
import { toast } from "react-toastify";
import { MyContext } from "../context/MyContext";
import {
  MdLocationOn,
  MdDescription,
  MdOutlineContactMail,
} from "react-icons/md";
import { BsCurrencyDollar, BsClockHistory } from "react-icons/bs";
import { FaBuilding, FaUserTie, FaTasks, FaSpinner, FaBriefcase } from "react-icons/fa";

function JobDetails() {
  const { user } = useContext(MyContext);
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    fetchJobDetails();
    fetchAppliedJobs();
  }, []);

  const fetchJobDetails = async () => {
    try {
      const res = await axios.get(`${JOB_API_ENDPOINT}/get-job-byId/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setJob(res.data.job);
      } else {
        toast.error(res.data.message || "Job not found");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch job details");
    } finally {
      setLoading(false);
    }
  };

  const fetchAppliedJobs = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/get-applied-jobs`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setAppliedJobs(res.data.application || []);
      }
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
    }
  };

  const handleApplyJob = async (jobId) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/apply-job/${jobId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        fetchAppliedJobs();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log("Apply job error:", error);
    }
  };

  if (loading) return  <div className="flex justify-center items-center flex-col py-20 text-myPrimary">
            <div className="animate-spin text-4xl mb-4">
              <FaSpinner size={100}/>
            </div> </div>;

  if (!job) return <div className="flex h-[50vh] justify-center items-center flex-col py-10 text-gray-600">
    <div className="text-4xl mb-2 text-myPrimary animate-bounce">
      <FaBriefcase size={100}/>
    </div> </div>;

  const hasApplied = appliedJobs.some(
    (data) => data?.job?._id?.toString() === id?.toString()
  );

  const isOwnPost = job?.createdBy?._id?.toString() === user?._id?.toString();
  const isRecruiter = user?.role === "Recruiter";
  const isButtonDisabled = isOwnPost || isRecruiter || hasApplied;

  const buttonText = isOwnPost
    ? "Your Post"
    : hasApplied
    ? "Already Applied": isRecruiter? "Recruiter can't apply"
    : "Apply";

  return (
    <div className="min-h-screen py-10 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white shadow-xl p-8 rounded-2xl transition-all hover:shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <img
            src={job.companyLogo}
            alt="Company Logo"
            className="w-20 h-20 object-cover rounded-full border border-myPrimary"
          />
          <div>
            <h2 className="text-3xl font-bold text-myPrimary">{job.title}</h2>
            <p className="text-gray-600 font-medium flex items-center gap-2">
              <FaBuilding /> {job.companyName}
            </p>
          </div>
        </div>

        {/* Job Info */}
        <div className="grid sm:grid-cols-2 gap-4 text-gray-700 mb-6">
          <p className="flex items-center gap-2">
            <MdLocationOn className="text-lg" />
            <strong>Location:</strong> {job.location}
          </p>
          <p className="flex items-center gap-2">
            <BsCurrencyDollar className="text-lg" />
            <strong>Salary:</strong> ${job.salary} LPA
          </p>
          <p className="flex items-center gap-2">
            <BsClockHistory className="text-lg" />
            <strong>Type:</strong> {job.jobType}
          </p>
          <p className="flex items-center gap-2">
            <FaTasks className="text-lg" />
            <strong>Experience:</strong> {job.experienceLevel}
          </p>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h4 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <MdDescription /> Description
          </h4>
          <p className="text-gray-700">{job.description}</p>
        </div>

        {/* Requirements */}
        <div className="mb-6">
          <h4 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <FaTasks /> Requirements
          </h4>
          <ul className="list-disc list-inside text-gray-700">
            {Array.isArray(job.requirements)
              ? job.requirements.map((req, i) => <li key={i}>{req}</li>)
              : <li>{job.requirements}</li>}
          </ul>
        </div>

        {/* Creator Info */}
        <div className="mb-6 border-t pt-4 text-gray-700">
          <h4 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <FaUserTie /> Job Creator
          </h4>
          <p className="flex items-center gap-2">
            <FaUserTie /> <strong>Name:</strong> {job?.createdBy?.fullName}
          </p>
          <p className="flex items-center gap-2">
            <MdOutlineContactMail /> <strong>Email:</strong> {job?.createdBy?.email}
          </p>
        </div>

        {/* Apply Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => handleApplyJob(job._id)}
            disabled={isButtonDisabled}
            className={`px-8 py-3 cursor-pointer rounded-xl text-white font-semibold text-lg transition-all duration-300
              ${
                isButtonDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-mySecondary hover:bg-myPrimary"
              }`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
