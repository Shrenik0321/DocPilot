import { useLocation, Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

const PrivateRoute = () => {
  const cookies = new Cookies();
  const token = cookies.get("jwt");
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorised" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
