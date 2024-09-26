import { Eye, EyeClosed } from "@phosphor-icons/react";
import {  useState } from "react";
 
export default function FormLogin({
  buttonText,
  handlePasswordChange,
  handleEmailInput,
  handleSubmitLogin,
}) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

     const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (
      !isValidEmail(formData.email) &&
      !isValidEmail(formData.email)
    ) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 3) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
       setErrors({});
      
    }
    handleSubmitLogin(e);
  };
   const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

 

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative overflow-hidden duration-150 ease-linear`}
    >
      <div className={`space-y-8 p-8 duration-150 ease-linear`}>
        <div className="relative" dir="ltr">
          <label
            htmlFor="email"
            className={`block font-semibold absolute 
          -top-7 right-0 py-0 px-1 ${
            errors.email ? "text-red-500" : "text-white"
          }`}
          >
            البريد الالكتروني
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onInput={handleEmailInput}
            autoComplete="off"   
            className={`w-full px-3 py-3 border-2 duration-150 ease-linear text-white
     bg-gray-900 rounded-md focus:border-orange-400 outline-none ${errors.email ? "border-red-500" : "border-gray-200"
              } placeholder:tracking-wide text-left mb-2`}
            placeholder="email@example.com"
          />

          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="relative" dir="ltr">
          <label
            htmlFor="password"
            className={`block font-semibold absolute
          -top-7 right-0 py-0 px-1 ${
            errors.email ? "text-red-500" : "text-white"
          }`}
          >
            كلمة المرور
          </label>
          <input
            type={showPass ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            onInput={handlePasswordChange}
            className={`w-full px-3 py-3 border-2 duration-150 ease-linear text-white
          bg-gray-900 rounded-md focus:border-orange-400 outline-none ${
            errors.password ? "border-red-500" : "border-gray-200"
          } placeholder:tracking-wide text-left`}
             placeholder="***********"
          />
          <div
            className={`absolute top-full left-1 mt-1.5 ease-linear duration-100
            cursor-pointer text-sm font-bold text-gray-500 hover:text-gray-800`}
          >
            نسيت كلمة السر
          </div>
          <div
            className={`absolute right-2 
            -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
              errors.password ? "top-[38%]" : "top-1/2"
            } ${showPass ? "text-blue-400" : "text-gray-400"}`}
          >
            {showPass ? (
              <Eye size={25} weight="bold" onClick={handleShowPass} />
            ) : (
              <EyeClosed size={25} weight="bold" onClick={handleShowPass} />
            )}
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            className={`w-full bg-themeColor-500 ease-linear duration-150 
            hover:bg-transparent hover:text-themeColor-500
            border-2 border-themeColor-500 font-semibold
            text-gray-900 rounded-md py-2 tracking-wide mt-2`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </form>
  );
}
