import React from "react";
function FormInvoiceField(props) {
  return (
    <div class="text-gray-700 md:flex md:items-center mb-4">
      <div class="mb-1 md:mb-0 md:w-1/3">
        <label htmlFor={props.label}>{props.label}</label>
      </div>

      <div class="md:w-2/3 md:flex-grow">
        <input
          className={`w-full px-8 py-2 text-primary border-gray-200 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
          // class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
          placeholder={props.placeholder}
          type={props.type}
          id={props.id}
        />
      </div>
    </div>
  );
}
export default FormInvoiceField;
