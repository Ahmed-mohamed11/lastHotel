import React from "react";

function FormInput({
  label,
  type,
  name,
  value,
  placeholder,
  required,
  onChange,
  numberOnly,
  maxLength,
}) {
  const handleChange = (e) => {
    if (numberOnly) {
      const nonAlphabeticValue = e.target.value.replace(/[a-zA-Z]/g, "");
      e.target.value = nonAlphabeticValue;
      onChange(e); // Pass the event object to the parent component
      // console.log("false")
    } else {
      onChange(e); // Pass the event object to the parent component
      // console.log("true", numberOnly);
    }
  };

  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        defaultValue={value}
        className="bg-gray-50 border border-gray-300
                            text-gray-900 text-sm rounded-md
                            block w-full p-2.5 dark:bg-gray-700
                            dark:border-gray-600 dark:placeholder-gray-400 
                            dark:text-white outline-none 
                            focus:border-orange-400 dark:focus:border-orange-400
                            duration-100 ease-linear"
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        onChange={numberOnly ? handleChange : onChange}
        // onInput={(e) => {
        //   if (numberOnly) {
        //     const nonAlphabeticValue = e.target.value.replace(/[a-zA-Z]/g, "");
        //     e.target.value = nonAlphabeticValue;
        //     onChange(nonAlphabeticValue);
        //     console.log("false")
        //   }
        //   onChange();
        //   console.log("true", numberOnly);
        // }}
      />
    </div>
  );
}

export default FormInput;
