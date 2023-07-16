import { Route, Routes } from "react-router-dom";
import Guest from "layouts/Guest";
import Home from "views/Home";
import Login from "views/Login";
import Register from "views/Register";
import User from "layouts/User";
import NotFound from "views/NotFound";
import PrivateRoute from "./PrivateRoute";
import GuestRoute from "./GuestRoute";
import ProductList from "views/ProductList";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route key="/" path="/" element={
        <GuestRoute>
          <Guest />
        </GuestRoute>
      }>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route key="/app" path="/app" element={
        <PrivateRoute>
          <User />
        </PrivateRoute>
      }>
        <Route index element={<ProductList />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
