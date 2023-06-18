import React, { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => !!state.auth.token,
  );
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
