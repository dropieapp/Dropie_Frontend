import React from "react";
function FormInvoiceField({
  value,
  label,
  error,
  name,
  placeholder,
  type,
  onChange,
}) {
  return (
    <div class="text-gray-700 md:flex md:items-center mb-4">
      <div class="mb-1 md:mb-0 md:w-1/3">
        <label htmlFor={label}>{label}</label>
      </div>

      <div class="md:w-2/3 md:flex-grow">
        <input
          type={type}
          value={value}
          name={name}
          className={`w-full px-8 py-2 text-primary border-gray-200 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
          // className={`w-full px-8 py-2 text-primary input-text border-gray-200 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
          placeholder={placeholder}
          onChange={onChange}
        />
        {error && !value && <div className="text-red-500">{label} is required</div>}
      </div>
    </div>
  );
}
export default FormInvoiceField;
