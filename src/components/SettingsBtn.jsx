import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Transition from "../utils/Transition";

function SettingsBtn() {
  const [searchOpen, setSearchOpen] = useState(false);

  const trigger = useRef(null);
  const searchContent = useRef(null);
  const searchInput = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !searchOpen ||
        searchContent.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSearchOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!searchOpen || keyCode !== 27) return;
      setSearchOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div>
      {/* Button */}
      <button
        ref={trigger}
        className={`w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition duration-150 rounded-full ml-3 ${
          searchOpen && "bg-gray-200"
        }`}
        onClick={() => {
          setSearchOpen(!searchOpen);
          setImmediate(() => searchInput.current.focus());
        }}
        aria-controls="search-modal"
      >
        <span className="sr-only">Settings</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 bg-gray-900 bg-opacity-30 z-50 transition-opacity"
        show={searchOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        id="search-modal"
        className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center transform px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={searchOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          className="bg-white overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg"
          ref={searchContent}
        >
          {/* Search form */}
          <form className="border-b border-gray-200">
            <div className="relative">
              <label htmlFor="modal-search" className="sr-only">
                Search
              </label>
              <input
                id="modal-search"
                className="w-full border-0 focus:ring-transparent placeholder-gray-400 appearance-none py-3 pl-10 pr-4"
                type="search"
                placeholder="Search Anything…"
                ref={searchInput}
              />
              <button
                className="absolute inset-0 right-auto group"
                type="submit"
                aria-label="Search"
              >
                <svg
                  className="w-4 h-4 shrink-0 fill-current text-gray-400 group-hover:text-gray-500 ml-4 mr-2"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                  <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                </svg>
              </button>
            </div>
          </form>
          <div
            className="py-4 px-2"
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setSearchOpen(false)}
          >
            {/* Recent searches */}
            <div className="mb-3 last:mb-0">
              <div className="text-xs font-semibold text-gray-400 uppercase px-2 mb-2">
                Recent searches
              </div>
              <ul className="text-sm">
                <li>
                  <Link
                    className="flex items-center p-2 text-gray-800 hover:text-white hover:bg-indigo-500 rounded group"
                    to="#0"
                    onClick={() => setSearchOpen(!searchOpen)}
                  >
                    <svg
                      className="w-4 h-4 fill-current text-gray-400 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" />
                    </svg>
                    <span>Form Builder - 23 hours on-demand video</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center p-2 text-gray-800 hover:text-white hover:bg-indigo-500 rounded group"
                    to="#0"
                    onClick={() => setSearchOpen(!searchOpen)}
                  >
                    <svg
                      className="w-4 h-4 fill-current text-gray-400 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" />
                    </svg>
                    <span>Access Mosaic on mobile and TV</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center p-2 text-gray-800 hover:text-white hover:bg-indigo-500 rounded group"
                    to="#0"
                    onClick={() => setSearchOpen(!searchOpen)}
                  >
                    <svg
                      className="w-4 h-4 fill-current text-gray-400 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" />
                    </svg>
                    <span>Product Update - Q4 2021</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center p-2 text-gray-800 hover:text-white hover:bg-indigo-500 rounded group"
                    to="#0"
                    onClick={() => setSearchOpen(!searchOpen)}
                  >
                    <svg
                      className="w-4 h-4 fill-current text-gray-400 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" />
                    </svg>
                    <span>Master Digital Marketing Strategy course</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center p-2 text-gray-800 hover:text-white hover:bg-indigo-500 rounded group"
                    to="#0"
                    onClick={() => setSearchOpen(!searchOpen)}
                  >
                    <svg
                      className="w-4 h-4 fill-current text-gray-400 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" />
                    </svg>
                    <span>Dedicated forms for products</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center p-2 text-gray-800 hover:text-white hover:bg-indigo-500 rounded group"
                    to="#0"
                    onClick={() => setSearchOpen(!searchOpen)}
                  >
                    <svg
                      className="w-4 h-4 fill-current text-gray-400 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" />
                    </svg>
                    <span>Product Update - Q4 2021</span>
                  </Link>
                </li>
              </ul>
            </div>
            {/* Recent pages */}
            <div className="mb-3 last:mb-0">
              <div className="text-xs font-semibold text-gray-400 uppercase px-2 mb-2">
                Recent pages
              </div>
              <ul className="text-sm">
                <li>
                  <Link
                    className="flex items-center p-2 text-gray-800 hover:text-white hover:bg-indigo-500 rounded group"
                    to="#0"
                    onClick={() => setSearchOpen(!searchOpen)}
                  >
                    <svg
                      className="w-4 h-4 fill-current text-gray-400 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 0H2c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h8l5-5V1c0-.6-.4-1-1-1zM3 2h10v8H9v4H3V2z" />
                    </svg>
                    <span>
                      <span className="font-medium text-gray-800 group-hover:text-white">
                        Messages
                      </span>{" "}
                      - Conversation / … / Mike Mills
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center p-2 text-gray-800 hover:text-white hover:bg-indigo-500 rounded group"
                    to="#0"
                    onClick={() => setSearchOpen(!searchOpen)}
                  >
                    <svg
                      className="w-4 h-4 fill-current text-gray-400 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 0H2c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h8l5-5V1c0-.6-.4-1-1-1zM3 2h10v8H9v4H3V2z" />
                    </svg>
                    <span>
                      <span className="font-medium text-gray-800 group-hover:text-white">
                        Messages
                      </span>{" "}
                      - Conversation / … / Eva Patrick
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
}

export default SettingsBtn;
