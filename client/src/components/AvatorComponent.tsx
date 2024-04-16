import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FiLogOut } from "react-icons/fi";
import { BiUserCircle, BiMailSend, BiLockAlt } from "react-icons/bi";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useUserInfo } from "../store/invoice";
import { userProfileStore } from "../store/model";

const AvatorComponent = () => {
  const { user } = useUserInfo();
  const { setOpenUserProfileModal } = userProfileStore();
  //   const { setTheme, themes, theme } = useTheme();
  const navigate = useNavigate();

  const avatar = user?.profilePicture;

  let initials = "";
  if (user?.username) {
    const words = user.username.split(/\s+/);

    if (words.length > 0) {
      initials = words
        .slice(0, 2)
        .map((word: string) => word.charAt(0).toUpperCase())
        .join("");
    }
  }

  return (
    <>
      <div className="flex items-center justify-end gap-x-5 w-full ">
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="dark:bg-background border-[.6px] dark:border-slate-700 "
          >
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 dark:text-white" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] dark:text-white rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="border-[.7px] dark:border-slate-700"
          >
            <DropdownMenuItem
              //   onClick={() => setTheme("light")}
              className="cursor-pointer"
            >
              Light
            </DropdownMenuItem>
            <DropdownMenuItem
              //   onClick={() => setTheme("dark")}
              className="cursor-pointer"
            >
              Dark
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center dark:text-slate-400 ">
          <div className="flex items-center dark:text-slate-400 rounded-md ">
            <DropdownMenu>
              <DropdownMenuTrigger className="">
                <div className=" border-slate-400 border-[1px] dark:border-slate-600 dark:border-[1px] rounded-full p-[1.4px]">
                  <Avatar>
                    {avatar ? (
                      <AvatarImage src={avatar} alt="avatar" />
                    ) : (
                      <AvatarFallback>{initials}</AvatarFallback>
                    )}
                  </Avatar>{" "}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full min-w-56 border-[.7px] dark:border-slate-700">
                <DropdownMenuItem
                  onClick={() => {
                    setOpenUserProfileModal(true);
                  }}
                  className="flex cursor-pointer items-center text-slate-600 dark:text-slate-400 gap-1"
                >
                  <BiUserCircle className="w-8 h-8 text-slate-500 " />
                  <div className="flex flex-col gap-1">
                    <span className=" ">{user && user?.username}</span>
                    <span className="text-xs">{user && user?.email}</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate("/updateEmail")}
                  className="flex gap-1 cursor-pointer items-center text-slate-600 dark:text-slate-400"
                >
                  <BiMailSend className="w-6 font-bold text-lg" />
                  <span> Update Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/updatePassword")}
                  className="flex gap-1 cursor-pointer items-center text-slate-600 dark:text-slate-400"
                >
                  <BiLockAlt className="w-6 font-bold text-lg" />
                  <span>Edit Password</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    message.loading("Logging out...", 0.5);
                    setTimeout(() => {
                      message.success("You Logged Out Successfully");
                      localStorage.removeItem("token");
                      navigate("/login");
                      // setTheme("light");
                    }, 500);
                  }}
                  className="flex gap-1 cursor-pointer items-center text-slate-600 dark:text-slate-400"
                >
                  <FiLogOut className="w-6 font-bold text-lg" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
};

export default AvatorComponent;
