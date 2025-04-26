import React, { useEffect, useState } from 'react';
import { database } from "../../Firebase.js";
import { ref, onValue } from "firebase/database";
import Loading from './Loading.jsx';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

export default function Data({ searchType, searchValue }) {
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
        filteredDetails.slice(0, 1).map((item, idx) => (
          <div key={idx} className="p-4">
            <h2 className="text-xl font-bold mb-4">Broadband Daily Usage</h2>

            {/* Check if broadband_usage exists to avoid error */}
            {item.broadband_usage && item.broadband_usage.daily_usage ? (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={item.broadband_usage.daily_usage}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis label={{ value: 'GB', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="download_gb" stroke="#8884d8" name="Download (GB)" />
                  <Line type="monotone" dataKey="upload_gb" stroke="#82ca9d" name="Upload (GB)" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p>No broadband usage data available.</p>
            )}

            {/* Monthly Summary */}
            {item.broadband_usage && item.broadband_usage.monthly_summary && (
              <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow">
                <h3 className="text-lg font-semibold">
                  Monthly Summary - {item.broadband_usage.monthly_summary.month}
                </h3>
                <p>Total Download: {item.broadband_usage.monthly_summary.total_download_gb} GB</p>
                <p>Total Upload: {item.broadband_usage.monthly_summary.total_upload_gb} GB</p>
                <p>Total Usage: {item.broadband_usage.monthly_summary.total_usage_gb} GB</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}