import React from "react";

function FormBtnIcon({ label, icon }) {
  return (
    <button
      type="submit"
      className="text-white gap-2 inline-flex items-center 
        bg-orange-600 hover:bg-orange-700 
        outline-none font-medium rounded-md 
        text-sm px-5 py-2.5 text-center 
        ease-linear duration-100"
    >
      {icon}
      {label}
    </button>
  );
}

export default FormBtnIcon;
