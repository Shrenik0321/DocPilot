import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import "../../index.css";

const Layout = () => {
  return (
    <div className="min-h-screen pb-10 grainy">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
