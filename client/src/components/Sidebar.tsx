import  { useState, useEffect } from "react";
import "../resources/default-layout.css";
import { useNavigate } from "react-router-dom";

import { message } from "antd";
import { FiLogOut, FiHome, FiFileText, FiSettings } from "react-icons/fi";
import logo from "../../public/logo.svg";

// import { useTheme } from "next-themes";

const Sidebar = () => {
  //   const { setTheme } = useTheme();
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePathChange = () => {
      setActivePath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePathChange);

    return () => {
      window.removeEventListener("popstate", handlePathChange);
    };
  }, []);

  const handleItemClick = (path: any) => {
    setActivePath(path);
    navigate(path);
  };

  const paths = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FiHome className="text-lg" />,
    },
    {
      name: "Invoice",
      path: "/invoice",
      icon: <FiFileText className="text-lg" />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <FiSettings className="text-lg" />,
    },
  ];
  return (
    <div>
      <div className="hidden md:block sticky top-0  border-r min-w-60 min-h-screen dark:bg-background dark:border-r-none ">
        <div className="flex flex-col gap-y-4 relativeh-full">
          <div className="flex items-center justify-center gap-2 py-4 mt-2">
            <img
              src={logo}
              alt="logo"
              className="w-7 h-7 cursor-pointer -mt-1"
              onClick={() => {
                navigate("/dashboard");
              }}
            />
            <span
              className="text-xl font-bold text-primary tracking-wide pr-4 cursor-pointer"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              InvoiceFy
            </span>
          </div>
          <div className="flex flex-col gap-y-2 mt-2">
            {paths.map((path, index) => (
              <div
                key={index}
                className={`cursor-pointer flex items-center font-light mx-3 gap-3 py-2 px-2 ${
                  (path.path === "/dashboard" && activePath === "/dashboard") ||
                  activePath === path.path
                    ? "text-white bg-primary dark:bg-primary dark:text-slate-600 rounded-md font-light"
                    : "text-slate-600 dark:text-slate-400 font-light hover:bg-primary/10 rounded-md  hover:dark:text-slate-600 "
                }`}
                onClick={() => handleItemClick(path.path)}
              >
                {path.icon}
                {path.name}
              </div>
            ))}
          </div>{" "}
          {/* log out button */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer  text-slate-600  dark:text-slate-400 -mt-3">
            <FiLogOut className="text-lg ml-1" />
            <span
              className="text-base font-light"
              onClick={() => {
                message.loading("Logging out...", 0.5);
                setTimeout(() => {
                  message.success("You Logged Out Successfully");
                  localStorage.removeItem("token");
                  navigate("/login");
                  // setTheme("light");
                }, 500);
              }}
            >
              Log out
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
