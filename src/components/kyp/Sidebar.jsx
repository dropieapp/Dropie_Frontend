import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

import Logo from "../../assets/icons/dropexpress-logo.svg";
import SidebarLinkGroup from "../../partials/SidebarLinkGroup";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-red-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white shadow-lg p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink exact to="/" className="block mx-auto">
            <img
              className="mx-auto h-12 w-full my-10"
              src={Logo}
              alt="Workflow"
            />
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <ul className="mt-3">
              {/* Dropie Partners */}
              <SidebarLinkGroup activecondition={pathname.includes("partners")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-500 hover:text-orange-600 truncate transition duration-150 ${
                          pathname.includes("partners") && "hover:text-gray-400"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {/* <svg
                              className="shrink-0 h-6 w-6"
                              viewBox="0 0 24 24"
                            >
                              <path
                                className={`fill-current text-slate-400 ${
                                  pathname.includes("partners") &&
                                  "text-indigo-300"
                                }`}
                                d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"
                              />
                              <path
                                className={`fill-current text-slate-700 ${
                                  pathname.includes("partners") &&
                                  "!text-indigo-600"
                                }`}
                                d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"
                              />
                              <path
                                className={`fill-current text-slate-600 ${
                                  pathname.includes("partners") &&
                                  "text-indigo-500"
                                }`}
                                d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"
                              />
                            </svg> */}
                            <svg
                              width="25"
                              height="13"
                              viewBox="0 0 25 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                className={`fill-current svg-class ${
                                  pathname.includes("partners") &&
                                  "svg-active-class"
                                }`}
                                d="M12.5 7.28125C14.1979 7.28125 15.6979 7.6875 16.9167 8.21875C18.0417 8.71875 18.75 9.84375 18.75 11.0625V11.7083C18.75 12.2812 18.2812 12.75 17.7083 12.75H7.29167C6.71875 12.75 6.25 12.2812 6.25 11.7083V11.0729C6.25 9.84375 6.95833 8.71875 8.08333 8.22917C9.30208 7.6875 10.8021 7.28125 12.5 7.28125ZM4.16667 7.54167C5.3125 7.54167 6.25 6.60417 6.25 5.45833C6.25 4.3125 5.3125 3.375 4.16667 3.375C3.02083 3.375 2.08333 4.3125 2.08333 5.45833C2.08333 6.60417 3.02083 7.54167 4.16667 7.54167ZM5.34375 8.6875C4.95833 8.625 4.57292 8.58333 4.16667 8.58333C3.13542 8.58333 2.15625 8.80208 1.27083 9.1875C0.5 9.52083 0 10.2708 0 11.1146V11.7083C0 12.2812 0.46875 12.75 1.04167 12.75H4.6875V11.0729C4.6875 10.2083 4.92708 9.39583 5.34375 8.6875ZM20.8333 7.54167C21.9792 7.54167 22.9167 6.60417 22.9167 5.45833C22.9167 4.3125 21.9792 3.375 20.8333 3.375C19.6875 3.375 18.75 4.3125 18.75 5.45833C18.75 6.60417 19.6875 7.54167 20.8333 7.54167ZM25 11.1146C25 10.2708 24.5 9.52083 23.7292 9.1875C22.8437 8.80208 21.8646 8.58333 20.8333 8.58333C20.4271 8.58333 20.0417 8.625 19.6563 8.6875C20.0729 9.39583 20.3125 10.2083 20.3125 11.0729V12.75H23.9583C24.5312 12.75 25 12.2812 25 11.7083V11.1146ZM12.5 0.25C14.2292 0.25 15.625 1.64583 15.625 3.375C15.625 5.10417 14.2292 6.5 12.5 6.5C10.7708 6.5 9.375 5.10417 9.375 3.375C9.375 1.64583 10.7708 0.25 12.5 0.25Z"
                                fill="#D93804"
                              />
                            </svg>

                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Dropie Partners
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && "transform rotate-180"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-3 ${!open && "hidden"}`}>
                          <li className="mb-3 last:mb-0">
                            <NavLink
                              end
                              to="/kyp"
                              className={`block text-gray-500 hover:text-orange-600 truncate transition duration-150 ${
                                pathname === "/kyp" && "hover:text-orange-500"
                              }`}
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Know your Partner
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-3 last:mb-0">
                            <NavLink
                              end
                              to="/partners"
                              className={`block text-gray-500 hover:text-orange-600 truncate transition duration-150 ${
                                pathname === "/partners" &&
                                "hover:text-orange-500 text-orange-500"
                              }`}
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Partners List
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* Pricing Center */}
              <li
                className={`px-3 py-2 rounded-sm mb-5 last:mb-0 ${
                  pathname === "/price-center" && "bg-orange-200"
                }`}
              >
                <NavLink
                  exact
                  to="/customers"
                  className={`block text-gray-500 hover:text-orange-600 truncate transition duration-150 ${
                    pathname === "/price-center" && "hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      className="shrink-0 h-6 w-6"
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.7337 10.1325L10.8587 2.2575C10.5437 1.9425 10.1062 1.75 9.625 1.75H3.5C2.5375 1.75 1.75 2.5375 1.75 3.5V9.625C1.75 10.1062 1.9425 10.5437 2.26625 10.8675L10.1413 18.7425C10.4563 19.0575 10.8938 19.25 11.375 19.25C11.8562 19.25 12.2937 19.0575 12.6087 18.7337L18.7337 12.6087C19.0575 12.2937 19.25 11.8562 19.25 11.375C19.25 10.8938 19.0487 10.4475 18.7337 10.1325ZM4.8125 6.125C4.08625 6.125 3.5 5.53875 3.5 4.8125C3.5 4.08625 4.08625 3.5 4.8125 3.5C5.53875 3.5 6.125 4.08625 6.125 4.8125C6.125 5.53875 5.53875 6.125 4.8125 6.125Z"
                        fill="#333333"
                        fill-opacity="0.6"
                      />
                    </svg>

                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Price Center
                    </span>
                  </div>
                </NavLink>
              </li>

              {/* Communication */}
              <li
                className={`px-3 py-2 rounded-sm mb-5 last:mb-0 ${
                  pathname === "/communication" && "bg-orange-200"
                }`}
              >
                <NavLink
                  exact
                  to="/communication"
                  className={`block text-gray-500 hover:text-orange-600 truncate transition duration-150 ${
                    pathname === "/communication" && "hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 512 512">
                      <path
                        className="fill-current text-gray-500"
                        d="M391,480c-19.52,0-46.94-7.06-88-30-49.93-28-88.55-53.85-138.21-103.38C116.91,298.77,93.61,267.79,61,208.45c-36.84-67-30.56-102.12-23.54-117.13C45.82,73.38,58.16,62.65,74.11,52A176.3,176.3,0,0,1,102.75,36.8c1-.43,1.93-.84,2.76-1.21,4.95-2.23,12.45-5.6,21.95-2,6.34,2.38,12,7.25,20.86,16,18.17,17.92,43,57.83,52.16,77.43,6.15,13.21,10.22,21.93,10.23,31.71,0,11.45-5.76,20.28-12.75,29.81-1.31,1.79-2.61,3.5-3.87,5.16-7.61,10-9.28,12.89-8.18,18.05,2.23,10.37,18.86,41.24,46.19,68.51s57.31,42.85,67.72,45.07c5.38,1.15,8.33-.59,18.65-8.47,1.48-1.13,3-2.3,4.59-3.47,10.66-7.93,19.08-13.54,30.26-13.54h.06c9.73,0,18.06,4.22,31.86,11.18,18,9.08,59.11,33.59,77.14,51.78,8.77,8.84,13.66,14.48,16.05,20.81,3.6,9.53.21,17-2,22-.37.83-.78,1.74-1.21,2.75a176.49,176.49,0,0,1-15.29,28.58c-10.63,15.9-21.4,28.21-39.38,36.58A67.42,67.42,0,0,1,391,480Z"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Communication
                    </span>
                  </div>
                </NavLink>
              </li>

              {/* Settings */}
              <li
                className={`px-3 py-2 rounded-sm my-20 mb-3 last:mb-0 ${
                  pathname === "/settings" && "bg-orange-200"
                }`}
              >
                <NavLink
                  exact
                  to="/settings"
                  className={`block text-gray-500 hover:text-orange-600 truncate transition duration-150 ${
                    pathname === "/settings" && "hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className="fill-current text-gray-500"
                        d="M21.32,9.55l-1.89-.63.89-1.78A1,1,0,0,0,20.13,6L18,3.87a1,1,0,0,0-1.15-.19l-1.78.89-.63-1.89A1,1,0,0,0,13.5,2h-3a1,1,0,0,0-.95.68L8.92,4.57,7.14,3.68A1,1,0,0,0,6,3.87L3.87,6a1,1,0,0,0-.19,1.15l.89,1.78-1.89.63A1,1,0,0,0,2,10.5v3a1,1,0,0,0,.68.95l1.89.63-.89,1.78A1,1,0,0,0,3.87,18L6,20.13a1,1,0,0,0,1.15.19l1.78-.89.63,1.89a1,1,0,0,0,.95.68h3a1,1,0,0,0,.95-.68l.63-1.89,1.78.89A1,1,0,0,0,18,20.13L20.13,18a1,1,0,0,0,.19-1.15l-.89-1.78,1.89-.63A1,1,0,0,0,22,13.5v-3A1,1,0,0,0,21.32,9.55ZM20,12.78l-1.2.4A2,2,0,0,0,17.64,16l.57,1.14-1.1,1.1L16,17.64a2,2,0,0,0-2.79,1.16l-.4,1.2H11.22l-.4-1.2A2,2,0,0,0,8,17.64l-1.14.57-1.1-1.1L6.36,16A2,2,0,0,0,5.2,13.18L4,12.78V11.22l1.2-.4A2,2,0,0,0,6.36,8L5.79,6.89l1.1-1.1L8,6.36A2,2,0,0,0,10.82,5.2l.4-1.2h1.56l.4,1.2A2,2,0,0,0,16,6.36l1.14-.57,1.1,1.1L17.64,8a2,2,0,0,0,1.16,2.79l1.2.4ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Settings
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Support */}
              <li
                className={`px-3 py-2 rounded-sm mb-7 last:mb-0 ${
                  pathname === "/support" && "bg-orange-200"
                }`}
              >
                <NavLink
                  exact
                  to="/support"
                  className={`block text-gray-500 hover:text-orange-600 truncate transition duration-150 ${
                    pathname === "/support" && "hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 18 18">
                      <path
                        className="fill-current text-gray-500"
                        d="M16 7.184C16 3.14 12.86 0 9 0S2 3.14 2 7c-1.163.597-2 1.696-2 3v2a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1 5 5 0 0 1 10 0 1 1 0 0 0-1 1v6a1 1 0 0 0 1 1v1h-2.592c-.206-.581-.756-1-1.408-1H8a1.5 1.5 0 0 0 0 3h6a2 2 0 0 0 2-2v-1.183A2.992 2.992 0 0 0 18 12v-2a2.99 2.99 0 0 0-2-2.816L-7 62"
                      />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Support
                    </span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-gray-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-gray-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
