import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoveRight, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="sticky bg-white opacity-[.95] top-0 z-50 shadow-md">
      <div className="flex items-center justify-between px-2 md:px-6 lg:px-8 xl:px-12 py-2 bg-white">
        <div className="flex items-center font-semibold">
          <p>DocPilot</p>
        </div>

        <div className="sm:hidden px-2">
          <Button onClick={() => setShowMenu(!showMenu)}>
            <Menu />
          </Button>
        </div>

        <div className="hidden sm:flex items-center gap-4 font-semibold">
          <Button variant="secondary">
            <div>Pricing</div>
          </Button>
          <Button variant="secondary" onClick={() => navigate("/sign-in")}>
            <div>Sign in</div>
          </Button>
          <Button className="bg-[#ef4444]">
            <div className="flex items-center gap-2">
              <span>Get Started</span>
              <span>
                <MoveRight />
              </span>
            </div>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
