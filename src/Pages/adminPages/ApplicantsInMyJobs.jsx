import React, { useEffect, useState } from "react";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "../../utils/Api";
import { FaUser, FaEnvelope,
  //  FaFilePdf,
    FaBriefcase } from "react-icons/fa";
import { toast } from "react-toastify";
// import { FaBriefcase } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";


function ApplicantsInMyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false); 

  useEffect(() => {
    const fetchJobsWithApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/get-applicant`,
          { withCredentials: true }
        );
        if (res.data.success) {
          setJobs(res.data.jobs || []);
        } else {
          toast.error("Failed to fetch jobs and applicants");
        }
      } catch (error) {
        console.error(error);
        // toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchJobsWithApplicants();
  }, [refresh]); 

  const handleStatusChange = async (applicationId, status) => {
    try {
      const res = await axios.put(
        `${APPLICATION_API_ENDPOINT}/update-status/${applicationId}`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(`Status updated to ${status}`);
        setRefresh((prev) => !prev);
      } else {
        toast.error(res.data.message || "Failed to update status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating status");
    }
  };

  if (loading) return <div className="flex justify-center items-center flex-col py-20 text-myPrimary">
  <div className="animate-spin text-4xl mb-4">
    <FaSpinner size={100}/>
  </div>
  <p className="text-lg font-medium">Loading, please wait...</p>
</div>
;
  if (!jobs.length)
    return <div className="flex h-[50vh] justify-center items-center flex-col py-10 text-gray-600">
  <div className="text-4xl mb-2 text-myPrimary animate-bounce">
    <FaBriefcase  size={100}/>
  </div>
  <p className="text-lg font-medium">You haven't posted any jobs yet.</p>
</div>
;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl flex justify-center items-center gap-2 font-bold text-myPrimary mb-6 text-center">
      <FaUser />  Applicants in My Jobs
      </h2>

      {jobs.map((job) => (
        <div
          key={job._id}
          className="border border-myPrimary rounded-xl mb-8 p-6 shadow-md"
        >
          <h3 className="text-2xl font-semibold text-myPrimary mb-3 flex items-center gap-2">
            <FaBriefcase className=" animate-bounce" /> {job.title}
          </h3>

          {!Array.isArray(job.applications) || job.applications.length === 0 ? (
            <p className="text-gray-600">No applicants for this job yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {job.applications.map((applicant) => (
                <div
                  key={applicant._id}
                  className="border-2 border-gray-200 rounded-lg p-4 shadow hover:shadow-xl transition"
                >
                  <h4 className="text-lg font-semibold text-myPrimary flex items-center gap-2">
                    <FaUser /> {applicant?.applicant?.fullName || "Unnamed"}
                  </h4>

                  <p className="text-gray-900 mb-1 flex items-center gap-2">
                    <FaEnvelope /> {applicant?.applicant?.email}
                  </p>
                {/*   <p className="text-gray-700 mb-1 flex items-center gap-2">
                    <FaEnvelope /> {applicant?.applicant?.}
                  </p>

                  {applicant?.resume && (
                    <p className="mb-1 flex items-center gap-2">
                      <FaFilePdf className="text-red-600" />
                      <a
                        href={applicant.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Resume
                      </a>
                    </p>
                  )} */}

                  <p className="mt-2">
                    <span className="font-semibold">Status:</span>{" "}
                    <span
                      className={`font-bold ${
                        applicant.status === "Accepted"
                          ? "text-green-500"
                          : applicant.status === "Rejected"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {applicant.status}
                    </span>
                  </p>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleStatusChange(applicant._id, "Accepted")}
                      className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600 curspo"
                      disabled={applicant?.status === "Accepted"}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(applicant._id, "Rejected")}
                      className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                      disabled={applicant?.status === "Rejected"}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ApplicantsInMyJobs;
