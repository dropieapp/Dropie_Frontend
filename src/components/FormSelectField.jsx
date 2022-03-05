import React, { useRef, useCallback, useState } from "react";

const FormSelectField = (props) => {
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
    <div class="text-gray-700">
      <label
        className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        htmlFor={props.label}
      >
        {props.label}
      </label>
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
  );
};
export default FormSelectField;
