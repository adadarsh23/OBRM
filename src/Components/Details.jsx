import React, { useEffect, useState } from 'react';
import { database } from "../../Firebase.js";
import { ref, onValue } from "firebase/database";
import Loading from './Loading.jsx';

export default function Details({ searchType, searchValue }) {
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
                  <th colSpan="2" className="bg-primary text-white">Customer Details</th>
                </tr>
              </thead>
              <tbody>
                <tr  >
                  <th>Account Number</th>
                  <td >{item.customer_details.account_number}</td>
                </tr>
                <tr>
                  <th  >Customer Name</th>
                  <td >{item.customer_details.customer_name}</td>
                </tr>
                <tr  >
                  <th  >Contact Number</th>
                  <td >{item.customer_details.contact_number}</td>
                </tr>
                <tr  >
                  <th  >Location</th>
                  <td >{item.customer_details.location}</td>
                </tr>
                <tr>
                  <th  >Customer Type</th>
                  <td >{item.customer_details.customer_type}</td>
                </tr>
                <tr  >
                  <th  >Subscriber Type</th>
                  <td >{item.customer_details.subscriber_type}</td>
                </tr>
                <tr>
                  <th  >Tier</th>
                  <td >{item.customer_details.tier}</td>
                </tr>
                <tr  >
                  <th  >Username</th>
                  <td >{item.customer_details.username}</td>
                </tr>
                <tr>
                  <th  >Customer Status</th>
                  <td >{item.customer_details.customer_status}</td>
                </tr>
                <tr  >
                  <th  >Customer Category</th>
                  <td >{item.customer_details.customer_category}</td>
                </tr>
                <tr>
                  <th  >Customer Subcategory</th>
                  <td >{item.customer_details.customer_subcategory}</td>
                </tr>
                <tr  >
                  <th  >Customer Subtype</th>
                  <td >{item.customer_details.customer_subtype}</td>
                </tr>
                <tr>
                  <th  >Customer Subtype Code</th>
                  <td >{item.customer_details.customer_subtype_code}</td>
                </tr>
                <tr>
                  <th  >Aadhaar Address</th>
                  <td >{item.customer_details?.addresses?.aadhaar_address || "N/A"}</td>
                </tr>
                <tr  >
                  <th  >Billing Address</th>
                  <td >{item.customer_details?.addresses?.billing_address || "N/A"}</td>
                </tr>
                <tr>
                  <th  >Installation Address</th>
                  <td >{item.customer_details?.addresses?.installation_address || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  )
}
