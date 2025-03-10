import React from 'react';
import { X, Calendar , User , IndianRupee , ChartBarStacked , Wallet , MapPinHouse} from 'lucide-react';
import { useNavigate } from 'react-router';
import { deleteTransaction } from '../../api/transactions';

const ViewTransactionModal = ({ setViewModal, transaction, setSelectedTransaction }) => {
  const navigate = useNavigate();

  // Function to handle transaction deletion.
  const handleDelete = async (transactionId) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await deleteTransaction(transactionId);
        alert("Transaction deleted successfully!");
        setViewModal(false);
        setSelectedTransaction(null);
        navigate('/accounts/transactions');
      } catch (error) {
        console.error("Failed to delete transaction:", error);
        alert("Failed to delete transaction.");
      }
    }
  };

  // Function to handle updating the transaction.
  const handleUpdate = () => {
    // Navigate to the update form (you may want to create an update modal instead)
    navigate(`/accounts/update/${transaction._id}`);
    setViewModal(false);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md z-50">
      {/* Modal container */}
      <div className="relative h-2/3 w-1/3 bg-white rounded-lg shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between bg-amber-500 text-white px-4 py-2 rounded-t-lg">
          <h3 className="text-2xl font-bold">Transaction Details</h3>
          <button
            onClick={() => {
              setViewModal(false);
              navigate('/accounts');
            }}
            className="hover:cursor-pointer"
          >
            <X />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex-grow overflow-auto">

          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-yellow-200 text-yellow-500 flex justify-center items-center">
              <Calendar className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">Date</span>
              <span className="text-lg text-gray-800 font-bold">
                {new Date(transaction.date).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-4">
          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 text-blue-500 flex justify-center items-center">
              <User className="h-6 w-6" />
            </div>
            <div className='flex flex-col'>
            <span className="text-sm text-gray-600">Name: </span>
            <span className="text-lg text-gray-800 font-bold">{transaction.name}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-4">
          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-amber-100 text-amber-500 flex justify-center items-center">
              <IndianRupee className="h-6 w-6" />
            </div>
            <div className='flex flex-col'>
            <span className="text-sm text-gray-600">Amount: </span>
            <span className="text-lg text-gray-800 font-bold">{transaction.amount.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-4">
          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-sky-100 text-sky-500 flex justify-center items-center">
              <ChartBarStacked className="h-6 w-6" />
            </div>
            <div className='flex flex-col'>
            <span className="text-sm text-gray-600">Category: </span>
            <span className="text-lg text-gray-800 font-bold">{transaction.category}</span>
            </div>
          </div>


          <div className="flex items-center space-x-4 mb-4">
          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-yellow-100 text-yellow-500 flex justify-center items-center">
              <Wallet className="h-6 w-6" />
            </div>
            <div className='flex flex-col'>
            <span className="text-sm text-gray-600">Account: </span>
            <span className="text-lg text-gray-800 font-bold">{transaction.account}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-4">
          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-yellow-100 text-yellow-500 flex justify-center items-center">
              <MapPinHouse className="h-6 w-6" />
            </div>
            <div className='flex flex-col'>
            <span className="text-sm text-gray-600">cost centre: </span>
            <span className="text-lg text-gray-800 font-bold">{transaction.costCentre}</span>
            </div>
          </div>
          
          </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t border-gray-200 space-x-4">
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition duration-200
            hover:cursor-pointer"
          >
            Update
          </button>
          <button
            onClick={() => handleDelete(transaction._id)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-200
            hover:cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTransactionModal;
