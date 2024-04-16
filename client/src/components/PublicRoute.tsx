import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PublicRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  if (localStorage.getItem("token")) {
    return null;
  }

  return <div className="register m-0 p-0">{children}</div>;
}

export default PublicRoute;
