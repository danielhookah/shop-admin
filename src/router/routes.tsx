import Home from "views/Home";
import NotFound from "views/NotFound";
import Guest from "layouts/Guest";
import User from "layouts/User";
import Login from "views/Login";
import Register from "views/Register";

interface RouteConfig {
  path: string;
  element: JSX.Element;
  children?: RouteConfig[];
}

export const routes: RouteConfig[] = [
  {
    path: "/", element: <Guest />, children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    path: "/app", element: <User />, children: [
      { path: "home", element: <Home /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
