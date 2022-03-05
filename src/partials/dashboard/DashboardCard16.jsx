import React from "react";

import Image01 from "../../assets/images/user-36-05.jpg";
import Image02 from "../../assets/images/user-36-06.jpg";
import Image03 from "../../assets/images/user-36-07.jpg";
import Image04 from "../../assets/images/user-36-08.jpg";
import Image05 from "../../assets/images/user-36-09.jpg";

function DashboardCard10() {
  const customers = [
    {
      id: "0",
      image: Image01,
      name: "Agent #1",
      email: "Rivers State",
      location: "BMW 112",
      spent: "09032411719",
      status: "Active"
    },
    {
      id: "1",
      image: Image02,
      name: "Agent #2",
      email: "Rivers State",
      location: "BMW 112",
      spent: "09032411719",
      status: "Active"
    },
    {
      id: "2",
      image: Image03,
      name: "Agent #3",
      email: "Rivers State",
      location: "BMW 112",
      spent: "09032411719",
      status: "Active"
    },
    {
      id: "3",
      image: Image04,
      name: "Agent #4",
      email: "Frist Stack",
      location: "BMW 112",
      spent: "09032411719",
      status: "Active"
    },
    {
      id: "4",
      image: Image05,
      name: "Agent #5",
      email: "Frist Stack",
      location: "BMW 112",
      spent: "09032411719",
      status: "Active"
    },
  ];

  return (
    <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Agent List</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="text-left"></div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="text-left">Agent Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="text-left">Current Location</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="text-left">Assigned Vehicle</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="text-center">Agent Rating</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="text-center">Agent Phone Number</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="text-center">Status</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="text-center">...</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100">
              {customers.map((customer) => {
                return (
                  <tr key={customer.id}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-gray-800"></div>
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
                      <div className="text-left flex">
                        {customer.location}&nbsp;
                        <svg
                          width="30"
                          height="20"
                          viewBox="0 0 30 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M28.9335 9.76357H27.0347C26.792 10.7468 25.9045 11.4755 24.8465 11.4755C23.7885 11.4755 22.9007 10.7468 22.6579 9.76357H7.31698C7.07422 10.7468 6.18634 11.4755 5.12836 11.4755C4.07038 11.4755 3.18249 10.7468 2.93973 9.76357H1.06653C0.880474 9.76357 0.712474 9.68839 0.590674 9.56659C0.468874 9.44479 0.393694 9.27679 0.393694 9.09115C0.393694 8.80555 0.571355 8.56153 0.822515 8.46409C0.814955 8.42083 0.811174 8.37631 0.811174 8.33095V3.88819C0.811174 3.45391 1.16523 3.11707 1.58019 3.11707C1.63101 3.11707 1.68267 3.12211 1.73475 3.13261L4.7869 0.886874C5.10694 0.651254 5.49418 0.524414 5.8915 0.524414H16.8716C17.3189 0.524414 17.7515 0.685274 18.09 0.978014L21.1333 3.60595C21.3979 3.83443 21.7213 3.98437 22.0665 4.03771L27.2821 4.84831C28.0843 4.97305 28.7135 5.60137 28.8395 6.40315L29.1217 8.20369C29.1314 8.26501 29.1608 8.31877 29.2032 8.35909C29.2456 8.39983 29.301 8.42629 29.3624 8.43301C29.501 8.44813 29.606 8.56532 29.606 8.70476V8.83622C29.606 8.87066 29.5997 8.90383 29.5875 8.93449C29.5997 8.98489 29.606 9.03739 29.606 9.09115C29.606 9.46243 29.3048 9.76357 28.9335 9.76357ZM2.49411 7.4183L2.37484 6.44935C2.36728 6.38845 2.32947 6.33511 2.27445 6.30697L1.80825 6.07093C1.68519 6.00877 1.53945 6.09823 1.53945 6.23599V7.44097C1.53945 7.54303 1.62219 7.62578 1.72467 7.62578H2.31057C2.42187 7.62578 2.50755 7.52834 2.49411 7.4183ZM13.6661 6.21919C13.7308 6.28387 13.8198 6.32377 13.9185 6.32377H14.643C14.84 6.32377 15 6.16375 15 5.96677C15 5.76979 14.84 5.60977 14.643 5.60977H13.9185C13.7211 5.60977 13.5615 5.76979 13.5615 5.96677C13.5615 6.06505 13.6014 6.15451 13.6661 6.21919ZM7.05153 5.96677C7.05153 5.76979 6.89193 5.60977 6.69453 5.60977H5.97003C5.77305 5.60977 5.61303 5.76979 5.61303 5.96677C5.61303 6.06505 5.65293 6.15451 5.71761 6.21919C5.78229 6.28387 5.87175 6.32377 5.97003 6.32377H6.69453C6.89193 6.32377 7.05153 6.16375 7.05153 5.96677ZM4.23292 8.41832C4.06408 8.60564 3.95403 8.84545 3.92967 9.10963C3.92589 9.14659 3.92421 9.18398 3.92421 9.22178C3.92421 9.41666 3.97083 9.60061 4.05357 9.76357C4.25223 10.1559 4.65922 10.4255 5.12836 10.4255C5.5975 10.4255 6.00447 10.1559 6.20313 9.76357C6.28587 9.60061 6.3325 9.41666 6.3325 9.22178C6.3325 9.18398 6.33081 9.14659 6.32703 9.10963C6.30267 8.84545 6.19263 8.60564 6.02379 8.41832C5.80371 8.17262 5.48368 8.01763 5.12836 8.01763C4.77304 8.01763 4.453 8.17262 4.23292 8.41832ZM12.1928 3.89281L11.446 1.81129C11.4456 1.81045 11.4452 1.80961 11.4452 1.80877C11.3931 1.66597 11.2532 1.57441 11.1012 1.57441H7.04523C7.03473 1.58575 7.02465 1.59751 7.01457 1.60969L5.32827 3.69163C5.20143 3.84829 5.14936 4.05283 5.1859 4.25107C5.21572 4.41529 5.30223 4.55641 5.42319 4.65679C5.54373 4.75717 5.69872 4.81681 5.86546 4.81681H11.5426C12.021 4.81681 12.3545 4.34305 12.1928 3.89281ZM20.0161 4.02847L17.4037 1.77265C17.2554 1.64455 17.0669 1.57441 16.8716 1.57441H12.9404C12.6472 1.57441 12.4464 1.86967 12.5535 2.14225L13.5023 4.55347C13.5649 4.71265 13.7182 4.81681 13.8891 4.81681H19.649C19.7255 4.81681 19.8006 4.79581 19.8657 4.75591L19.9611 4.69753C20.2013 4.55095 20.229 4.21243 20.0161 4.02847ZM26.0448 9.10963C26.0204 8.84545 25.91 8.60564 25.742 8.41832C25.5215 8.17262 25.2018 8.01763 24.8465 8.01763C24.4912 8.01763 24.1712 8.17262 23.9511 8.41832C23.7822 8.60564 23.6722 8.84545 23.6478 9.10963C23.6441 9.14659 23.6424 9.18398 23.6424 9.22178C23.6424 9.41666 23.689 9.60061 23.7717 9.76357C23.9704 10.1559 24.3774 10.4255 24.8465 10.4255C25.3152 10.4255 25.7226 10.1559 25.9209 9.76357C26.0036 9.60061 26.0502 9.41666 26.0502 9.22178C26.0502 9.18398 26.0486 9.14659 26.0448 9.10963ZM28.4699 7.30069L28.2863 6.49303C28.272 6.42919 28.2342 6.37291 28.1809 6.33511L27.9528 6.17299C27.8768 6.11881 27.7773 6.10873 27.6916 6.14653C27.5933 6.18979 27.5328 6.28681 27.5328 6.38971C27.5328 6.41407 27.5362 6.43843 27.5429 6.46237L27.8172 7.43215C27.8495 7.54681 27.9541 7.62578 28.0734 7.62578H28.2107C28.3812 7.62578 28.5081 7.46701 28.4699 7.30069Z"
                            fill="#000000"
                          />
                        </svg>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-center flex">
                        <svg
                          width="13"
                          height="12"
                          viewBox="0 0 13 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.25424 0L7.6584 4.32157H12.2024L8.52622 6.99245L9.93039 11.314L6.25424 8.64314L2.57809 11.314L3.98225 6.99245L0.306104 4.32157H4.85007L6.25424 0Z"
                            fill="#333333"
                            fill-opacity="0.7"
                          />
                        </svg>
                        <svg
                          width="13"
                          height="12"
                          viewBox="0 0 13 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.25424 0L7.6584 4.32157H12.2024L8.52622 6.99245L9.93039 11.314L6.25424 8.64314L2.57809 11.314L3.98225 6.99245L0.306104 4.32157H4.85007L6.25424 0Z"
                            fill="#333333"
                            fill-opacity="0.7"
                          />
                        </svg>
                        <svg
                          width="13"
                          height="12"
                          viewBox="0 0 13 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.25424 0L7.6584 4.32157H12.2024L8.52622 6.99245L9.93039 11.314L6.25424 8.64314L2.57809 11.314L3.98225 6.99245L0.306104 4.32157H4.85007L6.25424 0Z"
                            fill="#333333"
                            fill-opacity="0.7"
                          />
                        </svg>
                        <svg
                          width="13"
                          height="12"
                          viewBox="0 0 13 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.37289 0L7.77705 4.32157H12.321L8.64487 6.99245L10.049 11.314L6.37289 8.64314L2.69674 11.314L4.1009 6.99245L0.424757 4.32157H4.96873L6.37289 0Z"
                            fill="#333333"
                            fill-opacity="0.2"
                          />
                        </svg>
                        <svg
                          width="13"
                          height="12"
                          viewBox="0 0 13 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.37289 0L7.77705 4.32157H12.321L8.64487 6.99245L10.049 11.314L6.37289 8.64314L2.69674 11.314L4.1009 6.99245L0.424757 4.32157H4.96873L6.37289 0Z"
                            fill="#333333"
                            fill-opacity="0.2"
                          />
                        </svg>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-center">{customer.spent}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-center">{customer.status}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-center text-green-500">...</div>
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

export default DashboardCard10;
