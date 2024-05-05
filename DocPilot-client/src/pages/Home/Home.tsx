import { Button, buttonVariants } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  let user: any = localStorage.getItem("user");

  return (
    <div className="pt-20 flex flex-col px-8">
      <div className="mb-10 text-center">
        <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          <h1 className="font-bold">
            Chat with your <span className="text-[#ef4444]">documents</span>
          </h1>
          <span className="font-bold">in seconds.</span>
        </div>

        <div className="my-5 flex justify-center">
          <p className="text-gray-500 max-w-[500px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] font-semibold text-sm md:text-md lg:text-lg xl:text-xl">
            DocPilot allows you to have conversations with any PDF document.
            Simply upload your file and start asking questions right away.
          </p>
        </div>

        <Button
          className={buttonVariants({
            size: "lg",
            className:
              "bg-[#ef4444] hover:bg-[#ef4444] hover:text-lg hover:p-6",
          })}
        >
          <div
            className="flex items-center justify-center gap-2"
            onClick={() => navigate(user ? "/dashboard" : "/sign-in")}
          >
            <span className="text-white">Get Started</span>
            <span>
              <MoveRight />
            </span>
          </div>
        </Button>
      </div>

      <div className="my-10 flex justify-center items-center">
        <div className="rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
          <img
            src="/src/assets/dashboard-preview.jpg"
            alt="PDF Image"
            className="w-full h-auto lg:w-[1000px] lg:h-[600px]"
          />
        </div>
      </div>

      <div className="my-10 flex flex-col justify-center sm:items-center">
        <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          <h1 className="font-bold">start chatting in minutes</h1>
        </div>

        <div className="my-5">
          <p className="text-gray-500 max-w-[500px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] font-semibold text-sm md:text-md lg:text-lg xl:text-xl">
            Chatting with your pdf has never been easy with DocPilot.
          </p>
        </div>
      </div>

      <div className="my-10 flex flex-col justify-center md:items-center">
        <div className="grid md:grid-cols-3 gap-7">
          <div className="max-w-full md:max-w-[300px] md:border-t border-gray-400 pt-5">
            <p className="text-[#ef4444] font-semibold">Step 1</p>
            <h1 className="text-2xl font-semibold">Sign up for an account</h1>
            <p className="text-gray-500 mt-2">
              Start out with a free plan or choose our pro plan
            </p>
          </div>
          <div className="max-w-full md:max-w-[300px]  md:border-t border-gray-400 pt-5">
            <p className="text-[#ef4444] font-semibold">Step 2</p>
            <h1 className="text-2xl font-semibold">Upload your pdf file</h1>
            <p className="text-gray-500 mt-2">
              We&apos;ll process your file and make it ready for you to chat
              with.
            </p>
          </div>
          <div className="max-w-full md:max-w-[300px] md:border-t border-gray-400 pt-5">
            <p className="text-[#ef4444] font-semibold">Step 3</p>
            <h1 className="text-2xl font-semibold">
              Starting asking questions
            </h1>
            <p className="text-gray-500 mt-2">
              It&apos;s that simple. Try out DocPilot today - it really takes
              less than a minute.
            </p>
          </div>
        </div>
      </div>

      <div className="my-10 flex justify-center items-center">
        <div className="rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
          <img
            src="/src/assets/file-upload-preview.jpg"
            alt="PDF Image"
            className="w-full h-auto lg:w-[1000px] lg:h-[500px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
