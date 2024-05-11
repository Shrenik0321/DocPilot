import React from "react";
import { Ghost, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import UploadDropzone from "@/components/UploadDropzone/UploadDropzone";
import { filterPosts } from "@/api/filterPosts";
import Post from "@/components/Post/Post";
import { Plus } from "lucide-react";
import { FileText } from "lucide-react";

const Dashboard = () => {
  const [posts, setPosts] = React.useState([]);

  const fetchPosts = async () => {
    try {
      const response = await filterPosts();
      if (response) {
        setPosts(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="mx-4 xs:mx-6 sm:mx-8 md:mx-10 lg:mx-12 xl:mx-14">
      <div className="py-10 flex flex-col">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <FileText
              color="#52525b"
              className="size-7 xs:size-8 sm:size-9 md:size-10"
            />
            <h1 className="font-bold text-[#52525b] text-2xl xs:text-3xl sm:text-4xl">
              My Files
            </h1>
          </div>
          <div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="bg-[#f85f5f] text-white font-bold p-2 rounded hover:bg-[#ef4444] hover:text-white"
                  variant="outline"
                >
                  <div className="flex items-center justify-center gap-2">
                    <span>
                      <Plus size="20" />
                    </span>
                    <span>Upload PDF</span>
                  </div>
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
      {posts.length === 0 ? (
        <>
          <div className="py-10 flex flex-col justify-between items-center">
            <Ghost />
            <p className="font-bold">Pretty empty around here</p>
            <p>Lets upload your first pdf.</p>
          </div>
        </>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post, index) => (
            <div className="w-full">
              <Post key={index} post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
