import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MoveRight } from "lucide-react";
import { Check } from "lucide-react";
import { Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Pricing() {
  let user: any = localStorage.getItem("user");

  if (!null) {
    user = JSON.parse(user);
  }

  function FreeCard() {
    const navigate = useNavigate();

    return (
      <Card className="flex flex-col w-full md:w-[380px] text-center">
        <CardHeader>
          <CardTitle className="font-bold text-3xl">Free</CardTitle>
          <CardDescription>For small side projects.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <CardTitle className="font-bold text-6xl">$0</CardTitle>
          <CardDescription>per month.</CardDescription>
          <Separator className="my-2" />
          <CardDescription className="font-semibold text-lg">
            10 PDFs/month included.
          </CardDescription>
          <Separator className="my-2" />

          <div className="text-left">
            <div className="flex items-center gap-2 font-semibold py-1">
              <Check size={18} color="#ef4444" />
              <p className="text-md text-[#6b7280] font-semibold">
                5 Pages per PDF.
              </p>
            </div>
            <div className="flex items-center gap-2 font-semibold py-1">
              <Check size={18} color="#ef4444" />
              <p className="text-md text-[#6b7280] font-semibold">
                4 MB File size limit.
              </p>
            </div>
            <div className="flex items-center gap-2 font-semibold py-1">
              <Check size={18} color="#ef4444" />
              <p className="text-md text-[#6b7280] font-semibold">
                Mobile Friendly Interface.
              </p>
            </div>
            <div className="flex items-center gap-2 font-semibold py-1 opacity-50">
              <Minus size={18} color="#ef4444" />
              <p className="text-md text-[#6b7280] font-semibold">
                High quality responses.
              </p>
            </div>
            <div className="flex items-center gap-2 font-semibold py-1 opacity-50">
              <Minus size={18} color="#ef4444" />
              <p className="text-md text-[#6b7280] font-semibold">
                Priority Support.
              </p>
            </div>
          </div>
        </CardContent>
        {!user ? (
          <>
            {" "}
            <CardFooter>
              <Button className="w-full bg-[#e5e7eb] text-black hover:bg-[#d1d5db]">
                <div
                  className="flex items-center justify-center gap-2"
                  onClick={() => navigate("/sign-in")}
                >
                  <span>Sign In</span>
                  <span>
                    <MoveRight />
                  </span>
                </div>
              </Button>
            </CardFooter>
          </>
        ) : null}
      </Card>
    );
  }

  function PremiumCard() {
    const navigate = useNavigate();

    return (
      <Card className="flex flex-col w-full md:w-[380px] text-center border-2 border-[#ef4444]">
        <CardHeader>
          <CardTitle className="font-bold text-3xl">Premium</CardTitle>
          <CardDescription>
            For larger projects with greater needs.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <CardTitle className="font-bold text-6xl">$14</CardTitle>
          <CardDescription>per month.</CardDescription>
          <Separator className="my-2" />
          <CardDescription className="font-semibold text-lg">
            50 PDFs/month included.
          </CardDescription>
          <Separator className="my-2" />
          <div className="text-left">
            <div className="flex items-center gap-2 font-semibold py-1">
              <Check size={18} color="#ef4444" />
              <p className="text-md text-[#6b7280] font-semibold">
                25 Pages per PDF.
              </p>
            </div>
            <div className="flex items-center gap-2 font-semibold py-1">
              <Check size={18} color="#ef4444" />
              <p className="text-md text-[#6b7280] font-semibold">
                16 MB File size limit.
              </p>
            </div>
            <div className="flex items-center gap-2 font-semibold py-1">
              <Check size={18} color="#ef4444" />
              <p className="text-md text-[#6b7280] font-semibold">
                Mobile Friendly Interface.
              </p>
            </div>
            <div className="flex items-center gap-2 font-semibold py-1">
              <Check size={18} color="#ef4444" />
              <p className="text-md text-[#6b7280] font-semibold">
                High quality responses.
              </p>
            </div>
            <div className="flex items-center gap-2 font-semibold py-1">
              <Check size={18} color="#ef4444" />
              <p className="text-md text-[#6b7280] font-semibold">
                Priority Support.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-[#ef4444] text-white hover:bg-[#ef4444]">
            <div
              className="flex items-center justify-center gap-2"
              onClick={() =>
                user ? navigate("/stripe") : navigate("/sign-in")
              }
            >
              <span className="text-white">Upgrade</span>
              <span>
                <MoveRight />
              </span>
            </div>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center p-6">
      <div className="flex flex-col items-center justify-center">
        <div className="text-4xl md:text-5xl lg:text-6xl mb-8">
          <h1 className="font-bold">Pricing</h1>
        </div>

        <div className="mb-10">
          <p className="text-gray-500 max-w-[500px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] font-semibold text-sm md:text-md lg:text-lg">
            Whether you're just trying out our service or need more, we've got
            you covered!
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
        <FreeCard />
        <PremiumCard />
      </div>
    </div>
  );
}

export default Pricing;
