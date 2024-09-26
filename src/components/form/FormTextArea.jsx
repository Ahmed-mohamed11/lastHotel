import React from "react";

function FormTextArea({ label, name, value, placeholder, required, onChange }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white outline-none focus:border-gray-600 dark:focus:border-gray-100 duration-100 ease-linear"
      >
        {label}
      </label>
      <textarea
        name={name}
        id={name}
        defaultValue={value}
        rows={5}
        className="bg-gray-50 border border-gray-300
                    text-gray-900 text-sm rounded-md
                    block w-full p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 
                    dark:text-white outline-none
                    focus:border-orange-400 dark:focus:border-orange-400
                    duration-100 ease-linear resize-none"
        placeholder={placeholder}
        required={required}
        onChange={onChange}
      />
    </div>
  );
}

export default FormTextArea;
