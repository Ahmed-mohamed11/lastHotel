import { useEffect, useState, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import "./App.scss";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Login from "./pages/auth/login/Login";
import { AdminPages } from "./route/Index";
import { useI18nContext } from "./context/i18n-context";

import CryptoJS from "crypto-js";






function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("isDarkMode") === "true" || false
  );
  const [reloadPage, setReloadPage] = useState(false);

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const { language } = useI18nContext();


  const decryptFromSessionStorage = () => {
    const secretKey = "s3cr3t$Key@123!";
    const encryptedValue = sessionStorage.getItem("token");

    console.log("Encrypted Value:", encryptedValue); // لطباعة القيمة المشفرة

    if (!encryptedValue) {
      console.error("No token found in sessionStorage");
      return null;
    }

    try {
      // إزالة بادئة OpenSSL
      const encryptedWithoutPrefix = encryptedValue.slice(10); // إزالة أول 10 أحرف (U2FsdGVkX1)

      // فك تشفير Base64
      const decryptedData = CryptoJS.AES.decrypt(CryptoJS.enc.Base64.parse(encryptedWithoutPrefix), secretKey);

      // تحويل النتيجة إلى نص
      const decryptedValue = decryptedData.toString(CryptoJS.enc.Utf8);

      console.log("Decrypted Value:", decryptedValue); // لطباعة القيمة المفككة

      if (!decryptedValue) {
        console.error("Decryption successful but resulted in empty string");
        return null;
      }

      return decryptedValue;
    } catch (error) {
      console.error("Error during decryption:", error);
      return null;
    }
  };

  // دالة للتشفير
  const encryptAndStore = (value) => {
    const secretKey = "s3cr3t$Key@123!";
    const encryptedValue = CryptoJS.AES.encrypt(value, secretKey).toString();
    sessionStorage.setItem("token", encryptedValue);
  };

  // مثال للاستخدام
  encryptAndStore("your_secret_value"); // استخدم قيمة بسيطة
  const decryptedValue = decryptFromSessionStorage();
  console.log("Decrypted Value:", decryptedValue); // يجب أن تطبع "your_secret_value"



  const token = decryptFromSessionStorage("token");
  // console.log(token);

  useEffect(() => {
    if (!token) {
      // sessionStorage.clear();
      navigate(`${import.meta.env.VITE_PUBLIC_URL}/login`);
    }
  }, [navigate, token]);


  const handleLogin = useCallback(() => {
    navigate(`${import.meta.env.VITE_PUBLIC_URL}/`);
    localStorage.setItem("currentPath", `${import.meta.env.VITE_PUBLIC_URL}/`);
    // setReloadPage(true);
  }, [navigate, token]);

  const handleLogout = useCallback(() => {
    sessionStorage.clear();
    localStorage.removeItem("id");
    navigate(`${import.meta.env.VITE_PUBLIC_URL}/login`);
    localStorage.setItem("currentPath", `${import.meta.env.VITE_PUBLIC_URL}/`);
  }, [navigate]);

  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [navigate]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("isDarkMode", !isDarkMode);
  };

  const returnPath = (path) => {
    localStorage.setItem("currentPath", `/${path}`);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleWindowResize = () => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  };

  useEffect(() => {
    if (reloadPage) {
      window.location.reload();
      setReloadPage(false);
    }
  }, [reloadPage]);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    handleWindowResize();

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div
      className={`${isDarkMode ? "dark" : "light"}`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <Routes>
        <Route
          path={`${import.meta.env.VITE_PUBLIC_URL}/login`}
          element={
            <>
              <div className="bg-gray-900 space-y-9 overflow-x-hidden">
                {loading && (
                  <div className="flex justify-center items-center gap-14 h-screen w-full fixed z-50 dark:bg-gray-900 bg-white">
                    <div className="dot-spin"></div>
                    <p className="text-lg font-medium dark:text-white">
                      جاري التحميل ... كن صبورًا
                    </p>
                  </div>
                )}
                <Login
                  navigate={navigate}
                  loading={setLoading}
                  onLogIn={handleLogin}
                />
              </div>
            </>
          }
        />
        <Route
          path="/*"
          element={
            <div className="flex">
              <div
                className={`w-full md:w-3/12 lg:w-2/12 sm:relative sm:top-0 
              fixed top-16 h-screen bg-gray-100 duration-300 ease-linear z-40 ${isSidebarOpen ? "left-0" : "sm:hidden -left-full"
                  }`}
              >
                <Sidebar
                  isSidebarOpen={isSidebarOpen}
                  closeSidebar={toggleSidebar}
                  onLogout={handleLogout}
                  dark={isDarkMode}
                />
              </div>
              <div
                className={`${isSidebarOpen
                  ? "w-full sm:w-9/12 md:w-9/12 lg:w-10/12"
                  : "w-full"
                  } dark:bg-gray-900 bg-white overflow-x-hidden`}
              >
                <div
                  className="h-screen w-full items-center
                    justify-center bg-cover bg-no-repeat"
                >
                  <Routes>
                    <Route
                      path="/*"
                      element={
                        <>
                          {loading && (
                            <div className="flex justify-center items-center gap-14 h-screen w-full fixed z-50 dark:bg-gray-900 bg-white">
                              <div className="dot-spin"></div>
                              <p className="text-lg font-medium dark:text-white">
                                جاري التحميل ... كن صبورًا
                              </p>
                            </div>
                          )}
                          <Navbar
                            onLogOut={handleLogout}
                            toggleDark={toggleDarkMode}
                            dark={isDarkMode}
                            returnPath={returnPath}
                            toggleSidebar={toggleSidebar}
                            isSidebarOpen={isSidebarOpen}
                            token={token}
                          />
                          <div className="pt-0 px-4">
                            <Routes>
                              {/* Secured routes */}
                              <Route
                                path="/*"
                                element={<AdminPages loading={setLoading} />}
                              />

                            </Routes>
                          </div>
                        </>
                      }
                    />
                  </Routes>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
