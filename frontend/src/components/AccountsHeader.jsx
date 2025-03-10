import React, { useState } from 'react';
import AddTransactionModal from './Modal/AddTransactionModal';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const AccountsHeader = ( { onFilterChange } ) => {
  const [addTransaction, setAddTransaction] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const periodOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'custom', label: 'Custom Date Range' }
  ];

  const categoryOptions = [
    { value: 'flowers', label: 'flowers' },
    { value: 'vegetables', label: 'vegetables' },
    { value: 'fruits', label: 'fruits' },
    { value: 'grocery', label: 'grocery' },
    { value: 'dairy', label: 'dairy' },
    { value: 'maintenance', label: 'travel' },
    { value: 'fixed expenses', label: 'fixed expesnse' },
    { value: 'donation', label: 'donation' },
    { value: 'sales', label: 'sales' }, 
    { value: 'yatra registration', label: 'yatra registration' }, 
  ];

  const accountOptions = [
    { value: 'cash', label: 'Cash' },
    { value: 'PNB', label: 'PNB' },
    { value: 'Kotak', label: 'Kotak' },
    { value: 'SBI RP', label: 'SBI RP' },
    { value: 'SBI CP', label: 'SBI CP' },
    { value: 'Susamskar', label: 'Susamskar' },
  ];

  const costCentreOptions = [
    { value: 'Temple', label: 'Temple' },
    { value: 'New Temple', label: 'New Temple' },
    { value: 'Sankiratan', label: 'Sankiratan' },
    { value: 'Yatra', label: 'Yatra' },
    { value: 'Abhay Ashram', label: 'Abhay Ashram' },
  ]

  const handlePeriodChange = (selectedOption) => {
    if (selectedOption.value === 'weekly') {
      const end = new Date();
      const start = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000);
      setStartDate(start);
      setEndDate(end);
      onFilterChange('startDate', start.toISOString());
      onFilterChange('endDate', end.toISOString());
    } else if (selectedOption.value === 'monthly') {
      const end = new Date();
      const start = new Date(end.getFullYear(), end.getMonth() - 1, end.getDate());
      setStartDate(start);
      setEndDate(end);
      onFilterChange('startDate', start.toISOString());
      onFilterChange('endDate', end.toISOString());
    }
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start) onFilterChange('startDate', start.toISOString());
    if (end) onFilterChange('endDate', end.toISOString());
  };

  return (
    <>
      <div className='flex gap-10'>

<div className="flex flex-wrap gap-4">
        <Select
          options={periodOptions}
          onChange={handlePeriodChange}
          placeholder="Select Period"
          className="w-48"
        />
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
          placeholderText="Custom Date Range"
          className="pl-5 border border-gray-400 rounded-2xl text-gray-600 h-10"
        />
        <Select
          isMulti
          options={categoryOptions}
          onChange={(selected) => onFilterChange('categories', selected.map(option => option.value))}
          placeholder="Select Categories"
          className="w-64"
        />
        <Select
          isMulti
          options={accountOptions}
          onChange={(selected) => onFilterChange('accounts', selected.map(option => option.value))}
          placeholder="Select Accounts"
          className="w-64"
        />
        <Select
          isMulti
          options={costCentreOptions}
          onChange={(selected) => onFilterChange('costCentres', selected.map(option => option.value))}
          placeholder="Select Cost Centres"
          className="w-64"
        />
      </div>

        <button 
          className='w-1/6 h-10 rounded-2xl bg-amber-500 text-white font-bold hover:cursor-pointer 
          hover:shadow-[0px_0px_15px_5px_rgba(251,191,36,0.8)] hover:font-extrabold'
          onClick={() => setAddTransaction(true)}
        >
          Add New Transaction
        </button>
      </div>

      {addTransaction && (
        <AddTransactionModal setAddTransaction={setAddTransaction} />
      )}
    </>
  );
}

export default AccountsHeader;
