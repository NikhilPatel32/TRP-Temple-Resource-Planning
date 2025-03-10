import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import Select from './helper/Select';
import { updateTransaction , getTransactions , getSingleTransaction} from '../api/transactions';
import { useParams } from 'react-router';

const UpdatePage = ({ toggle }) => {
    
    const { id } = useParams();

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
  
    useEffect(() => {
        const fetchTransaction = async () => {
          try {
            const response = await getSingleTransaction(id);
            const transactionData = response.data; 
      
            console.log("Fetched Transaction Data:", transactionData);
      
            if (transactionData) {
              const formattedDate = transactionData.date 
                ? new Date(transactionData.date).toISOString().split('T')[0] 
                : "";
      
              setDate(formattedDate);
              setName(transactionData.name ?? "");  
              setAmount(transactionData.amount ?? "");
              setCategory(transactionData.category ?? "");
              setAccount(transactionData.account ?? "");
              setCostCentre(transactionData.costCentre ?? "");
            }
          } catch (error) {
            console.error("Failed to fetch transaction:", error);
          }
        };
      
        if (id) {
          fetchTransaction();
        }
      }, [id]);

    const handleSave = async() => {
      
      try {
              const updatedData = { 
                  date : date ? new Date(date) : new Date(),
                  name,
                  amount,
                  category,
                  account,
                  costCentre
                   };
              const response = await updateTransaction(id , updatedData);
              alert('transaction updated successfully!');
              navigate('/accounts/transactions');
            } catch (error) {
              alert('something went wrong! Please try again');
            }
    }
  
    function handleCancel() {
        if (window.confirm("Are you sure you want to cancel? All unsaved changes will be lost.")) {
            navigate('/accounts/transactions');
          }
    }
  
    return (
      <div className={`fixed ${(toggle) ? 'left-1/6 w-5/6' :'left-0 w-screen'} flex justify-center items-center`}>
        <div className="relative bg-gray-100 rounded-xl
        shadow-lg p-6 w-full h-full flex flex-col
        gap-5">
          <h2 className="text-2xl font-semibold text-amber-500 text-center mb-4">Update Transaction</h2>
          
         
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
}

export default UpdatePage
