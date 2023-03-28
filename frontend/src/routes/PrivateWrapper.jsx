import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { context_Auth } from "../Api/AuthContext";

const PrivateWrapper = () => {
  const { user } = useContext(context_Auth);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateWrapper;
