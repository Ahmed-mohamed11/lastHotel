import ErrorImage from "../../images/gfx/error-404.svg";
import { Link } from "react-router-dom";

const Error404Modern = () => {
  return (
    <div className="container">
      <div className="">
        <div className="flex flex-col text-center">
          <img className="w-3/4 mx-auto mt-20" src={ErrorImage} alt="error" />
          <div className="w-3/4 mx-auto mt-16 dark:text-white grid gap-3 mb-10">
            <h3 className="text-3xl font-semibold font-sans">Oops! Why you’re here?</h3>
            <p className="text-lg font-normal">
              We are very sorry for inconvenience. It looks like you’re try to access a page that either has been
              deleted or never existed.
            </p>
            <Link to={`${import.meta.env.VITE_PUBLIC_URL}/`}>
              <button className="bg-themeColor py-2 px-3 rounded-md text-white font-medium ">
                Back To Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Error404Modern;
