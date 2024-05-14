import React from "react";
import { Cloud, File } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Dropzone from "react-dropzone";
import { uploadFile } from "@/api/uploadFile";
import { useNavigate } from "react-router-dom";

const UploadDropzone = () => {
  const [isUploading, setIsUploading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const navigate = useNavigate();

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

  const handleFileUpload = async (acceptedFiles: any) => {
    setIsUploading(true);
    const progressInterval = progressFunc();

    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    const fileSize = acceptedFiles[0].size;

    if (fileSize > 4 * 1024 * 1024) {
      setIsUploading(false);
      setErrorMessage("File Size Exceeded 4MB limit.");
      return;
    }

    try {
      const response = await uploadFile(formData);
      if (progressInterval && response?.status === 200) {
        clearInterval(progressInterval);
        setUploadProgress(100);
        navigate("/chat", { state: { data: response.data.data } });
      }
    } catch (error) {
      setErrorMessage("Error uploading file.");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dropzone multiple={false} onDrop={handleFileUpload}>
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
                ) : (
                  <div className="text-[#ef4444] text-sm p-2">
                    <p>{errorMessage}</p>
                  </div>
                )}
              </label>
            </div>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default UploadDropzone;
