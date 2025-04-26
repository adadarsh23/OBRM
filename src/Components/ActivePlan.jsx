import React, { useEffect, useState } from 'react';
import { database } from "../../Firebase.js";
import { ref, onValue } from "firebase/database";
import Loading from './Loading.jsx';

export default function ActivePlan({ searchType, searchValue }) {
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
          <div key={idx} className="overflow-x-auto">
            <table className="table table-bordered rounded-2xl shadow-lg hover:shadow-2xl w-full md:w-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th colSpan="8" className="bg-primary text-white ">
                    Active Plan Details (Tax not included)
                  </th>
                </tr>
                <tr className="table-secondary">
                  <th className="p-2 md:p-3">Plan Name</th>
                  <th className="p-2 md:p-3">Plan Id</th>
                  <th className="p-2 md:p-3">Status</th>
                  <th className="p-2 md:p-3">Amount</th>
                  <th className="p-2 md:p-3">DL Speed</th>
                  <th className="p-2 md:p-3">UL Speed</th>
                  <th className="p-2 md:p-3">Starting Date</th>
                  <th className="p-2 md:p-3">Ending Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 md:p-3">{item?.broadband_details?.plan_name ?? "N/A"}</td>
                  <td className="p-2 md:p-3">{item?.broadband_details?.active_plan?.plan_id ?? "N/A"}</td>
                  <td className="p-2 md:p-3">{item?.broadband_details?.service_status ?? "N/A"}</td>
                  <td className="p-2 md:p-3">{item?.broadband_details?.active_plan?.monthly_charge ?? "N/A"}</td>
                  <td className="p-2 md:p-3">{item?.broadband_details?.active_plan?.dl_speed ?? item?.broadband_details?.active_plan?.speed ?? "N/A"}</td>
                  <td className="p-2 md:p-3">{item?.broadband_details?.active_plan?.ul_speed ?? item?.broadband_details?.active_plan?.speed ?? "N/A"}</td>
                  <td className="p-2 md:p-3">{item?.broadband_details?.active_plan?.start_date ?? item?.account_information?.last_payment_date ?? "N/A"}</td>
                  <td className="p-2 md:p-3">{item?.broadband_details?.active_plan?.end_date ?? item?.broadband_details?.expiry_date ?? "N/A"}</td>
                </tr>
                <tr className="table-secondary">
                  <th className="p-2 md:p-4">Offer Plan Name</th>
                  <td colSpan="7" className="p-2 md:p-4">
                    {item?.broadband_details?.offer_plan?.offer_name ?? "N/A"}
                    <span className="text-gray-600 text-sm">
                      ({item?.broadband_details?.offer_plan?.description ?? "N/A"}) Go to Official Website <a href=''>OBRM-&gt; </a>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
}