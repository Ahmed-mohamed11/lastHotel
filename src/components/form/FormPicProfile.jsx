import React from "react";
//
function FormPicProfile({ label, name, onChange, file }) {

  const labelStyle = {
    backgroundImage: file ? `url(${URL.createObjectURL(file)})` : 'none',
  };

  return (
    <div>
      <label
        htmlFor="file-upload"
        className={`flex items-center gap-2 bg-orange-600 hover:bg-orange-700 
        outline-none font-medium rounded-full bg-cover bg-center
        text-xs px-5 py-2.5 text-center w-20 h-20 hover:backdrop-filter
        ease-linear duration-100 mx-auto cursor-pointer`}
        style={labelStyle}
      >
        {label}
      </label>
      <input
        type="file"
        id="file-upload"
        name="file-upload"
        className="hidden"
        onChange={onChange}
      />
      {/* {file && (
        <div>
          <img
            src={URL.createObjectURL(file)}
            alt="Uploaded Image"
            className="rounded-full w-20 h-20"
          />
        </div>
      )} */}
    </div>
  );
}

export default FormPicProfile;
