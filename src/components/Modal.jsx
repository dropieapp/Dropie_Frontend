import React, { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ open, onClose, children }) {
  function escHandler({ key }) {
    if (key === "Escape") {
      onClose();
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", escHandler);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", escHandler);
      }
    };
  }, []);

  if (typeof document !== "undefined") {
    return createPortal(
      <div
        className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ${
          open ? "" : "pointer-events-none"
        }`}
      >
        <div
          className={`fixed inset-0 bg-black ${
            open ? "opacity-50" : "pointer-events-none opacity-0"
          } transition-opacity duration-300 ease-in-out`}
          onClick={onClose}
        />

        <div className="relative w-full my-6 mx-auto max-w-3xl">
          <div
            className={`relative flex-auto bg-white shadow-lg  p-4 ${
              open ? "opacity-100" : "pointer-events-none opacity-0"
            } transition-opacity duration-300 ease-in-out`}
          >
            {/* Header */}
        
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Modal Title</h3>
              <button
                className="p-1 ml-auto border-0 text-gray-900 opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={onClose}
              >
                <span className="text-gray-900 opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/* Content */}
            {children}

            {/* Footer */}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-white bg-red-500 font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none mr-4 rounded mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={onClose}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={onClose}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>,

      document.body
    );
  } else {
    return null;
  }
}
