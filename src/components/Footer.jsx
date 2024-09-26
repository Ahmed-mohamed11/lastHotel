
const Footer = ({ dark }) => {
  return (
    <div className="bg-slate-600 text-slate-200 absolute top-[90%]">
      <div
        className={`w-full
             bg-slate-200 pt-5`}
      >
        <div
          className={`flex items-center justify-between container mx-auto
            `}
        >
          <a
            className={`mb-4 text-center sm:text-start duration-150 ease-linear
              font-bold text-lg capitalize text-slate-500 hover:text-slate-800
              hover:-translate-y-0.5 tracking-wider`}
            style={{ fontFamily: "Comfortaa" }}
            href="#"
          >
            Privacy Policy
          </a>
          <p
            className={`mb-4 text-center sm:text-start duration-150 ease-linear
              font-bold text-base capitalize text-slate-500 
              tracking-wider`}
            style={{ fontFamily: "Comfortaa" }}
          >
            &copy; 2023 NAT. All Rights Reserved. Developed by{" "}
            <a
              href="https://semicode-eg.com"
              className="hover:text-slate-800 hover:-translate-y-0.5"
              rel="noreferrer"
              target="_blank"
            >
              SemiCode
            </a>
            .
          </p>
          <a
            className={`mb-4 text-center sm:text-start duration-150 ease-linear
              font-bold text-lg capitalize text-slate-500 hover:text-slate-800
              hover:-translate-y-0.5 tracking-wider`}
            style={{ fontFamily: "Comfortaa" }}
            href="#"
          >
            Terms and Conditions
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
