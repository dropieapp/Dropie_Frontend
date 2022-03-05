import React from "react";

function DashboardCard100() {
  const customers = [
    {
      id: "0",
      name: "Alex Shatov",
      vehicle: "Boxer Bike",
      hours: "12hrs",
      deliveries: "21 Packages",
    },
    {
      id: "1",
      name: "Hommie Harbach",
      vehicle: "Toyota Corolla",
      hours: "12hrs",
      deliveries: "24 Packages",
    },
    {
      id: "2",
      name: "Mirko Fisuk",
      vehicle: "Toyota Camry",
      hours: "10hrs",
      deliveries: "2 Packages",
    },
    {
      id: "3",
      name: "Olga Semklo",
      vehicle: "Honda Civic",
      hours: "6hrs",
      deliveries: "15 Packages",
    },
    {
      id: "4",
      name: "Burak Long",
      vehicle: "Suzuki",
      hours: "7hrs",
      deliveries: "10 Packages",
    },
  ];

  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">
          Bottom 5 Performers agent
        </h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Driver Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Vehicle</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">
                    Total Deliveries
                  </div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Hours</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100">
              {customers.map((customer) => {
                return (
                  <tr key={customer.id}>
                    <td className="px-2 py-4 whitespace-nowrap">
                      <div className="flex items-center ">
                        <div className="font-medium text-gray-800">
                          {customer.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap">
                      <div className="text-left">{customer.vehicle}</div>
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap">
                      <div className="text-left font-medium text-red-500">
                        {customer.deliveries}
                      </div>
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap">
                      <div className="text-md text-left">{customer.hours}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard100;
