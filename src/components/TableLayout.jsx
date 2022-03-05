import React, { useState } from "react";
import Layout from "../components/Layout";
import "../css/fleet.css";
import Datepicker from "../partials/actions/Datepicker";
import images from "../assets/images/user-36-01.jpg";
import Modal from "../components/Modal";

function FleetManagement() {
  const [open, setOpen] = useState(false);
  return (
    <Layout>
      <div className="px-4 sm:px-6 pl-8 py-8 w-full max-w-9xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="mb-4 wu">
            <h1 className="vk kz text-orange-600 font-bold">Vehicle Lists</h1>
          </div>
          <div className="grid grid-flow-col auto-cols-auto justify-start xe gap-2">
            <div className="relative inline-flex">
              <Datepicker />
              <button className="btn bg-white border-gray-200 hover--border-gray-300 text-gray-500 hover--text-gray-600">
                <span className="ng">Filter</span>
                <wbr />
                <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                  <path d="M9 15H7a1 1 0 010-2h2a1 1 0 010 2zM11 11H5a1 1 0 010-2h6a1 1 0 010 2zM13 7H3a1 1 0 010-2h10a1 1 0 010 2zM15 3H1a1 1 0 010-2h14a1 1 0 010 2z"></path>
                </svg>
              </button>
            </div>
            <button
              className="btn bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => setOpen(true)}
            >
              <svg
                className="w-4 h-4 fill-current opacity-50 flex-shrink-0"
                viewBox="0 0 16 16"
              >
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white na rounded-sm border border-gray-200">
        <header className="px-5 py-4">
          <h2 className="font-semibold text-gray-800">
            All Vehicles{" "}
            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-orange-600 rounded-full">
              248
            </span>
          </h2>
        </header>
        <div x-data="handleSelect">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="vj font-semibold uppercase text-gray-500 border-t-2 border-b-2 border-gray-200">
                <tr>
                  <th className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <label className="inline-flex">
                        <span className="ng">Select all</span>{" "}
                        <input
                          id="parent-checkbox"
                          className="tj"
                          type="checkbox"
                        />
                      </label>
                    </div>
                  </th>
                  <th className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">
                      Vehicle Number
                    </div>
                  </th>
                  <th className="yl uv yd px-2 py-3 whitespace-nowrap">
                    <div className="font-semibold">Driver's Name</div>
                  </th>
                  <th className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">
                      Vehicle Location
                    </div>
                  </th>
                  <th className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Vehicle Type</div>
                  </th>
                  <th className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Axises/Route</div>
                  </th>
                  <th className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Vehicle Model</div>
                  </th>
                  <th className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Status</div>
                  </th>
                  <th className="yl yd px-2 py-3 whitespace-nowrap">
                    <span className="ng">Menu</span>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm t_ lh">
                <tr>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <label className="inline-flex">
                        <span className="ng">Select</span>{" "}
                        <input
                          className="table-item tj"
                          checked
                          type="checkbox"
                        />
                      </label>
                    </div>
                  </td>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <div className="text-left">ABJ 456 CD</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-2 w-10 h-10 flex-shrink-0 wa">
                        <img
                          className="rounded-full"
                          src={images}
                          width="40"
                          height="40"
                          alt="User 01"
                        />
                      </div>
                      <div className="font-medium text-gray-800">
                        Patricia Semklo
                      </div>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">Abuja</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">Motorcycle</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">Gwagwalada</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">2014 Model</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left font-medium text-green-500">
                      Active
                    </div>
                  </td>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <button className="text-slate-400 hover:text-slate-500 rounded-full">
                      <span className="ng">Menu</span>
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="2"></circle>
                        <circle cx="10" cy="16" r="2"></circle>
                        <circle cx="22" cy="16" r="2"></circle>
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <label className="inline-flex">
                        <span className="ng">Select</span>{" "}
                        <input className="table-item tj" type="checkbox" />
                      </label>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">GWA 232 KJ</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-2 w-10 h-10 flex-shrink-0 wa">
                        <img
                          className="rounded-full"
                          src={images}
                          width="40"
                          height="40"
                          alt="User 02"
                        />
                      </div>
                      <div className="font-medium text-gray-800">
                        Dominik Lamakani
                      </div>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">Lagos State</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">Motorcycle</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">Ikeja</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">2014 Model</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left font-medium text-green-500">
                      Active
                    </div>
                  </td>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <button className="text-slate-400 hover:text-slate-500 rounded-full">
                      <span className="ng">Menu</span>
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="2"></circle>
                        <circle cx="10" cy="16" r="2"></circle>
                        <circle cx="22" cy="16" r="2"></circle>
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <label className="inline-flex">
                        <span className="ng">Select</span>{" "}
                        <input className="table-item tj" type="checkbox" />
                      </label>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">ABJ 456 CD</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-2 w-10 h-10 flex-shrink-0 wa">
                        <img
                          className="rounded-full"
                          src={images}
                          width="40"
                          height="40"
                          alt="User 03"
                        />
                      </div>
                      <div className="font-medium text-gray-800">
                        Ivan Mesaros
                      </div>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">Lagos State</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">Motorcycle</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">Ikeja</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">2014 Model</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left font-medium text-green-500">
                      Active
                    </div>
                  </td>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <button className="text-slate-400 hover:text-slate-500 rounded-full">
                      <span className="ng">Menu</span>
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="2"></circle>
                        <circle cx="10" cy="16" r="2"></circle>
                        <circle cx="22" cy="16" r="2"></circle>
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <label className="inline-flex">
                        <span className="ng">Select</span>{" "}
                        <input className="table-item tj" type="checkbox" />
                      </label>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">GWA 232 KJ</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-2 w-10 h-10 flex-shrink-0 wa">
                        <img
                          className="rounded-full"
                          src={images}
                          width="40"
                          height="40"
                          alt="User 04"
                        />
                      </div>
                      <div className="font-medium text-gray-800">
                        Maria Martinez
                      </div>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">Lagos State</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">Motorcycle</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">Ikeja</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">2014 Model</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left font-medium text-green-500">
                      Active
                    </div>
                  </td>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <button className="text-slate-400 hover:text-slate-500 rounded-full">
                      <span className="ng">Menu</span>
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="2"></circle>
                        <circle cx="10" cy="16" r="2"></circle>
                        <circle cx="22" cy="16" r="2"></circle>
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <label className="inline-flex">
                        <span className="ng">Select</span>{" "}
                        <input className="table-item tj" type="checkbox" />
                      </label>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">ABJ 456 CD</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-2 w-10 h-10 flex-shrink-0 wa">
                        <img
                          className="rounded-full"
                          src={images}
                          width="40"
                          height="40"
                          alt="User 05"
                        />
                      </div>
                      <div className="font-medium text-gray-800">
                        Vicky Jung
                      </div>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">Rivers State</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">Motorcycle</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">PH</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">2014 Model</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left font-medium text-green-500">
                      Active
                    </div>
                  </td>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <button className="text-slate-400 hover:text-slate-500 rounded-full">
                      <span className="ng">Menu</span>
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="2"></circle>
                        <circle cx="10" cy="16" r="2"></circle>
                        <circle cx="22" cy="16" r="2"></circle>
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <label className="inline-flex">
                        <span className="ng">Select</span>{" "}
                        <input className="table-item tj" type="checkbox" />
                      </label>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">ABJ 456 CD</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-2 w-10 h-10 flex-shrink-0 wa">
                        <img
                          className="rounded-full"
                          src={images}
                          width="40"
                          height="40"
                          alt="User 06"
                        />
                      </div>
                      <div className="font-medium text-gray-800">
                        Tisho Yanchev
                      </div>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">Ondo State</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">Motorcycle</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">Osogoho</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">2014 Model</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left font-medium text-green-500">
                      Active
                    </div>
                  </td>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <button className="text-slate-400 hover:text-slate-500 rounded-full">
                      <span className="ng">Menu</span>
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="2"></circle>
                        <circle cx="10" cy="16" r="2"></circle>
                        <circle cx="22" cy="16" r="2"></circle>
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <label className="inline-flex">
                        <span className="ng">Select</span>{" "}
                        <input className="table-item tj" type="checkbox" />
                      </label>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">ABJ 456 CD</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-2 w-10 h-10 flex-shrink-0 wa">
                        <img
                          className="rounded-full"
                          src={images}
                          width="40"
                          height="40"
                          alt="User 07"
                        />
                      </div>
                      <div className="font-medium text-gray-800">
                        James Cameron
                      </div>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">Abuja</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">Motorcycle</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">Lugbe</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">2014 Model</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left font-medium text-green-500">
                      Active
                    </div>
                  </td>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <button className="text-slate-400 hover:text-slate-500 rounded-full">
                      <span className="ng">Menu</span>
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="2"></circle>
                        <circle cx="10" cy="16" r="2"></circle>
                        <circle cx="22" cy="16" r="2"></circle>
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <label className="inline-flex">
                        <span className="ng">Select</span>{" "}
                        <input className="table-item tj" type="checkbox" />
                      </label>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">GWA 232 KJ</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-2 w-10 h-10 flex-shrink-0 wa">
                        <img
                          className="rounded-full"
                          src={images}
                          width="40"
                          height="40"
                          alt="User 08"
                        />
                      </div>
                      <div className="font-medium text-gray-800">
                        Haruki Masuno
                      </div>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">Abuja</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">Motorcycle</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">Wuse 2</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">2014 Model</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left font-medium text-green-500">
                      Active
                    </div>
                  </td>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <button className="text-slate-400 hover:text-slate-500 rounded-full">
                      <span className="ng">Menu</span>
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="2"></circle>
                        <circle cx="10" cy="16" r="2"></circle>
                        <circle cx="22" cy="16" r="2"></circle>
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <label className="inline-flex">
                        <span className="ng">Select</span>{" "}
                        <input className="table-item tj" type="checkbox" />
                      </label>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">ABJ 456 CD</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-2 w-10 h-10 flex-shrink-0 wa">
                        <img
                          className="rounded-full"
                          src={images}
                          width="40"
                          height="40"
                          alt="User 09"
                        />
                      </div>
                      <div className="font-medium text-gray-800">Joe Huang</div>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">Edo State</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">Motorcycle</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">Wuse</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">2014 Model</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left font-medium text-green-500">
                      Active
                    </div>
                  </td>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <button className="text-slate-400 hover:text-slate-500 rounded-full">
                      <span className="ng">Menu</span>
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="2"></circle>
                        <circle cx="10" cy="16" r="2"></circle>
                        <circle cx="22" cy="16" r="2"></circle>
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <label className="inline-flex">
                        <span className="ng">Select</span>{" "}
                        <input className="table-item tj" type="checkbox" />
                      </label>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">GWA 232 KJ</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-2 w-10 h-10 flex-shrink-0 wa">
                        <img
                          className="rounded-full"
                          src={images}
                          width="40"
                          height="40"
                          alt="User 10"
                        />
                      </div>
                      <div className="font-medium text-gray-800">
                        Carolyn McNeail
                      </div>
                    </div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">Lagos State</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">Motorcycle</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">Ikeja</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left">2014 Model</div>
                  </td>
                  <td className="yl yd px-2 py-3 whitespace-nowrap">
                    <div className="text-left font-medium text-green-500">
                      Active
                    </div>
                  </td>
                  <td className="yl yd uv px-2 py-3 whitespace-nowrap">
                    <button className="text-slate-400 hover:text-slate-500 rounded-full">
                      <span className="ng">Menu</span>
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="2"></circle>
                        <circle cx="10" cy="16" r="2"></circle>
                        <circle cx="22" cy="16" r="2"></circle>
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex flex-col wk justify-between items-center">
          <nav className="mb-4 wu wi" role="navigation" aria-label="Navigation">
            <ul className="flex justify-center">
              <li className="ml-3 first--ml-0">
                <a
                  className="btn bg-white border-gray-200 text-slate-300 cursor-not-allowed"
                  href="#0"
                  disabled="disabled"
                >
                  &lt;- Previous
                </a>
              </li>
              <li className="ml-3 first--ml-0">
                <a
                  className="btn bg-white border-gray-200 hover--border-gray-300 text-orange-500"
                  href="#0"
                >
                  Next -&gt;
                </a>
              </li>
            </ul>
          </nav>
          <div className="text-sm text-gray-500 text-center xd">
            Showing <span className="font-medium text-slate-600">1</span> to{" "}
            <span className="font-medium text-slate-600">10</span> of{" "}
            <span className="font-medium text-slate-600">248</span> results
          </div>
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
          I always felt like I could do anything. That’s the main thing people
          are controlled by! Thoughts- their perception of themselves! They're
          slowed down by their perception of themselves. If you're taught you
          can’t do anything, you won’t do anything. I was taught I could do
          everything.
        </p>
      </Modal>
    </Layout>
  );
}

export default FleetManagement;
