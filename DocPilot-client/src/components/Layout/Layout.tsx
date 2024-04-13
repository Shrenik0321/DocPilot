import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import "../../index.css";

const Layout = () => {
  return (
    <div className="min-h-screen pb-10 relative">
      <div className="absolute inset-0 grainy overflow-auto">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
