import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CircleUserRound, Menu } from "lucide-react";
import { LogOut } from "lucide-react";
import { Gauge } from "lucide-react";
import { Gem } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  let user: any = localStorage.getItem("user");

  if (!null) {
    user = JSON.parse(user);
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/sign-in");
  };

  return (
    <nav className="sticky bg-white opacity-[.8] top-0 z-50 shadow-md">
      <div className="flex items-center justify-between px-2 md:px-6 lg:px-8 xl:px-12 py-2 bg-white">
        <div className="flex items-center font-semibold">
          <Button
            className="bg-white text-black text-xl hover:bg-white hover:text-[#ef4444]"
            onClick={() => navigate("/")}
          >
            <div>DocPilot</div>
          </Button>
        </div>

        <div
          className="sm:hidden px-2 hover:cursor-pointer"
          onClick={() => setShowMenu(!showMenu)}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                <Gauge className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/pricing")}>
                <Gem className="mr-2 h-4 w-4" />
                <span>Pricing</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {user ? (
          <>
            <div className="hidden sm:flex items-center gap-4 font-semibold">
              <div onClick={handleLogout}>
                <p>{user?.name}</p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <CircleUserRound />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    <Gauge className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/pricing")}>
                    <Gem className="mr-2 h-4 w-4" />
                    <span>Pricing</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        ) : (
          <>
            <div className="hidden sm:flex items-center font-semibold">
              <Button
                className="bg-white text-black hover:bg-white hover:text-[#ef4444]"
                onClick={() => navigate("/pricing")}
              >
                <Gem className="mr-2 h-5 w-5" />
                <div>Pricing</div>
              </Button>

              <Button
                className="bg-white text-black hover:bg-white hover:text-[#ef4444]"
                onClick={() => navigate("/sign-in")}
              >
                <CircleUserRound className="mr-2 h-5 w-5" />
                <div>Sign In </div>
              </Button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
