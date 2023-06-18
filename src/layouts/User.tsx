import React from 'react';
import { Outlet } from "react-router";

const User: React.FC = () => {
  return (
    <div style={{background: "pink"}}>
      <h1> USER !!! </h1>
      <Outlet />
    </div>
  );
};

export default User;
