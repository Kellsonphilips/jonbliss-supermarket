import React from 'react';

const AdminTable = ({ columns, data }) => (
  <table className="min-w-full border border-gray-200">
    <thead className="bg-gray-50">
      <tr>
        {columns.map(col => (
          <th key={col} className="px-4 py-2 border-b text-left">{col}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, idx) => (
        <tr key={idx} className="even:bg-gray-100">
          {columns.map(col => (
            <td key={col} className="px-4 py-2 border-b">{row[col]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default AdminTable; 