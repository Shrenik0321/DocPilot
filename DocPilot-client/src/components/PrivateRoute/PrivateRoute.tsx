import { useLocation, Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const user = localStorage.getItem("user");
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorised" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
