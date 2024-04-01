import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignIn = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader className="flex justify-center items-center">
          <CardTitle className="font-bold">Login</CardTitle>
          <CardDescription className="font-semibold text-[#ef4444]">
            Login to account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input id="name" placeholder="User Email" />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password</Label>
                <Input id="name" placeholder="User Password" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <Button className="w-full">Login</Button>
          <div className="mt-2 text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/sign-up" className="text-[#ef4444]">
              Sign up
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
