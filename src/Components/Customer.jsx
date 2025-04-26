import React, { useEffect, useState } from 'react';
import { FaEye } from "react-icons/fa";
import { database } from "../../Firebase.js";
import { ref, onValue } from "firebase/database";
import Loading from './Loading.jsx';

export default function Customer({ searchType, searchValue }) {
  const [details, setDetails] = useState([]);
  const [Password, setPassword] = useState(false);

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
          <table className="table table-bordered rounded-2xl shadow-lg hover:shadow-2xl w-full md:w-auto">
            <thead className="bg-gray-200">
              <tr>
                <th colSpan="2" className="bg-primary text-white">Customer Agreement Form</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Agreement Number</th>
                <td>{item.customer_agreement_details.agreement_number}</td>
              </tr>
              <tr>
                <th>Amplifier ID</th>
                <td>{item.customer_agreement_details.amplifier_id}</td>
              </tr>
              <tr>
                <th>CMTS ID</th>
                <td>{item.customer_agreement_details.cmts_id}</td>
              </tr>
              <tr>
                <th>Commission Model</th>
                <td>{item.customer_agreement_details.commission_model}</td>
              </tr>
              <tr>
                <th>Device Brand</th>
                <td>{item.customer_agreement_details.device_details.brand}</td>
              </tr>
              <tr>
                <th>Device Type</th>
                <td>{item.customer_agreement_details.device_details.device_type}</td>
              </tr>
              <tr>
                <th>Firmware Version</th>
                <td>{item.customer_agreement_details.device_details.firmware_version}</td>
              </tr>
              <tr>
                <th>Device Model</th>
                <td>{item.customer_agreement_details.device_details.model}</td>
              </tr>
              <tr>
                <th>Serial Number</th>
                <td>{item.customer_agreement_details.device_details.serial_number}</td>
              </tr>
              <tr>
                <th>Effective From</th>
                <td>{item.customer_agreement_details.effective_from}</td>
              </tr>
              <tr>
                <th>Idle Timeout (minutes)</th>
                <td>{item.customer_agreement_details.idle_timeout_minutes}</td>
              </tr>
              <tr>
                <th>Legacy Agreement</th>
                <td>{item.customer_agreement_details.legacy_agreement ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <th>Node ID</th>
                <td>{item.customer_agreement_details.node_id}</td>
              </tr>
              <tr>
                <th>Payment Type</th>
                <td>{item.customer_agreement_details.payment_type}</td>
              </tr>
              <tr>
                <th>Polybox Assigned</th>
                <td>{item.customer_agreement_details.polybox.assigned ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <th>Polybox ID</th>
                <td>{item.customer_agreement_details.polybox.box_id}</td>
              </tr>
              <tr>
                <th>Polybox Location</th>
                <td>{item.customer_agreement_details.polybox.location}</td>
              </tr>
              <tr>
                <th>Role</th>
                <td>{item.customer_agreement_details.role}</td>
              </tr>
              <tr>
                <th>Service Username</th>
                <td>{item.customer_agreement_details.service_username}</td>
              </tr>
              <tr>
                <th>Service Password</th>

                <td className="flex items-center">
                  {Password ? item.customer_agreement_details.service_password : '••••••••••••••••'}
                  <FaEye
                    className="pl-2 h-5 w-5 cursor-pointer"
                    onClick={() => setPassword(prev => !prev)}
                  />
                </td>
              </tr>
              <tr>
                <th>Technology</th>
                <td>{item.customer_agreement_details.technology}</td>
              </tr>
            </tbody>
          </table>
        ))
      )}
    </div>
  )
}
