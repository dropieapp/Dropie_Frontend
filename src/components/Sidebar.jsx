import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

import SidebarLinkGroup from "../partials/SidebarLinkGroup";
import Logo from "../assets/icons/dropexpress-logo.svg";
import verified from "../assets/gif/icons8-approval.gif";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/authentication";
// import { userSelector, clearState } from "../features/User/UserSlice";
// import Loader from "../assets/gif/loading.gif";
// import { useHistory } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  // const history = useHistory();

  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
  };
  const [userCode, setUserCode] = useState("");

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    setUserCode(user.data);
  }, []);

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
            {/* {userCode.business_id === null ? (
              <ul className="mt-3">
                <li
                  className={`px-3 py-2 rounded-sm mb-5 last:mb-0 ${
                    pathname === "/package-tracking" && "bg-orange-200"
                  }`}
                >
                  <NavLink
                    exact
                    to="/company-info"
                    className={`block text-gray-500 hover:text-orange-600 truncate transition duration-150 ${
                      pathname === "/company-info" && "hover:text-gray-200"
                    }`}
                  >
                    <div className="flex items-center">
                      <img src={verified} className="h-8 w-8" />
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Verify Account
                      </span>
                    </div>
                  </NavLink>
                </li>
              </ul>
            ) : ( */}
              <ul className="mt-3">
                {/* Package Tracking */}

                <li
                  className={`px-3 py-2 rounded-sm mb-5 last:mb-0 ${
                    pathname === "/package-tracking" && "bg-orange-200"
                  }`}
                >
                  <NavLink
                    exact
                    to="/package-tracking"
                    className={`block text-gray-500 hover:text-orange-600 truncate transition duration-150 ${
                      pathname === "/package-tracking" && "hover:text-gray-200"
                    }`}
                  >
                    <div className="flex items-center">
                      <svg className="shrink-0 h-6 w-6" viewBox="0 0 612 612">
                        <path
                          className="fill-current text-gray-500"
                          d="M482.188,83.333L184.622,223.225v89.832l-51.91-23.082v-89.832L430.278,60.252l-99.946-44.439
                            c-13.383-5.95-35.281-5.95-48.664,0L35.557,125.243C15.95,133.961-0.05,158.649,0,180.107l0.606,256.534
                            c0.051,21.686,16.408,46.401,36.348,54.926L282.42,596.499c12.945,5.534,34.129,5.534,47.075,0.003l245.55-104.936
                            c19.939-8.521,36.297-33.234,36.348-54.919L612,180.107c0.051-21.458-15.949-46.146-35.557-54.864L482.188,83.333z
                            M556.398,288.675l-14.403,6.683l-0.292,101.353c-0.013,4.429-3.925,9.701-8.727,11.773l-21.563,9.309
                            c-4.727,2.041-8.551,0.149-8.554-4.223l-0.073-100.021l-13.951,6.472c-6.562,3.044-10.669-1.729-7.411-8.601l33.348-70.356
                            c3.366-7.102,11.806-11.199,15.184-7.347l34.221,39.012C567.593,276.623,563.257,285.494,556.398,288.675z M415.596,451.443
                            c0.037,4.243-3.55,9.24-8.001,11.162l-19.996,8.632c-4.385,1.893-7.972,0.029-8.022-4.16l-1.171-95.826l-12.938,6.002
                            c-6.085,2.823-9.968-1.808-7.006-8.344l30.31-66.881c3.057-6.747,10.873-10.541,14.062-6.805l32.301,37.836
                            c3.226,3.777-0.712,12.202-7.062,15.147l-13.338,6.188L415.596,451.443z M580.201,423.619c-0.015,2.226-2.016,4.865-4.468,5.896
                            l-228.395,95.95c-2.131,0.896-3.884-0.043-3.915-2.096l-0.175-11.162c-0.032-2.058,1.67-4.463,3.805-5.372l228.802-97.467
                            c2.455-1.046,4.438-0.086,4.423,2.146L580.201,423.619z"
                        />
                      </svg>
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Package Tracking
                      </span>
                    </div>
                  </NavLink>
                </li>
                {/* Customers */}
                <li
                  className={`px-3 py-2 rounded-sm mb-5 last:mb-0 ${
                    pathname === "/customers" && "bg-orange-200"
                  }`}
                >
                  <NavLink
                    exact
                    to="/customers"
                    className={`block text-gray-500 hover:text-orange-600 truncate transition duration-150 ${
                      pathname === "/customers" && "hover:text-gray-200"
                    }`}
                  >
                    <div className="flex items-center">
                      <svg className="shrink-0 h-6 w-6" viewBox="0 0 60 60">
                        <path
                          className="fill-current text-gray-500"
                          d="M48.014,42.889l-9.553-4.776C37.56,37.662,37,36.756,37,35.748v-3.381c0.229-0.28,0.47-0.599,0.719-0.951
                    c1.239-1.75,2.232-3.698,2.954-5.799C42.084,24.97,43,23.575,43,22v-4c0-0.963-0.36-1.896-1-2.625v-5.319
                    c0.056-0.55,0.276-3.824-2.092-6.525C37.854,1.188,34.521,0,30,0s-7.854,1.188-9.908,3.53C17.724,6.231,17.944,9.506,18,10.056
                    v5.319c-0.64,0.729-1,1.662-1,2.625v4c0,1.217,0.553,2.352,1.497,3.109c0.916,3.627,2.833,6.36,3.503,7.237v3.309
                    c0,0.968-0.528,1.856-1.377,2.32l-8.921,4.866C8.801,44.424,7,47.458,7,50.762V54c0,4.746,15.045,6,23,6s23-1.254,23-6v-3.043
                    C53,47.519,51.089,44.427,48.014,42.889z"
                        />
                      </svg>

                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Customers
                      </span>
                    </div>
                  </NavLink>
                </li>
                {/* Fleet Management */}
                <li
                  className={`px-3 py-2 rounded-sm mb-5 last:mb-0 ${
                    pathname === "/fleet-management" && "bg-orange-200"
                  }`}
                >
                  <NavLink
                    exact
                    to="/fleet-management"
                    className={`block text-gray-500 hover:text-orange-600 truncate transition duration-150 ${
                      pathname === "/fleet-management" && "hover:text-gray-200"
                    }`}
                  >
                    <div className="flex items-center">
                      <svg
                        className="shrink-0 h-6 w-6"
                        viewBox="0 0 463.199 463.199"
                      >
                        <path
                          className="fill-current text-gray-500"
                          d="M455.141,172.846
                      c-12.827-6.715-47.824,4.588-56.941,10.454c-2.985-5.311-6.372-11.128-10.044-17.084c-18.775-30.452-34.697-48.099-48.678-53.947
                      c-0.561-0.235-1.141-0.423-1.733-0.563c-1.199-0.283-30.256-6.925-106.144-6.925s-104.945,6.643-106.145,6.925
                      c-0.593,0.14-1.172,0.328-1.733,0.563c-13.98,5.849-29.903,23.495-48.678,53.947c-3.672,5.956-7.06,11.773-10.044,17.084
                      c-9.117-5.866-44.115-17.169-56.941-10.454c-13.235,6.929-7.932,28.738,0,34.653c4.952,3.692,18.539,4.816,32.847,3.865
                      c-3.237,4.311-5.788,9.163-7.515,14.389c22.564,4.23,75.605,4.047,67.678,21.244c-11.598,25.155-47.296,21.673-69.301,10.489
                      l4.109,70.924c0,16.574,13.436,30.009,30.01,30.009h18.047c16.574,0,30.009-13.435,30.009-30.009l-0.589-6.358h236.492l-0.589,6.358
                      c0,16.574,13.435,30.009,30.009,30.009h18.047c16.574,0,30.01-13.435,30.01-30.009l4.108-70.924
                      c-22.004,11.184-57.702,14.667-69.3-10.489c-7.928-17.197,45.113-17.014,67.678-21.244c-1.727-5.227-4.277-10.079-7.515-14.389
                      c14.308,0.952,27.895-0.172,32.847-3.865C463.072,201.584,468.376,179.775,455.141,172.846z M289.346,288.721H173.853l-12-43.755
                      h139.492L289.346,288.721z M85.872,191.233c14.366-25.134,32.724-51.975,45.553-58.161c5.379-1.057,34.726-6.151,100.175-6.151
                      c65.524,0,94.864,5.106,100.172,6.15c12.813,6.177,31.175,33.022,45.549,58.162H85.872z"
                        />
                      </svg>

                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Fleet Management
                      </span>
                    </div>
                  </NavLink>
                </li>
                {/* Inventory */}
                <li
                  className={`px-3 py-2 rounded-sm mb-5 last:mb-0 ${
                    pathname === "/inventory" && "bg-orange-200"
                  }`}
                >
                  <NavLink
                    exact
                    to="/inventory"
                    className={`block text-gray-500 hover:text-orange-600 truncate transition duration-150 ${
                      pathname === "/inventory" && "hover:text-gray-200"
                    }`}
                  >
                    <div className="flex items-center">
                      <svg
                        className="shrink-0 h-6 w-6"
                        viewBox="0 0 383.235 383.235"
                      >
                        <path
                          className="fill-current text-gray-500"
                          d="M322.618,73.735h-38V55.096C284.618,24.716,259.902,0,229.521,0h-75.808c-30.38,0-55.096,24.716-55.096,55.096v18.639
                      h-38c-27.614,0-50,22.386-50,50v62.883h362v-62.883C372.618,96.12,350.232,73.735,322.618,73.735z M244.618,73.735h-106V55.096
                      c0-8.324,6.771-15.096,15.096-15.096h75.809c8.324,0,15.096,6.772,15.096,15.096L244.618,73.735L244.618,73.735z"
                        />
                        <path
                          className="fill-current text-gray-500"
                          d="M323.284,244.333c0,6.425-5.207,11.632-11.631,11.632h-41.404c-6.424,0-11.631-5.207-11.631-11.632v-20.702h-134v20.702
                      c0,6.425-5.207,11.632-11.631,11.632H71.581c-6.422,0-11.629-5.207-11.629-11.632v-20.702H10.618v109.604
                      c0,27.613,22.386,50,50,50h262c27.614,0,50-22.387,50-50V223.631h-49.334V244.333L323.284,244.333z"
                        />
                      </svg>
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Inventory
                      </span>
                    </div>
                  </NavLink>
                </li>
                {/* Deliveries */}
                <li
                  className={`px-3 py-2 rounded-sm mb-5 last:mb-0 ${
                    pathname === "/deliveries" && "bg-orange-200"
                  }`}
                >
                  <NavLink
                    exact
                    to="/deliveries"
                    className={`block text-gray-500 hover:text-orange-600 truncate transition duration-150 ${
                      pathname === "/deliveries" && "hover:text-gray-200"
                    }`}
                  >
                    <div className="flex items-center">
                      <svg className="shrink-0 h-6 w-6" viewBox="0 0 490 490">
                        <path
                          className="fill-current text-gray-500"
                          d="M452.032,51.938h-52.54v21.783c0,2.725-2.206,4.939-4.935,4.939H383.12c-2.73,0-4.938-2.215-4.938-4.939V51.938h-52.537
                        c-3.94,0-7.137,3.195-7.137,7.135v112.113c0,3.943,3.197,7.135,7.137,7.135h126.387c3.939,0,7.133-3.191,7.133-7.135V59.072
                        C459.165,55.133,455.971,51.938,452.032,51.938z"
                        />
                        <path
                          className="fill-current text-gray-500"
                          d="M378.853,438.063c-31.914,0-57.879-25.963-57.879-57.883s25.965-57.885,57.879-57.885
                              c31.922,0,57.889,25.965,57.889,57.885S410.774,438.063,378.853,438.063z M378.853,351.465
                              c-15.83,0-28.715,12.883-28.715,28.715c0,15.83,12.885,28.717,28.715,28.717c15.835,0,28.717-12.887,28.717-28.717
                              C407.569,364.348,394.688,351.465,378.853,351.465z"
                        />
                        <path
                          className="fill-current text-gray-500"
                          d="M57.883,438.063C25.968,438.063,0,412.1,0,380.18s25.968-57.885,57.883-57.885c31.916,0,57.883,25.965,57.883,57.885
                              S89.799,438.063,57.883,438.063z M57.883,351.465c-15.834,0-28.716,12.883-28.716,28.715c0,15.83,12.882,28.717,28.716,28.717
                              c15.835,0,28.716-12.887,28.716-28.717C86.599,364.348,73.718,351.465,57.883,351.465z"
                        />
                        <path
                          className="fill-current text-gray-500"
                          d="M406.497,266.9v-15.863h40.348c9.13,0,16.533-7.396,16.533-16.525v-11.766c0-9.125-7.403-16.525-16.533-16.525H244.62
                          c-9.129,0-16.532,7.4-16.532,16.525v11.941c0,9.127,7.403,16.527,16.532,16.527h22.359v63.521H154.954
                          c-8.207-12.799-18.968-23.807-31.559-32.313L167.461,123.5h40.726c9.129,0,16.527-7.404,16.527-16.531
                          c0-9.125-7.398-16.525-16.527-16.525c0,0-42.848,0-57.888,0c-2.058,0-5.645,0.863-7.403,1.73c-2.548,1.27-4.773,3.188-6.397,5.627
                          L19.228,273.613c-3.494,5.152-6.072,11.623-4.143,17.307c2.996,8.832,13.126,11.992,23.503,8.914
                          c7.882-2.336,14.424-3.359,22.742-3.359c43.058,0,78.088,35.031,78.088,78.09c0,9.129,7.396,16.531,16.525,16.531h128.297
                          c9.129,0,16.531-7.402,16.531-16.531c0-43.059,35.025-78.09,78.082-78.09c43.057,0,78.09,35.031,78.09,78.09
                          c0,9.129,7.404,16.531,16.527,16.531c9.133,0,16.53-7.402,16.53-16.531C490,322.818,454.45,279.219,406.497,266.9z"
                        />
                      </svg>
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Deliveries
                      </span>
                    </div>
                  </NavLink>
                </li>
                {/* Staffs */}
                <li
                  className={`px-3 py-2 rounded-sm mb-5 last:mb-0 ${
                    pathname === "/staffs" && "bg-orange-200"
                  }`}
                >
                  <NavLink
                    exact
                    to="/staffs"
                    className={`block text-gray-500 hover:text-orange-600 truncate transition duration-150 ${
                      pathname === "/staffs" && "hover:text-gray-200"
                    }`}
                  >
                    <div className="flex items-center">
                      <svg
                        className="shrink-0 h-6 w-6"
                        viewBox="0 0 512.011 512.011"
                      >
                        <path
                          className="fill-current text-gray-500"
                          d="M256.005,0c-141.163,0-256,114.859-256,256c0,64.832,24.405,123.947,64.277,169.088l112.491-54.955
                             c6.741-3.691,14.08-15.509,15.104-24.576c-26.795-23.872-42.539-59.072-42.539-95.851v-85.717
                             c-0.811-8.363-2.219-41.024,21.12-67.669C189.232,74.88,218.011,64,256.005,64s66.773,10.88,85.547,32.32
                             c23.317,26.645,21.931,59.307,21.12,67.669v85.717c0,36.8-15.765,72.021-42.539,95.872c1.024,9.045,8.405,20.885,15.936,25.003
                             l114.944,50.88c37.952-44.672,60.992-102.379,60.992-165.461C512.005,114.859,397.168,0,256.005,0z"
                        />
                        <path
                          className="fill-current text-gray-500"
                          d="M277.339,343.52v-18.901l8.832-6.4c21.717-16.747,33.835-41.963,33.835-68.523l0.192-89.707
                             c0,0,2.219-21.035-11.008-35.861c-10.325-11.584-28.224-17.451-53.184-17.451s-42.859,5.867-53.184,17.451
                             c-13.227,14.827-11.008,35.861-10.987,36.075l0.171,2.624v86.869c0,26.56,12.117,51.776,32.405,67.477l8.811,6.379l1.451,19.968
                             c0,24.853-16.491,52.608-38.315,64.512l-99.115,48.427c43.691,34.667,98.795,55.552,158.763,55.552
                             c61.632,0,118.251-21.909,162.475-58.347L317.211,408.8C293.808,396.128,277.339,368.373,277.339,343.52z"
                        />
                      </svg>
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Staffs
                      </span>
                    </div>
                  </NavLink>
                </li>
                {/* Finance */}
                <li
                  className={`px-3 py-2 rounded-sm mb-5 last:mb-0 ${
                    pathname === "/finance" && "bg-orange-200"
                  }`}
                >
                  <NavLink
                    exact
                    to="/finance"
                    className={`block text-gray-500 hover:text-orange-600 truncate transition duration-150 ${
                      pathname === "/finance" && "hover:text-gray-200"
                    }`}
                  >
                    <div className="flex items-center">
                      <svg
                        className="shrink-0 h-6 w-6"
                        viewBox="0 0 489.003 489.003"
                      >
                        <path
                          className="fill-current text-gray-500"
                          d="M305.802,156.814c-33.8-19.5-88.4-19.5-122,0s-33.4,51.2,0.4,70.7s88.4,19.5,122,0
                        C339.802,207.914,339.602,176.314,305.802,156.814z M290.302,187.514c-2.9,0.9-5.8,1.9-8.7,2.8c-1.8,0.5-2.9,0.6-3.7,0.2
                        c-0.4-0.3-0.8-0.7-1.2-1.3c-1.9-3.1-4.8-5.8-8.7-8c-0.5-0.3-1.1-0.6-1.7-0.9c-1.3-0.7-2.5-1.2-4.1-1.6c-5.6-1.3-10.6,0.8-9.9,4.3
                        c0.3,1.8,1.3,3.4,2.5,5.1c2,2.8,4.2,5.6,5.6,8.6c4.7,9.4-5.5,18.7-21.9,19.6c-5.9,0.3-11.5-0.4-16.7-2.1c-2.3-0.7-4-0.7-5.7,0.5
                        c-1.7,1.1-3.6,2.1-5.4,3.1c-1.6,0.9-3.3,1-4.9,0.1c-1.2-0.6-2.3-1.3-3.5-1.9c-0.8-0.5-1.6-0.9-2.4-1.4c-1.7-1-1.5-2,0.1-3
                        c1.3-0.8,2.6-1.5,3.8-2.3c2.9-1.7,2.9-1.8,0.5-3.7c-3-2.4-5.7-4.9-7.4-7.7c-1.3-2.2-1-2.7,2.5-3.9c2.6-0.8,5.1-1.7,7.7-2.5
                        c1.9-0.6,3-0.7,3.8-0.3c0.5,0.3,0.8,0.7,1.2,1.4c1.7,3.2,4.6,6,8.1,8.7c0.6,0.5,1.3,0.9,1.9,1.3c1.9,1.1,4.1,1.9,6.6,2.5
                        c6.5,1.5,12.3-1.1,11.7-5.2c-0.2-1.4-0.9-2.6-1.8-3.9c-2.2-3.3-5.1-6.4-6.6-9.9c-2.4-5.6-1.3-10.7,6.4-14.7c8.8-4.5,18.6-4.8,29-2
                        c4.3,1.2,4.2,1.2,7.5-0.7c1.1-0.7,2.2-1.3,3.3-1.9c2.5-1.4,3.4-1.4,5.9,0c0.8,0.4,1.5,0.9,2.3,1.3c5.3,3,5.3,3,0.1,6.1
                        c-3.7,2.1-3.7,2.1-0.6,4.6c2.4,1.9,4.3,3.9,5.7,6.1C292.702,186.014,292.302,186.914,290.302,187.514z M350.902,253.314
                        c-9.3,5.4-24.4,5.4-33.8,0c-9.3-5.4-9.4-14.2-0.1-19.6c9.3-5.4,24.4-5.4,33.8,0C360.202,239.114,360.302,247.914,350.902,253.314z
                        M172.902,150.514c-9.3,5.4-24.4,5.4-33.8,0c-9.4-5.4-9.4-14.2-0.1-19.6c9.3-5.4,24.4-5.4,33.8,0
                        C182.102,136.314,182.202,145.114,172.902,150.514z M477.402,211.414l-266.5-153.9c-15.4-8.9-40.4-8.9-55.7,0l-142.9,83
                        c-15.3,8.9-15.2,23.4,0.2,32.3l266.5,153.9c15.4,8.9,40.4,8.9,55.7,0l142.8-83C492.902,234.814,492.802,220.314,477.402,211.414z
                        M337.602,297.414c-1.7-1.6-3.7-3.1-6.1-4.5c-15.6-9-40.9-9-56.4,0c-1.2,0.7-2.2,1.4-3.3,2.2l-206.9-119.5c2-0.8,3.9-1.7,5.7-2.7
                        c15.5-9,15.4-23.6-0.2-32.6c-1.7-1-3.5-1.9-5.4-2.6l85.3-49.6c1.3,1.1,2.8,2.1,4.5,3.1c15.6,9,40.9,9,56.4,0c1.8-1,3.3-2.1,4.7-3.3
                        l207.6,119.8c-2.8,1-5.3,2.1-7.7,3.5c-15.5,9-15.5,23.7,0.2,32.7c2.4,1.4,5.1,2.5,7.9,3.5L337.602,297.414z M5.502,203.614
                        c6.8-3.5,17.3-3,23.8,0.8l278.6,160.8l150.6-87.6c6.5-3.8,17.2-3.8,23.8,0c6.6,3.8,6.6,10,0.1,13.8l-160.1,93
                        c-7.8,4.6-20.6,4.6-28.5,0l-5.6-3.2l-3.9-2.3l-279.3-161.2C-1.798,213.814-1.698,207.314,5.502,203.614z M482.602,341.714
                        l-160.1,93c-7.8,4.6-20.6,4.6-28.5,0l-5.5-3.2l-4-2.3l-279.3-161.2c-6.8-3.9-6.6-10.4,0.6-14.1c6.7-3.5,17.3-3,23.8,0.8
                        l278.5,160.8l150.6-87.5c6.6-3.8,17.2-3.8,23.8,0C489.102,331.714,489.202,337.914,482.602,341.714z"
                        />
                      </svg>

                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Finance
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
                  className={`px-3 py-2 rounded-sm mt-8 mb-3 last:mb-0 ${
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
            {/* )} */}

            <ul className="mt-3">
              {/* Logout */}
              <li className={`px-3 py-2 rounded-sm my-6 last:mb-0`}>
                <NavLink
                  exact
                  to="/login"
                  onClick={logOut}
                  className={`block text-gray-500 hover:text-orange-600 truncate transition duration-150`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 952.5 952.5">
                      <path
                        className="fill-current text-gray-500"
                        d="M162.45,822.5c40.7,40.699,88.2,72.699,141,95.1c54.8,23.201,112.899,34.9,172.8,34.9s118-11.699,172.8-34.9
                        c52.9-22.4,100.3-54.299,141-95.1c40.7-40.699,72.7-88.199,95.101-141c23.199-54.801,34.899-112.9,34.899-172.801
                        c0-59.899-11.7-118-34.899-172.799c-22.4-52.9-54.301-100.3-95.101-141c-40.7-40.7-88.2-72.7-141-95.1c-7.5-3.2-15.1-6.1-22.8-8.9
                        v153.5c23.4,13.3,45.2,29.9,64.8,49.5c57.4,57.4,89,133.7,89,214.799c0,81.102-31.6,157.4-89,214.801
                        c-57.399,57.4-133.7,89-214.8,89s-157.4-31.6-214.8-89c-57.4-57.4-89-133.699-89-214.801c0-81.099,31.6-157.399,89-214.799
                        c19.6-19.6,41.399-36.2,64.8-49.5V90.9c-7.6,2.8-15.2,5.7-22.8,8.9c-52.9,22.4-100.3,54.3-141,95.1c-40.7,40.7-72.7,88.2-95.1,141
                        c-23.2,54.8-34.9,112.9-34.9,172.799c0,59.9,11.7,118,34.9,172.801C89.75,734.301,121.75,781.801,162.45,822.5z"
                      />
                      <path
                        className="fill-current text-gray-500"
                        d="M476.25,511.801c38.7,0,70-31.301,70-70V213V70.4V70c0-38.7-31.3-70-70-70s-70,31.3-70,70v0.4V213v228.9
                        C406.25,480.5,437.55,511.801,476.25,511.801z"
                      />

                      {/* <path className={`fill-current text-gray-400 ${pathname.includes('analytics') && 'text-indigo-300'}`} d="M4 18h2a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v9a1 1 0 001 1zM11 18h2a1 1 0 001-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v14a1 1 0 001 1zM17 12v5a1 1 0 001 1h2a1 1 0 001-1v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1z" /> */}
                    </svg>

                    {/* <button onClick={onLogOut}> */}
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Logout
                    </span>
                    {/* </button> */}
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
