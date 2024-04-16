import "../resources/default-layout.css";
import { useNavigate } from "react-router-dom";
import { FiHome, FiFileText, FiSettings } from "react-icons/fi";
import logo from "../../public/logo.svg";
import AvatorComponent from "./AvatorComponent";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "../components/ui/sheet";
import { BiMenu } from "react-icons/bi";

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

const SheetComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="flex md:hidden light:bg-white dark:bg-background border-b py-3 px-[10px] md:px-16 ">
      <div className="flex justify-between w-full items-center">
        <div className="">
          {/* <BiMenu className="w-8 h-8 cursor-pointer text-slate-500" /> */}
          <Sheet>
            <SheetTrigger>
              <BiMenu className="w-8 h-8 cursor-pointer text-slate-500" />
            </SheetTrigger>
            <SheetContent side={"left"}>
              <SheetHeader>
                {/* <SheetTitle>Are you absolutely sure?</SheetTitle> */}
                <SheetDescription>
                  <div className="flex flex-col items-start gap-2 justify-start">
                    <div className="flex items-center gap-2 mt-6">
                      <img
                        src={logo}
                        alt="logo"
                        className="w-8 h-8 cursor-pointer"
                        onClick={() => {
                          navigate("/home");
                        }}
                      />
                      <span
                        className="text-2xl font-bold text-blue-600 dark:text-slate-400 tracking-wider  cursor-pointer"
                        onClick={() => {
                          navigate("/home");
                        }}
                      >
                        InvoiceFy
                      </span>
                    </div>

                    <div className=" text-base flex flex-col items-center font-medium w-full mt-2">
                      {/* activate the menu as its path */}
                      {paths.map((path, index) => (
                        <div
                          key={index}
                          className={`cursor-pointer flex items-start border-b py-3 w-full flex-col-reverse ${
                            (path.path === "/home" ||
                              path.path === "/dashboard") &&
                            (window.location.pathname === "/home" ||
                              window.location.pathname === "/dashboard")
                              ? "text-primary border-primary font-bold"
                              : window.location.pathname === path.path
                              ? "text-primary border-primary font-bold"
                              : "text-slate-500 dark:text-slate-400 "
                          }`}
                          onClick={() => {
                            navigate(path.path);
                          }}
                        >
                          {path.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <AvatorComponent />
    </div>
  );
};

export default SheetComponent;
