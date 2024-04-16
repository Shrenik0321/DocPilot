import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Card, CardTitle } from "../ui/card";
import { Plus, MessageSquare, Trash } from "lucide-react";

const Post = ({ post }: any) => {
  return (
    <div className="max-w-sm">
      <Card className="w-full">
        <div className="flex flex-col">
          <div className="flex items-center space-x-4 p-2 m-1">
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

            <div className="flex items-center justify-center">
              <button
                className="flex items-center justify-center w-24 text-xs text-gray-500 hover:text-gray-700 focus:outline-none hover:bg-gray-200 p-2   "
                style={{ backgroundColor: "#FFEBEE" }}
              >
                <Trash size={18} />
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Post;
