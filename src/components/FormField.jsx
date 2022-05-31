import React from "react";

const FormField = (props) => {
  return (
    <div class="text-gray-700">
      <label
        className="block label-text tracking-wide text-grey-darker text-xs font-bold mb-2 "
        htmlFor={props.label}
      >
        {props.label}
      </label>
      <input
        
        type={props.type}
        placeholder={props.placeholder}
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        className={`w-full px-8 py-2 text-primary input-text border-gray-200 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
      />
    </div>
  );
};


export default FormField;
