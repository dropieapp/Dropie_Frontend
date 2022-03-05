import React from 'react';

import Image01 from '../../assets/images/user-36-05.jpg';
import Image02 from '../../assets/images/user-36-06.jpg';
import Image03 from '../../assets/images/user-36-07.jpg';
import Image04 from '../../assets/images/user-36-08.jpg';
import Image05 from '../../assets/images/user-36-09.jpg';

function DashboardCard10() {

  const customers = [
    {
      id: '0',
      image: Image01,
      name: 'John Ike',
      email: 'BMW 220',
      location: '12hrs',
      spent: '24 Packages',
    },
    {
      id: '1',
      image: Image02,
      name: 'John Ike',
      email: 'BMW 220',
      location: '12hrs',
      spent: '24 Packages',
    },
    {
      id: '2',
      image: Image03,
      name: 'John Ike',
      email: 'BMW 220',
      location: '12hrs',
      spent: '24 Packages',
    },
    {
      id: '3',
      image: Image04,
      name: 'John Ike',
      email: 'BMW 220',
      location: '12hrs',
      spent: '24 Packages',
    },
    {
      id: '4',
      image: Image05,
      name: 'John Ike',
      email: 'BMW 220',
      location: '12hrs',
      spent: '24 Packages',
    },
  ];

  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Top 5 Performers agent</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="text-left">Driver Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="text-left">Vechicle</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="text-left">Total Deliveries</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="text-center">Hours</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100">
              {
                customers.map(customer => {
                  return (
                    <tr key={customer.id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-gray-800">{customer.name}</div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{customer.email}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{customer.spent}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-center">{customer.location}</div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}

export default DashboardCard10;
