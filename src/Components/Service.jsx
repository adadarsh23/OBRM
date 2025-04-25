import React, { useEffect, useState } from 'react';
import { FaEye } from "react-icons/fa";
import { database } from "../../Firebase.js";
import { ref, onValue } from "firebase/database";
import Loading from './Loading.jsx';

export default function Service({ searchType, searchValue }) {
  const [details, setDetails] = useState([]);
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

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
    if (searchType === "None" || !searchValue) return true; // <-- Add this line

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
    <div className="p-6 shadow-2xl max-w-7xl mx-auto">
      {filteredDetails.length === 0 ? (
        <div><Loading/></div>
      ) : (
        filteredDetails.slice(0, 1).map((item, idx) => {
          // Get phone and email from item, fallback to empty string if not present
          const phoneNumber = item?.customer_details?.contact_number || "";
          const email = item?.customer_details?.email || "";

          // Masking logic
          const displayPhone = showPhone
            ? phoneNumber
            : phoneNumber
              ? "*".repeat(phoneNumber.length - 2) + phoneNumber.slice(-2)
              : "";

          const displayEmail = showEmail
            ? email
            : email
              ? email.replace(
                /(.{2}).+(@.+)/,
                (_, a, b) => a + "*".repeat(email.indexOf("@") - 2) + b
              )
              : "";

          return (
            <table key={idx} className="table table-bordered rounded-2xl shadow-lg hover:shadow-2xl w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th colSpan="2" className="bg-primary text-white">Service Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='text'>Service Status</td>
                  <td>{item?.account_information?.account_status ?? "N/A"}</td>
                </tr>
                <tr>
                  <td>Provision Status</td>
                  <td>{item?.account_information?.provision_status ?? "N/A"}</td>
                </tr>
                <tr>
                  <td>Customer Profile</td>
                  <td>{item?.customer_details?.tier ?? "N/A"}</td>
                </tr>
                <tr>
                  <td>Payment</td>
                  <td>{item?.account_information?.payment_type ?? "N/A"}</td>
                </tr>
                <tr>
                  <td>Mobile Number</td>
                  <td className="flex items-center">
                    {displayPhone}
                    {phoneNumber && (
                      <FaEye className='pl-1 h-5 w-5 cursor-pointer' onClick={() => setShowPhone((v) => !v)} />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Email id</td>
                  <td className="flex items-center">
                    {displayEmail}
                    {email && (
                      <FaEye className='pl-1 h-5 w-5 cursor-pointer' onClick={() => setShowEmail((v) => !v)} />
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Technology Used</td>
                  <td className="flex items-center">
                    {item?.network_parameters?.technology ?? "N/A"}
                  </td>
                </tr>
                <tr>
                  <td>Serial Number</td>
                  <td>{item?.broadband_details?.hardware?.onu_serial_number ?? "N/A"}</td>
                </tr>
                <tr>
                  <td>Subscriber Type</td>
                  <td>{item?.customer_details?.subscriber_type ?? "N/A"}</td>
                </tr>
                <tr>
                  <td>Last Payment Date</td>
                  <td>{item?.account_information?.last_payment_date ?? "N/A"}</td>
                </tr>
              </tbody>
            </table>
          );
        })
      )}
    </div>
  );
}