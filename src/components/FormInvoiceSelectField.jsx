import React, { useRef, useCallback, useState } from "react";

const FormInvoiceSelectField = (props) => {
  const handleChange = useCallback((event) => {
    let selectedValue = event.target.value;
    props.onSelectChange(selectedValue);
  });
  let arrayOfData = props.arrayOfData;
  let options = arrayOfData.map((data) => (
    <option key={data.id} value={data.id}>
      {data.name}
    </option>
  ));
  return (
    <div class="text-gray-700 md:flex md:items-center mb-4">
      <div class="mb-1 md:mb-0 md:w-1/3">
        <label htmlFor={props.label}>{props.label}</label>
      </div>
      <div class="relative inline-block md:w-2/3 md:flex-grow text-gray-700">
        <select
          name={props.name}
          onChange={handleChange}
          allowClear
          className={`w-full px-8 py-2 text-primary border-gray-200 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
          placeholder={props.placeholder}
        >
          {options}
        </select>
      </div>
    </div>
  );
};
export default FormInvoiceSelectField;
