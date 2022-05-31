import React from "react";

const SelectField = ({
  name,
  label,
  options,
  error,
  idKey,
  nameKey,
  ...rest
}) => {
  // const [selectedOption, setSelectedOption] = useState();

  return (
    <div class="text-gray-700">
      <label
        className="block label-text tracking-wide text-grey-darker text-xs font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <select
        name={name}
        id={name}
        {...rest}
        className={`w-full px-8 py-2 text-primary border-gray-200 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
      >
        <option value="">Select a Vehicle</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.type}
          </option>
        ))}
      </select>
      {error && <div className="text-red-500">{label} is required</div>}
    </div>
  );
};

export default SelectField;
