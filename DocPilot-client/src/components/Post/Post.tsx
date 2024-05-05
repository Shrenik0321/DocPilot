import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Card, CardTitle } from "../ui/card";
import { Plus, MessageSquare, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogTitle,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { deletePost } from "@/api/deletePost";

const Post = ({ post }: any) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    const { _id } = post;
    deletePost({ postId: _id });
  };

  return (
    <div className="max-w-sm">
      <Card className="w-full">
        <div className="flex flex-col">
          <div
            className="flex items-center space-x-4 p-2 m-1"
            onClick={() => navigate("/chat", { state: { data: post } })}
          >
            <Avatar className="bg-gray-200 rounded-full p-2">
              <AvatarFallback>DP</AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1">
              <CardTitle className="text-sm truncate">
                {post.fileName}
              </CardTitle>
            </div>
          </div>

          <div className="flex justify-between w-full p-2 gap-1">
            <div className="flex items-center justify-center">
              <button className="flex items-center justify-center w-24  text-xs text-gray-500 hover:text-gray-700 focus:outline-none hover:bg-gray-200 p-2">
                <Plus size={18} />
                <p className="ml-1">Apr 2024</p>
              </button>
            </div>

            <div className="flex items-center justify-center">
              <button className="flex items-center justify-center w-24 text-xs text-gray-500 hover:text-gray-700 focus:outline-none hover:bg-gray-200 p-2">
                <MessageSquare size={18} />
                <p className="ml-1">Mocked</p>
              </button>
            </div>

            <div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="flex items-center justify-center">
                    <button
                      className="flex items-center justify-center w-24 text-xs text-gray-500 hover:text-gray-700 focus:outline-none hover:bg-gray-200 p-2"
                      style={{ backgroundColor: "#FFEBEE" }}
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your pdf file.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Post;
