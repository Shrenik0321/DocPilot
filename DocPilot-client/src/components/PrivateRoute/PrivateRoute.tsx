import { verifyToken } from "@/utils/utilities";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const userStr: string | null = localStorage.getItem("user");
  const user = verifyToken(userStr);
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorised" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
