import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoveRight, Menu } from "lucide-react";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="sticky">
      <div className="flex items-center justify-between px-2 md:px-6 lg:px-8 xl:px-12 py-2 bg-white">
        <div className="flex items-center font-semibold">
          <p>DocPilot</p>
        </div>

        <div className="sm:hidden px-2">
          <Button onClick={() => setShowMenu(!showMenu)}>
            <Menu />
          </Button>
        </div>

        <div className="hidden sm:flex items-center sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 font-semibold">
          <p>Pricing</p>
          <p>Sign In</p>
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

export default Header;
