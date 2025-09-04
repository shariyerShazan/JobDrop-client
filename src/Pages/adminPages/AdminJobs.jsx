import React, { useEffect, useState } from "react";
import axios from "axios";
import { JOB_API_ENDPOINT } from "../../utils/Api";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaTrash,
  FaEdit,
  FaSpinner,
} from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import { Link } from "react-router";
import { FaBriefcase } from "react-icons/fa";


function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${JOB_API_ENDPOINT}/get-admin-job`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setJobs(res.data.job);
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load admin jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
  
      if (result.isConfirmed) {
        const res = await axios.delete(`${JOB_API_ENDPOINT}/delete-job-admin/${jobId}`, {
          withCredentials: true,
        });
  
        if (res.data.success) {
          setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
          toast.success(res.data.message);
          // await Swal.fire("Deleted!", "Your job has been deleted.", "success");
        } else {
          toast.error(res.data.message || "Something went wrong");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete the job");
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <div className="min-h-screen py-10 px-4 ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-myPrimary flex justify-center items-center gap-2">
          <MdWork className="text-4xl animate-bounce" /> My Posted Jobs
        </h2>

        {loading ? (
          <div className="flex justify-center items-center flex-col py-20 text-myPrimary">
            <div className="animate-spin text-4xl mb-4">
              <FaSpinner size={100}/>
            </div>
            <p className="text-lg font-medium">Loading, please wait...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="flex h-[50vh] justify-center items-center flex-col py-10 text-gray-600">
  <div className="text-4xl mb-2 text-myPrimary animate-bounce">
    <FaBriefcase size={100} />
  </div>
  <p className="text-lg font-medium">No job Found</p>
</div>

        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job , index) => (
              <div 
                key={job._id}
                data-aos="fade-up"
                data-aos-delay={`${index * 300}`}
                className="bg-white border border-gray-200 shadow-md hover:shadow-2xl rounded-xl p-6 flex flex-col justify-between"
              >
                <h3 className="text-xl font-bold text-myPrimary mb-2">
                  {job.title}
                </h3>

                <div className="text-gray-700 text-sm space-y-1 mb-2">
                  <p>
                    <span className="font-bold">Type:</span> {job.jobType}
                  </p>
                  {/* <p>
                    <span className="font-bold">description:</span> {job.description}
                  </p> */}
                  <p>
                    <span className="font-bold">Location:</span> {job.location}
                  </p>
                  <p>
                    <span className="font-bold">Experience:</span>{" "}
                    {job.experienceLevel}
                  </p>
                  <p>
                    <span className="font-bold">Salary:</span> ${job.salary}k
                  </p>
                  <p>
                    <span className="font-bold">Company:</span>{" "}
                    {job.companyName}
                  </p>
                  <div>
  <span className="font-bold">Requirements:</span>
  <ul className="list-disc ml-5 text-gray-700 space-y-1">
    {job.requirements?.slice(0,3).map((requirement, idx) => (
      <li key={idx}>
        <span className=" px-2 py-1 rounded">
          {requirement}
        </span>
      </li>
    ))}
  </ul>
</div>



                  <p>
                    <span className="font-bold">Posted on:</span>{" "}
                    {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="mt-4 flex gap-2">
                  <Link to={`update-job/${job._id}`}
                    className="bg-myPrimary/90 cursor-pointer hover:bg-myPrimary text-white px-4 py-1 rounded flex items-center gap-1"
                  >
                    <FaEdit /> Update
                  </Link>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="bg-red-400 cursor-pointer hover:bg-red-500 text-white px-4 py-1 rounded flex items-center gap-1"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminJobs;
