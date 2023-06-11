import React from 'react';
import { Link } from "react-router-dom";
import { Outlet } from "react-router";
import { routes } from "router/routes";

const User: React.FC = () => {
  return (
    <div>
      <h1> USER !!! </h1>
      <nav>
        <ul>
          {routes.map((route) => (
            <li key={route.path}>
              <Link to={route.path}>{route.path}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
};

export default User;
