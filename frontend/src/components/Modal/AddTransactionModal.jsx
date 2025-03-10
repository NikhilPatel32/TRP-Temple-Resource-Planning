import React, { useState } from "react";
import Select from "../helper/Select";
import { addTransaction } from "../../api/addTransaction";
import { useNavigate } from "react-router";

const AddTransactionModal = ({ setAddTransaction }) => {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [account, setAccount] = useState("");
  const [costCentre, setCostCentre] = useState("");
  const navigate = useNavigate();

  const accountOptions = [
    { value: "Cash", label: "Cash" },
    { value: "PNB", label: "PNB" },
    { value: "Kotak", label: "Kotak" },
    { value: "SBI RP", label: "SBI RP" },
    { value: "SBI CP", label: "SBI CP" },
    { value: "Susamskar", label: "Susamskar" },
  ];

  const costCentreOptions = [
    { value: "Temple", label: "Temple" },
    { value: "New Temple", label: "New Temple" },
    { value: "Sankirtan", label: "Sankirtan" },
    { value: "Yatra", label: "Yatra" },
    { value: "Abhay Ashram", label: "Abhay Ashram" },
  ];

  const handleSave = async() => {

    if (!name || !amount || !category || !account || !costCentre) {
        alert("All fields are required!");
        return;
      }
    
    try {
            const transactionData = { 
                date : date ? new Date(date) : new Date(),
                name,
                amount,
                category,
                account,
                costCentre
                 };
            const response = await addTransaction(transactionData);
            alert('transaction added successfully!');
            navigate('/accounts/transactions');
          } catch (error) {
            alert('something went wrong! Please try again');
          }

    setAddTransaction(false);
  }

  function handleCancel() {
    setAddTransaction(false);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 backdrop-blur-md">
      <div className="relative bg-white rounded-xl border border-amber-300
      shadow-lg p-6 w-1/3 h-auto flex flex-col
      gap-5">
        <h2 className="text-2xl font-semibold text-amber-500 text-center mb-4">Add New Transaction</h2>
        
       
          <input
            type="date"
            value={date}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setName(e.target.value)}
          />

     
          <Select 
          array={accountOptions} 
          value={account} 
          onChange={setAccount} 
          placeholder="Choose Account"
          />

          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setAmount(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter Category"
            value={category}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setCategory(e.target.value)}
          />

         
        <Select array={costCentreOptions}
         value={costCentre}
         onChange={setCostCentre}
         placeholder={"Choose cost centre"}/>

        <div className="flex justify-evenly gap-4 mt-6">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-all
            hover:cursor-pointer"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-amber-400 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-all
            hover:cursor-pointer"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
        </div>
      </div>
  );
};

export default AddTransactionModal;
