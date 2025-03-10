import React from 'react';
import AccountsHeader from './AccountsHeader';
import { getTransactions } from '../api/transactions'
import { useState , useEffect } from 'react';
import ViewTransactionModal from './Modal/ViewTransactionModal';
import { useLocation } from 'react-router';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewModal , setViewModal] = useState(false);
  const [selectedTransaction , setSelectedTransaction] = useState('');
  const location = useLocation();

  useEffect(() => {
    fetchTransactions();
  }, [location]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await getTransactions();
      setTransactions(data.transactions);
    } catch (err) {
      setError(err.message || 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <div>
      <AccountsHeader />
      
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost Centre</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction._id}
              className='hover:cursor-pointer hover:bg-amber-100 '
              onClick={() =>{ 
                setViewModal(true);
                setSelectedTransaction(transaction);
                }}>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(transaction.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.amount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.account}</td>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.costCentre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewModal && <ViewTransactionModal setViewModal={setViewModal} 
      transaction={selectedTransaction}
      setSelectedTransaction={setSelectedTransaction}/>}

    </div>
  );
}

export default Transactions;
