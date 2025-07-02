import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { APPLICATION_API_ENDPOINT } from "../../utils/Api";
import { FaSpinner, FaUserTie } from "react-icons/fa";
import { MdEmail, MdOutlineWorkOutline } from "react-icons/md";
import { BsFillBriefcaseFill, BsBuilding, BsGeoAlt } from "react-icons/bs";
import { PiCurrencyDollarSimpleBold } from "react-icons/pi";
import AOS from "aos";
import "aos/dist/aos.css";

function MyAppliedJob() {

      useEffect(() => {
        AOS.init({ duration: 1000 });
      }, []);
    
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get-applied-jobs`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setApplications(res.data.application || []);
      } else {
        toast.error(res.data.message || "Failed to fetch applied jobs");
      }
    } catch (error) {
      toast.error("Something went wrong fetching applied jobs");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center flex-col py-20 text-myPrimary">
              <div className="animate-spin text-4xl mb-4">
                <FaSpinner size={100}/>
              </div>
              <p className="text-lg font-medium">Loading, please wait...</p>
            </div>

  if (!applications.length)
    return <div className="flex h-[50vh] justify-center items-center flex-col py-10 text-gray-600">
      <div className="text-4xl mb-2 text-myPrimary animate-bounce">
        <FaBriefcase size={100} />
      </div>
      <p className="text-lg font-medium">You have not applied for any jobs yet.</p>
     </div>

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-myPrimary flex items-center justify-center gap-2">
        <MdOutlineWorkOutline /> My Applied Jobs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map(({ _id, job, status } , index) => (
          <div
          data-aos="fade-up"
              data-aos-delay={`${index * 200}`}
            key={_id}
            className="group bg-white border-2 border-myPrimary rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-semibold text-myPrimary flex items-center gap-2">
                <BsFillBriefcaseFill className="text-lg animate-bounce" /> {job?.title || "Job Title"}
              </h3>
              <span
                className={`px-3 py-1 text-sm font-bold rounded-full ${
                  status === "Accepted"
                    ? "bg-green-100 text-green-700"
                    : status === "Rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {status}
              </span>
            </div>

            <p className="text-gray-600 mb-1 flex items-center gap-2">
              <BsBuilding /> <strong>Company:</strong> {job?.companyName || "N/A"}
            </p>
            <p className="text-gray-600 mb-1 flex items-center gap-2">
              <BsGeoAlt /> <strong>Location:</strong> {job?.location || "N/A"}
            </p>
            <p className="text-gray-600 mb-1 flex items-center gap-2">
              <PiCurrencyDollarSimpleBold /> <strong>Salary:</strong> ${job?.salary}k
            </p>

            <div className="mt-4 border-t pt-3 text-sm text-gray-700">
              <p className="font-semibold text-myPrimary mb-1 flex items-center gap-2">
                <FaUserTie /> Job Creator Info
              </p>
              <p className="flex items-center gap-2">
                <FaUserTie /> {job?.createdBy?.fullName || "N/A"}
              </p>
              <p className="flex items-center gap-2">
                <MdEmail /> {job?.createdBy?.email || "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppliedJob;
