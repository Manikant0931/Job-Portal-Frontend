import axios from "axios";
import { useEffect, useState } from "react";
import JobCard from "../JobCard";

import { setDoc, collection, doc } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setloading] = useState(true);
  const [savedJobs, setSavedJobs] = useState([]);
  useEffect(() => {
    axios
      .get("https://jsonfakery.com/jobs")
      .then((res) => {
        setJobs(res.data || []);
        setloading(false);
      })
      .catch((error) => console.error(error));
  }, []);
  console.log(jobs);

  const saveJob = async (job) => {
    await setDoc(doc(db, "favorites", job.id), job);

    alert("Job added to favorites ⭐");
    // track saved jobs
    setSavedJobs([...savedJobs, job.id]);
  };
 

  return (
    <div className="container mt-4">
      <h2 className="text-danger text-center mb-4">All Jobs</h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
          <p>Loading Jobs...</p>
        </div>
      ) : (
        <div className="row">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              buttonText={
                savedJobs.includes(job.id) ? "Saved ✅" : "⭐ Favorite"
              }
              disabled={savedJobs.includes(job.id)}
              onAction={saveJob}
            />
          ))}
        </div>
      )}
    </div>
  );
}
