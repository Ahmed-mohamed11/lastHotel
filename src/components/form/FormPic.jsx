import React from "react";
//
function FormPic({ label, name, onChange, file }) {
  return (
    <div>
      <label
        htmlFor="file-upload"
        className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 
                                            outline-none font-medium rounded-md 
                                            text-sm px-5 py-2.5 text-center 
                                            ease-linear duration-100"
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
      {file && (
        <div>
          <img src={URL.createObjectURL(file)} alt="Uploaded Image" />
        </div>
      )}
    </div>
  );
}

export default FormPic;
