import React, { useEffect, useState } from 'react';
import { database } from "../../Firebase.js";
import { ref, onValue } from "firebase/database";
import Loading from './Loading.jsx';
import { FaDownload } from "react-icons/fa";

export default function ViewDocument({ searchType, searchValue }) {
  const [isOpen, setIsOpen] = useState(false);
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
      return normalize(item?.broadband_details?.wifi_device?.mac_id)
        .includes(normalize(searchValue));
    }

    return true;
  });

  const toggleAccordion = () => setIsOpen(!isOpen);

  return (
    <div className="max-w-full mx-auto mt-10 p-4 sm:p-6 border rounded-2xl shadow-2xl transition-all duration-300 bg-white">
      {filteredDetails.length === 0 ? (
        <div className="flex justify-center items-center h-48">
          <Loading />
        </div>
      ) : (
        filteredDetails.slice(0, 1).map((item, idx) => {
          const pdf = item?.account_information?.profile_pdf?.pdf_link;

          return (
            <React.Fragment key={idx}>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-1 mb-6 text-gray-800 text-sm sm:text-base">
                <p><strong>Account Number:</strong> {item?.customer_details?.account_number || "N/A"}</p>
                <p><strong>POA:</strong> {item?.customer_documents?.address_proof?.document_type || "N/A"}</p>
                <p><strong>POI:</strong> {item?.customer_documents?.identity_proof?.document_type || "N/A"}</p>
                <p><strong>CAF Number:</strong> {item?.customer_agreement_details?.agreement_number || "N/A"}</p>
              </div>

              <div className="flex flex-row justify-start items-center">
                <button
                  onClick={toggleAccordion}
                  className="flex items-center justify-center gap-2 button"
                >
                  {isOpen ? 'Hide Document' : 'View Document'}
                  <svg
                    className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {pdf && (
                  <a
                    href={pdf}
                    download="User_Document.pdf"
                    className="ml-6 text-blue-600 hover:text-blue-800 transition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaDownload size={20} />
                  </a>
                )}
              </div>

              {isOpen && pdf && (
                <div className="mt-6 border-t pt-4">
                  <div className="w-full h-[70vh]">
                    <iframe
                      src={pdf}
                      type="application/pdf"
                      className="w-full h-full rounded-lg border"
                    />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })
      )}
    </div>
  );
}
