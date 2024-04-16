import React from "react";
import { Cloud, File, Ghost, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Dropzone from "react-dropzone";

const UploadDropzone = () => {
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);

  const progressFunc = () => {
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 5;
      });
    }, 500);

    return interval;
  };

  return (
    <Dropzone
      multiple={false}
      onDrop={async (_acceptedFiles) => {
        setIsUploading(true);
        const progressInterval = progressFunc();

        // Handle File uploading
        await new Promise((resolve) => setTimeout(resolve, 1500));

        if (progressInterval) {
          clearInterval(progressInterval);
          setUploadProgress(100);
        }
      }}
    >
      {({ getRootProps, acceptedFiles }) => (
        <section>
          <div
            {...getRootProps()}
            className="border h-64 m-4 border-dashed border-gray-500 rounded-lg"
          >
            <div className="flex items-center justify-center h-full w-full bg-zinc-200 hover:bg-zinc-3  00">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center pt-5 pb-6 "
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Cloud className="h-6 w-6 text-zinc-500 mb-2" />
                  <p className="mb-2 text-sm text-zinc-700">
                    <span className="font-bold">
                      Drag and drop or click to upload
                    </span>
                  </p>
                  <p className="text-xs text-zinc-500">PDF (upto 4MB)</p>
                </div>

                {acceptedFiles && acceptedFiles[0] ? (
                  <div className="flex items-center bg-white border border-zinc-100 px-2 mx-2 max-w-xs">
                    <div>
                      <File className="h-4 w-4 text-[#ef4444]" />
                    </div>
                    <div className="p-2 text-sm truncate">
                      {acceptedFiles[0].name}
                    </div>
                  </div>
                ) : null}

                {isUploading ? (
                  <div className="w-full mt-4 max-w-xs mx-auto">
                    <Progress
                      value={uploadProgress}
                      className="w-full h-1 bg-zinc-100 text-[#ef4444]"
                    />
                  </div>
                ) : null}
              </label>
            </div>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

const Dashboard = () => {
  return (
    <div>
      <div className="py-10 flex flex-col px-20">
        <div className="flex justify-between items-center">
          <h1 className="font-bold  text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            My Files
          </h1>
          <div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="bg-[#ef4444] text-white font-bold p-2 rounded"
                  variant="outline"
                >
                  Upload PDF
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="p-2 flex flex-col">
                <AlertDialogFooter className="h-5">
                  <AlertDialogCancel className="border-none">
                    <X size={20} />
                  </AlertDialogCancel>
                </AlertDialogFooter>
                <UploadDropzone />
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
      <div className="py-10 flex flex-col justify-between items-center">
        <Ghost />
        <p className="font-bold">Pretty empty around here</p>
        <p>Lets upload your first pdf.</p>
      </div>
    </div>
  );
};

export default Dashboard;
