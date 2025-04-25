import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { FaDatabase } from "react-icons/fa6";
import { SlChemistry } from "react-icons/sl";
import { FcExpired } from "react-icons/fc";
import { BiSolidCard } from "react-icons/bi";
import { MdBroadcastOnHome } from "react-icons/md";
import { database } from "../../Firebase.js";
import { ref, onValue } from "firebase/database";
import Loading from "./Loading.jsx";

export default function TopCard({ searchType, searchValue }) {
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

  // Helper to normalize phone/MAC for comparison
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
    <div className="p-6">
      <Card className="mt-15 max-w-7xl mx-auto p-3 rounded-3xl shadow-2xl">
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {filteredDetails.length === 0 ? (
            <div className="col-span-full flex justify-center items-center h-48">
              <Loading />
            </div>
          ) : (
            filteredDetails.slice(0, 1).map((item) => (
              <React.Fragment key={item.customer_id || Math.random()}>
                {/* Data Usage */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{
                    scale: 1.05,
                    rotate: 2,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl flex flex-col items-center justify-center text-center"
                >
                  <FaDatabase className="w-12 h-12 text-blue-500" />
                  <h6 className="text-lg font-semibold ">
                    {item?.broadband_usage?.monthly_summary?.total_usage_gb ?? "N/A"} GB /{" "}
                    {item?.broadband_details?.data_usage ?? "N/A"}
                  </h6>
                  <p className="text-gray-500 text-sm ">Data Usage</p>
                </motion.div>

                {/* FUP */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{
                    scale: 1.05,
                    rotate: 2,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white p-1 rounded-2xl shadow-lg hover:shadow-2xl flex flex-col items-center justify-center text-center"
                >
                  <SlChemistry className="w-12 h-12 text-red-500" />
                  <h6 className="text-lg font-semibold ">
                    {item?.broadband_details?.fup_policy ?? "N/A"}
                  </h6>
                  <p className="text-gray-500 text-sm">FUP</p>
                </motion.div>

                {/* Expiry Date */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{
                    scale: 1.05,
                    rotate: 2,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl flex flex-col items-center justify-center text-center"
                >
                  <FcExpired className="w-12 h-12 " />
                  <h6 className="text-lg font-semibold ">
                    {item?.broadband_details?.expiry_date ?? "N/A"}
                  </h6>
                  <p className="text-gray-500 text-sm ">Expiry Date</p>
                </motion.div>

                {/* Mac ID */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{
                    scale: 1.05,
                    rotate: 2,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl flex flex-col items-center justify-center text-center"
                >
                  <BiSolidCard className="w-12 h-12 text-cyan-500" />
                  <h6 className="text-lg font-semibold ">
                    {item?.broadband_details?.wifi_device?.mac_id ?? "N/A"}
                  </h6>
                  <p className="text-gray-500 text-sm ">Mac Id</p>
                </motion.div>

                {/* CMTS ID */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{
                    scale: 1.05,
                    rotate: 2,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl flex flex-col items-center justify-center text-center"
                >
                  <MdBroadcastOnHome className="w-12 h-12 text-fuchsia-500" />
                  <h6 className="text-lg font-semibold ">
                    {item?.broadband_details?.hardware?.cmts ?? "N/A"}
                  </h6>
                  <p className="text-gray-500 text-sm ">CMTS ID</p>
                </motion.div>
              </React.Fragment>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}