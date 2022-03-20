import React from "react";

function DeliveryRequestTable() {
  const customers = [
    {
      id: "0",
      name: "Package #1",
      email: "Express",
      location: "1 Jan 2022",
      spent: "Ikeja",
      receiver: "Yaba",
      trackingId: "12223344",
      status: "Sucessful",
    },
    {
      id: "1",
      name: "Package #2",
      email: "Express",
      location: "9 Jan 2022",
      spent: "Ikeja",
      receiver: "Yaba",
      trackingId: "12223344",
      status: "Sucessful",
    },
    {
      id: "2",
      name: "Package #3",
      email: "Express",
      location: "2 Jan 2022",
      spent: "Ikeja",
      receiver: "Yaba",
      trackingId: "12223344",
      status: "Sucessful",
    },
    {
      id: "3",
      name: "Package #4",
      email: "Express",
      location: "1 Jan 2022",
      spent: "Ikeja",
      receiver: "Yaba",
      trackingId: "12223344",
      status: "Sucessful",
    },
    {
      id: "4",
      name: "Package #5",
      email: "Express",
      location: "5 Jan 2022",
      spent: "Ikeja",
      receiver: "Yaba",
      trackingId: "12223344",
      status: "Sucessful",
    },
  ];

  return (
    <div
      className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border"
      style={{ borderColor: "rgba(197, 17, 4, 0.1)" }}
    >
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="text-xs text-gray-800">Recent Delivery Request</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div class="form-check">
                    <input
                      id="parent-checkbox"
                      className="tj"
                      type="checkbox"
                    />
                  </div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="text-left text-xs">Tracking ID</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="text-left">Deliveries</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="text-left">Delivery Type</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="text-left">Delivery Date</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="text-center">Sender’s Address</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="text-center">Receiver’s Address</div>
                </th>

                <th className="p-2 whitespace-nowrap">
                  <div className="text-center">Status</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100">
              {customers.map((customer) => {
                return (
                  <tr key={customer.id}>
                    <td className="p-2 whitespace-nowrap">
                      <div class="form-check">
                      <input
                          id="parent-checkbox"
                          className="tj"
                          type="checkbox"
                        />
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-gray-800">{customer.name}</div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{customer.email}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{customer.location}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-center">{customer.spent}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-center">{customer.receiver}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-center">{customer.trackingId}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-center">{customer.status}</div>
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

export default DeliveryRequestTable;