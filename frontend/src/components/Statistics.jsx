import React, { useEffect, useState } from "react";
import { getStatistics } from "../api/transactions";
import { useLocation } from "react-router";

const Statistics = () => {
  const location = useLocation();
  const [stats, setStats] = useState(null);

  const getStats = async () => {
    try {
      const response = await getStatistics();
      console.log("Fetched Statistics:", response);
      setStats(response); 
    } catch (error) {
      console.log("Failed to get stats", error.message);
    }
  };

  useEffect(() => {
    getStats();
  }, [location]);

  if (!stats) return <div>Loading statistics...</div>;

  return (
    <div className="flex flex-col p-4">
      {/* Total Statistics */}
      <div className="mb-4 p-4 bg-amber-400 rounded-lg shadow-md">
        <h2 className="text-xl text-white font-bold mb-2">Overall Statistics</h2>
        <p className="text-white">Total Transactions: {stats.totalTransactions}</p>
        <p className="text-white">Total Amount: ₹{stats.totalAmount}</p>
      </div>

      <div className="flex">
        {/* Account-wise Statistics */}
        <div className="w-1/2 p-4 mr-3 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-bold mb-2">Account Statistics</h2>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-amber-400 text-white">
                <th className="border border-gray-300 px-4 py-2">Account</th>
                <th className="border border-gray-300 px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(stats.accountStats).map(([account, amount]) => (
                <tr key={account} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{account}</td>
                  <td className="border border-gray-300 px-4 py-2">₹{amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Category-wise Statistics */}
        <div className="w-1/2 p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-bold mb-2">Category Statistics</h2>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-amber-400 text-white">
                <th className="border border-gray-300 px-4 py-2">Category</th>
                <th className="border border-gray-300 px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(stats.categoryStats).map(([category, amount]) => (
                <tr key={category} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{category}</td>
                  <td className="border border-gray-300 px-4 py-2">₹{amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>

{/* costCentre-wise statistics */}
<div className="flex">
 <div className="mt-6 w-1/2 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-lg font-bold mb-2">cost-center Statistics</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-amber-400 text-white">
              <th className="border border-gray-300 px-4 py-2">cost-centre</th>
              <th className="border border-gray-300 px-4 py-2">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(stats.costCentreStats).map(([costCentre, amount]) => (
              <tr key={costCentre} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{costCentre}</td>
                <td className="border border-gray-300 px-4 py-2">₹{amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Monthly Statistics */}
      <div className="mt-6 p-4 w-1/2 bg-white shadow-md rounded-lg">
        <h2 className="text-lg font-bold mb-2">Monthly Statistics</h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-amber-400 text-white">
              <th className="border border-gray-300 px-4 py-2">Month</th>
              <th className="border border-gray-300 px-4 py-2">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(stats.monthlyStats).map(([month, amount]) => (
              <tr key={month} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{month}</td>
                <td className="border border-gray-300 px-4 py-2">₹{amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>

    </div>
  );
};

export default Statistics;
