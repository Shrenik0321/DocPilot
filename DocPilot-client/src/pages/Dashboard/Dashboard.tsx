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
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [posts, setPosts] = React.useState([]);
  const navigate = useNavigate();

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
      {posts.length === 0 ? (
        <>
          <div className="py-10 flex flex-col justify-between items-center">
            <Ghost />
            <p className="font-bold">Pretty empty around here</p>
            <p>Lets upload your first pdf.</p>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-3 gap-4 px-20">
          {posts.map((post, index) => (
            <div onClick={() => navigate("/chat", { state: { data: post } })}>
              <Post key={index} post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
