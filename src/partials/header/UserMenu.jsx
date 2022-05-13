import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Transition from "../../utils/Transition";

import UserAvatar from "../../assets/images/user-image.png";
import { useDispatch, useSelector } from "react-redux";

function UserMenu() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const { pathname } = location;

  // const [userCode, setUserCode] = useState("");

  // useEffect(() => {
  //   let user = JSON.parse(localStorage.getItem("user"));
  //   setUserCode(user.data);
  // }, []);

  // const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.authentication.user.data);
  // const dispatch = useDispatch();

  const trigger = useRef(null);
  const dropdown = useRef(null);
  // console.log(userCode);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div>
      {user.business_id === null ? (
        <div className="relative inline-flex">
          <NavLink
            exact
            to="/company-info"
            className={`block text-gray-500 hover:text-orange-600 truncate transition duration-150 ${
              pathname === "/company-info" && "hover:text-gray-200"
            }`}
          >
            Verify Account
          </NavLink>
        </div>
      ) : (
        <div className="relative inline-flex">
          <button
            ref={trigger}
            className="inline-flex justify-center items-center group"
            aria-haspopup="true"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
          >
            <img
              className="w-8 h-8 rounded-full"
              src="https://apibeta.dropie.ng/storage/logo/2quVVN5utQDMQkvmnarOscpn6oq7Mi2D6nRodCPb.png"
              // src={UserAvatar}
              width="32"
              height="32"
              alt="User"
            />

            <div className="flex items-center truncate">
              <span className="truncate ml-2 text-sm font-medium group-hover:text-slate-800">
                {user.manager_name}.
                <div className="text-xs text-slate-500 italic">
                  {user.business && user.business.business_name}
                </div>
              </span>
              <svg
                className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
                viewBox="0 0 12 12"
              >
                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
              </svg>
            </div>
          </button>
          <Transition
            className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
            show={dropdownOpen}
            enter="transition ease-out duration-200 transform"
            enterStart="opacity-0 -translate-y-2"
            enterEnd="opacity-100 translate-y-0"
            leave="transition ease-out duration-200"
            leaveStart="opacity-100"
            leaveEnd="opacity-0"
          >
            <div
              ref={dropdown}
              onFocus={() => setDropdownOpen(true)}
              onBlur={() => setDropdownOpen(false)}
            >
              <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200">
                <div className="font-medium text-slate-800">
                  {user.manager_name}.
                </div>
                <div className="text-xs text-slate-500 italic">
                  {user.business && user.business.business_name}
                </div>
              </div>
              <ul>
                <li>
                  <Link
                    className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                    to="/"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <Link
                    className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                    to="/login"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          </Transition>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
