import React, { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const GuestRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => !!state.auth.token,
  );
  // const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to="/app" replace />;
  }

  return children;
};

export default GuestRoute;
