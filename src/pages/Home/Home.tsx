import { Button, buttonVariants } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

const Home = () => {
  return (
    <div className="pt-20 flex flex-col justify-center items-center">
      <div className="mb-8 text-center">
        <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          <h1 className="font-bold">
            Chat with your <span className="text-[#ef4444]">documents</span>
          </h1>
          <span className="font-bold">in seconds.</span>
        </div>
        <div className="my-5 flex justify-center">
          <p className="text-gray-500 max-w-[500px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] font-semibold text-sm md:text-md lg:text-lg xl:text-xl">
            Quill allows you to have conversations with any PDF document. Simply
            upload your file and start asking questions right away.
          </p>
        </div>

        <Button
          className={buttonVariants({
            size: "lg",
            className: "bg-[#ef4444]",
          })}
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-white">Get Started</span>
            <span>
              <MoveRight />
            </span>
          </div>
        </Button>
      </div>

      <div>
        <div className="rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
          <img
            src="/src/assets/dashboard-preview.jpg"
            alt="PDF Image"
            className="w-full h-auto lg:w-[1000px] lg:h-[750px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
