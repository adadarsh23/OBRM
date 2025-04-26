import React, { useEffect, useState } from 'react';
import { database } from "../../Firebase.js";
import { ref, onValue } from "firebase/database";
import Loading from './Loading.jsx';

export default function ActCard({ searchType, searchValue }) {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const dbRef = ref(database, "card");
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (Array.isArray(data)) {
        setDetails(data.filter(Boolean));
      } else if (data && typeof data === "object") {
        setDetails(Object.values(data));
      } else {
        setDetails([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const normalize = (str) =>
    (str || "")
      .toString()
      .replace(/[\s:-]/g, "")
      .toLowerCase();

  const filteredDetails = details.filter((item) => {
    if (searchType === "None" || !searchValue) return true;

    if (searchType === "Account No.") {
      return (
        item?.customer_details?.account_number
          ?.toLowerCase()
          .includes(searchValue.toLowerCase())
      );
    }

    if (searchType === "Phone No.") {
      const main = normalize(item?.customer_details?.contact_number);
      const servicePhones = (item?.customer_service?.phone_numbers || [])
        .map(normalize)
        .join(" ");
      return (
        main.includes(normalize(searchValue)) ||
        servicePhones.includes(normalize(searchValue))
      );
    }

    if (searchType === "Mac Id") {
      return normalize(item?.broadband_details?.wifi_device?.mac_id).includes(
        normalize(searchValue)
      );
    }

    return true;
  });

  return (
    <div className="p-3 md:p-6 shadow-2xl max-w-full md:max-w-7xl mx-auto">
      {filteredDetails.length === 0 ? (
        <div className="flex justify-center items-center h-48">
          <Loading />
        </div>
      ) : (
        filteredDetails.slice(0, 1).map((item, idx) => {
          const networkStatus = item?.network_status || {}; // Ensure this is always an object

          // Ensure networkStatus.status is available
          const status = networkStatus?.status || "Unknown";
          const lastUpdated = networkStatus?.last_updated
            ? new Date(networkStatus.last_updated).toLocaleString()
            : "Not available";
          const issues = networkStatus?.issues || [];

          return (
            <div
              key={idx}
              className={`w-full bg-white shadow-lg rounded-lg overflow-hidden ${
                status === 'Operational' ? 'border-green-500' : 'border-red-500'
              }`}
            >
              <div className="p-5">
                <h2 className="text-2xl font-bold text-gray-800">Network Status</h2>
                <div className="mt-3">
                  <p
                    className={`text-lg ${
                      status === 'Operational' ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    Status: {status}
                  </p>
                </div>

                <div className="mt-5">
                  <p className="text-gray-600">Last updated: {lastUpdated}</p>
                </div>

                <div className="mt-5">
                  <h3 className="font-semibold text-gray-700">Current Issues:</h3>
                  {issues.length === 0 ? (
                    <p className="text-gray-500">No issues reported.</p>
                  ) : (
                    issues.map((issue) => (
                      <div
                        key={issue.issue_id}
                        className={`mt-2 p-3 rounded-md ${
                          issue.status === 'In Progress' ? 'bg-yellow-100' : 'bg-green-100'
                        }`}
                      >
                        <p className="font-medium text-gray-800">Issue: {issue.description}</p>
                        <p className="text-gray-500">
                          Reported on: {new Date(issue.reported_date).toLocaleDateString()}
                        </p>
                        <p
                          className={`text-sm ${
                            issue.status === 'In Progress' ? 'text-yellow-600' : 'text-green-600'
                          }`}
                        >
                          Status: {issue.status}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
