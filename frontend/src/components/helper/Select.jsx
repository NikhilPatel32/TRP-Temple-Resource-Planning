import React from 'react'

const Select = ({ array , value , onChange , placeholder}) => {
  return (
    <div className="relative">
  <select
     value={value}
     onChange={(e) => onChange(e.target.value)}
    className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
  >
 <option value="" disabled>
  {placeholder}
</option>
    {array.map((option, index) => (
      <option key={index} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 text-gray-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </div>
</div>

  )
}

export default Select
