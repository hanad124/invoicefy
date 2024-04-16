import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../apicalls/users";
import { message } from "antd";
import { userStore } from "../store/userStore";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { setData } = userStore();

  // get token from local storage
  const token = localStorage.getItem("token");

  const getData = async () => {
    try {
      const response = await getUserInfo({
        token: token,
      });
      if (response.success) {
        setData(response.data);
        setTimeout(() => {
          // dispatch(getUserDetails(response.data));
        }, 500);
      } else {
        setTimeout(() => {
          message.error(response.message);
        }, 500);
      }
    } catch (error: any) {
      setTimeout(() => {
        message.error(error.message);
      }, 500);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getData();
    }
  }, []);

  if (!localStorage.getItem("token")) {
    return null;
  }
  return <div>{children}</div>;
}

export default ProtectedRoute;
