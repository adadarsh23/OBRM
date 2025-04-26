import React, { useEffect, useState } from 'react';
import { database } from "../../Firebase.js";
import { ref, onValue } from "firebase/database";
import Loading from './Loading.jsx';

export default function Bill({ searchType, searchValue }) {
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
      return item?.customer_details?.account_number
        ?.toLowerCase()
        .includes(searchValue.toLowerCase());
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
    <div className="max-w-full mx-auto mt-10 p-4 sm:p-6 border rounded-2xl shadow-2xl transition-all duration-300 bg-white">
      {filteredDetails.length === 0 ? (
        <div className="flex justify-center items-center h-48">
          <Loading />
        </div>
      ) : (
        filteredDetails.slice(0, 1).map((item, idx) => (
          <div key={idx} className="row g-4">
            {/* Table 1 */}
            <div className="col-12 col-md-4">
              <table className="table table-bordered table-striped rounded-2xl shadow-lg hover:shadow-2xl">
                <thead className="bg-gray-200">
                  <tr>
                    <th colSpan="2" className="bg-primary text-white">Bill Info</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-sm md:text-base">Service Type</td>
                    <td>{item?.broadband_details?.service_status ?? "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="text-sm md:text-base">Payment Type</td>
                    <td>{item?.account_information?.payment_type ?? "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="text-sm md:text-base">Last Payment Date</td>
                    <td>{item?.account_information?.last_payment_date ?? "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="text-sm md:text-base">Current Bill Cycle</td>
                    <td>{item?.account_information?.billing_cycle ?? "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="text-sm md:text-base">Expiry Date</td>
                    <td>{item?.broadband_details?.expiry_date ?? "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Table 2 */}
            <div className="col-12 col-md-4">
              <table className="table table-bordered table-striped rounded-2xl shadow-lg hover:shadow-2xl">
                <thead className="bg-gray-200">
                  <tr>
                    <th colSpan="2" className="bg-primary text-white">Billed</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-sm md:text-base">Payment Status</td>
                    <td>{item?.billing_section?.payment_status ?? "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="text-sm md:text-base">Invoice Date</td>
                    <td>{item?.billing_section?.invoice_date ?? "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="text-sm md:text-base">Payment Mode</td>
                    <td>{item?.billing_section?.payment_mode ?? "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="text-sm md:text-base">Amount to Pay</td>
                    <td>{item?.billing_section?.billing_amount ?? "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="text-sm md:text-base">Invoice ID</td>
                    <td>{item?.billing_section?.invoice_id ?? "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="text-sm md:text-base">Payment Reference</td>
                    <td>{item?.billing_section?.payment_reference ?? "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Table 3 */}
            <div className="col-12 col-md-4">
              <table className="table table-bordered table-striped rounded-2xl shadow-lg hover:shadow-2xl">
                <thead className="bg-gray-200">
                  <tr>
                    <th colSpan="2" className="bg-primary text-white">Payment History(last Month)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-sm md:text-base">Payment Amount</td>
                    <td>{item?.billing_section?.payment_history?.[0]?.payment_amount ?? "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="text-sm md:text-base">Payment Date</td>
                    <td>{item?.billing_section?.payment_history?.[0]?.payment_date ?? "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="text-sm md:text-base">Payment Mode</td>
                    <td>{item?.billing_section?.payment_history?.[0]?.payment_mode ?? "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="text-sm md:text-base">Payment Reference</td>
                    <td>{item?.billing_section?.payment_history?.[0]?.payment_reference ?? "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="text-sm md:text-base">Payment Status</td>
                    <td>{item?.billing_section?.payment_history?.[0]?.payment_status ?? "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
