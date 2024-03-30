import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-[#e5e7eb] min-h-screen pb-10">
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
