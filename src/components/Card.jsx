import { Link } from "react-router-dom";

export default function Card({ id, icon, name, adminName, rooms, click }) {
  return (
    <div onClick={click} className={`w-full cursor-pointer`}>
      <div
        className={`border-2 border-gray-200 shadow-md hover:shadow-xl
        ease-linear duration-100 m-3 relative hover:translate-y-0.5 rounded-md
        dark:bg-gray-900 dark:shadow-slate-800 dark:border-gray-600 
        dark:hover:bg-gray-950`}
      >
        <span
          className={`after:content-['${id}'] relative after:ml-0.5
          after:bg-orange-500 text-orange-500 text-center text-xl 
          after:w-9 after:h-2.5 after:absolute after:top-0
          after:right-0 top-3 -right-[100%] after:border-t-4`}
        ></span>
        <div
          className={`px-10 py-5 text-orange-500 hover:text-orange-700
          dark:text-orange-100 dark:hover:text-orange-500
          ease-linear duration-100 flex justify-between items-center`}
        >
          <div className="w-1/6 flex items-center">{icon}</div>
          <div className="flex flex-col items-center w-2/6 text-center">
            <h1 className="text-1xl">{name}</h1>
          </div>
          <div className="flex flex-col items-center w-2/6 text-center">
            <p className="text-slate-400">{adminName}</p>
          </div>
          <div className="flex flex-col items-center w-1/6 text-center">
            <p className="text-slate-400 text-center">{rooms}</p>{" "}
          </div>

          {/* <div
            className={`flex justify-center mt-2
             p-0.5 h-full border w-2/6 hover:text-white
             border-orange-300 hover:bg-orange-500 text-orange-800
            ease-linear duration-100 hover:translate-y-0.5`}
          >
            <Link
              onClick={click}
              className={` w-full h-full mx-auto ease-linear duration-100 text-center
              bg-orange-300 hover:bg-orange-500
                p-2 font-semibold`}
            >
              Continue
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}
