import { Fragment,  useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { List, Bell, X, Moon, Sun, Translate } from "@phosphor-icons/react";
 import UserL from "../assets/userLight.svg";
import UserD from "../assets/userDark.svg";
import { useI18nContext } from "../context/i18n-context";

import api from "../ApiUrl";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({
  onLogOut,
  toggleDark,
  dark,
  returnPath,
  onToggle,
  toggleSidebar,
  isSidebarOpen,
  themeDark,
  LogoWide,
  token
}) {
  const [profilePic, setProfilePic] = useState("");
  const { language, changeLanguage, t } = useI18nContext();

  const handleGetProfile = () => {
    api
      .get(`/Profile`)
      .then((response) => {
        // console.log(response.data.profileImage);
        setProfilePic(response.data.profileImage);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // useEffect(() => {
  //   handleGetProfile();
  // }, []);

  return (
    <div className={`w-full z-10 relative`} dir="rtl">
      <div
        className={`${themeDark ? "bg-gray-900 w-full" : "dark:bg-gray-900 bg-white w-full"
          } shadow-md 
      dark:shadow-xl `}
      >
        <div className="mx-auto">
          <div
            className={`relative flex h-16 items-center ${language === "en" ? "justify-start" : "justify-end"
              }`}
          >
            <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
              <button
                className="relative inline-flex items-center justify-center rounded-md p-2
                md:hidden text-gray-400 hover:bg-gray-700 hover:text-white
                focus:outline-none"
                onClick={toggleSidebar}
              >
                {isSidebarOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <List className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
            <div
              className={`absolute inset-y-0 right-0 flex items-center
              md:static md:inset-auto ${language === "en" ? "md:mr-6 md:pr-0 pr-2" : "md:ml-6 md:pl-0 pl-2"
                }`}
            >
              <button
                type="button"
                className="relative rounded-full dark:bg-gray-900 p-1 ml-1
                dark:text-gray-400 dark:hover:text-white focus:outline-none
                hover:text-slate-500"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                {token && <Bell className="h-6 w-6" aria-hidden="true" />}
              </button>

              <button
                type="button"
                className={`relative rounded-full dark:bg-gray-900 p-1 ml-1
                dark:text-gray-400 dark:hover:text-white focus:outline-none
                hover:text-slate-500 ${themeDark ? "hidden" : ""}`}
                onClick={() => {
                  toggleDark();
                }}
              >
                {dark ? (
                  <>
                    <Sun className="h-6 w-6" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    <Moon className="h-6 w-6" aria-hidden="true" />
                  </>
                )}
              </button>

              <button
                type="button"
                className="relative rounded-full dark:bg-gray-900 p-1 ml-2
                    dark:text-gray-400 dark:hover:text-white focus:outline-none
                    hover:text-slate-500"
                onClick={() => {
                  changeLanguage(language === "en" ? "ar" : "en");
                }}
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <Translate className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="relative mr-3">
                <div>
                  <Menu.Button className="relative flex rounded-full  text-sm border-none">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    {token ? (
                      <img
                        className="h-8 w-8 rounded-full "
                        src={
                          profilePic
                            ? `https://${profilePic}`
                            : dark
                              ? UserL
                              : UserD
                        }
                        alt=""
                      />
                    ) : (
                      <img
                        className="h-8 w-8 rounded-full "
                        src={`${dark ? UserL : UserD}`}
                        alt=""
                      />
                    )}
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  {token ? (
                    <Menu.Items
                      className="absolute -right-20 top-10 z-10 mt-2 w-32
                  origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                            )}
                            onClick={onLogOut}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  ) : (
                    <Menu.Items
                      className="absolute -right-20 top-10 z-10 mt-2 w-32
                  origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/login"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                            onClick={() => returnPath("login")}
                          >
                            Login
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/register"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                            onClick={() => returnPath("register")}
                          >
                            Register
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  )}
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
