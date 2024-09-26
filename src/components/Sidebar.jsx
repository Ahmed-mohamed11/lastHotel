import { useState, useEffect } from "react";
import {
  House,
  SketchLogo,
  UserCircleGear,
  Warning,
  Users,
  Kanban,
  CardsThree,
  Airplay,
  CaretDown,
  ProjectorScreenChart,
} from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";
import LogoWideLight from "../images/logoWide-light.png";
import LogoWideDark from "../images/logoWide-dark.png";
import { useI18nContext } from "../context/i18n-context";
import api from "../ApiUrl";
import CryptoJS from "crypto-js";

const SidebarItem = ({
  icon,
  name,
  link,
  onClick,
  subItems,
  subItemsClick,
  isOpen,
  toggleSubMenu,
}) => {
  const location = useLocation();
  const isActive =
    location.pathname === link ||
    (subItems && subItems.some((sub) => location.pathname === sub.link));

  const handleClick = () => {
    if (subItems) {
      toggleSubMenu();
    } else {
      onClick();
    }
  };

  return (
    <div>
      <Link
        to={link}
        onClick={handleClick}
        className={classNames(
          isActive
            ? "bg-gradient-to-r from-themeColor-500 to-gray-900 text-white"
            : "text-sky-950 dark:text-white hover:bg-gradient-to-r hover:from-themeColor-500",
          "py-1.5 px-4 text-sm font-medium rounded-md flex items-center justify-between gap-2 duration-150 ease-linear cursor-pointer"
        )}
      >
        <div className="flex items-center gap-2">
          {icon}
          {name}
        </div>
        {subItems && (
          <div
            className={`transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
          >
            <CaretDown size={20} />
          </div>
        )}
      </Link>

      {subItems && (
        <div
          className={`ml-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-40" : "max-h-0"}`}
        >
          <div className="mt-2 space-y-1">
            {subItems.map((subItem, index) => {
              const isSubItemActive = location.pathname === subItem.link;
              return (
                <Link
                  key={index}
                  to={subItem.link}
                  onClick={subItemsClick}
                  className={classNames(
                    isSubItemActive
                      ? "bg-gradient-to-r from-gray-900 to-themeColor-500 text-white"
                      : "text-sky-950 dark:text-white hover:bg-gradient-to-r hover:from-themeColor-500",
                    "py-1.5 px-4 text-base font-medium rounded-md flex gap-3"
                  )}
                >
                  <CardsThree size={20} />
                  {subItem.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ isSidebarOpen, closeSidebar, dark }) {
  const { t } = useI18nContext();
  const initialPath =
    localStorage.getItem("currentPath") ||
    `${import.meta.env.VITE_PUBLIC_URL}/`;

  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  const toggleSubMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

 
 

  const navigation = [
    {
      icon: <House size={25} />,
      name: "sideBar.dashboard",
      link: `${import.meta.env.VITE_PUBLIC_URL}/`,
    },
    {
      icon: <UserCircleGear size={25} />,
      name: "sideBar.rooms",
      link: `${import.meta.env.VITE_PUBLIC_URL}/rooms`,
    },
    
    {
      icon: <Warning size={25} />,
      name: "sideBar.error",
      link: "/*",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(
    navigation.findIndex((item) => item.link === initialPath)
  );

  const handleItemClick = (index, link) => {
    setActiveIndex(index);
    localStorage.setItem("currentPath", link);
    if (window.innerWidth <= 768) {
      closeSidebar();
    }
  };

  return (
    <div className="flex h-screen dark:bg-gray-900 bg-gray-50 border-r border-gray-200 dark:border-gray-800 dark:shadow-xl overflow-y-auto">
      <nav
        className={`flex flex-col w-full dark:bg-gray-900 bg-gray-50 ${isSidebarOpen ? "block" : "hidden"}`}
      >
        <div className="flex py-2 pt-4 items-center justify-center h-16 z-20">
          <img
            className="h-8 w-auto"
            src={dark ? LogoWideLight : LogoWideDark}
            alt="Logo"
          />
        </div>
        <div className="flex-grow p-4">
          <div className="flex flex-col space-y-4">
            {navigation.map((item, index) => (
              <SidebarItem
                key={index}
                icon={item.icon}
                name={t(item.name)}
                link={item.link}
                subItems={item.subItems}
                isOpen={openMenuIndex === index}
                toggleSubMenu={() => toggleSubMenu(index)}
                subItemsClick={() => {
                  if (window.innerWidth <= 768) {
                    closeSidebar();
                  }
                }}
                onClick={() => {
                  handleItemClick(index, item.link);
                  if (window.innerWidth <= 768) {
                    closeSidebar();
                  }
                  toggleSubMenu(null);
                }}
              />
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
