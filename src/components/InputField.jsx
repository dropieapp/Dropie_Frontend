import React from "react";

const InputField = ({ value, label, name, placeholder, type, onChange }) => (
  <div class="text-gray-700">
    {label && (
      <label
        className="block label-text tracking-wide text-grey-darker text-xs font-bold mb-2"
        htmlFor={label}
      >
        {label}
      </label>
    )}
    <input
      type={type}
      value={value}
      name={name}
      className={`w-full px-8 py-2 text-primary input-text border-gray-200 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
      placeholder={placeholder}
      onChange={onChange}
    />
  </div>
);

export default InputField;
