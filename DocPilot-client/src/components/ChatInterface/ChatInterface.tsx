import * as React from "react";
import { Send, Loader } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { chatApi } from "@/api/chatApi";

function ChatWrapper() {
  const [messages, setMessages] = React.useState<any>([]);
  const [input, setInput] = React.useState("");
  const [shouldUpdateMessages, setShouldUpdateMessages] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const inputLength = input.trim().length;

  const handleMessageSend = (event: any) => {
    event.preventDefault();
    if (inputLength === 0) return;

    setMessages([
      ...messages,
      {
        role: "user",
        content: input,
      },
    ]);

    setInput("");
    setShouldUpdateMessages(true);
  };

  const messageChatApi = async () => {
    setLoading(true);
    const response: any = await chatApi(messages[messages.length - 1]);
    if (response && response.responseMessage) {
      setMessages([...messages, response.responseMessage]);
      setShouldUpdateMessages(false);
    }

    setLoading(false);
  };

  React.useEffect(() => {
    if (messages.length > 0 && shouldUpdateMessages) {
      messageChatApi();
    }
  }, [messages, shouldUpdateMessages]);

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/01.png" alt="Image" />
              <AvatarFallback>DP</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">DocPilot</p>
              <p className="text-sm text-muted-foreground">m@example.com</p>
            </div>
          </div>
        </CardHeader>

        <CardContent
          className="overflow-y-auto max-h-80"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="space-y-4">
            {messages.map((message: any, index: number) => (
              <div
                key={index}
                className={cn(
                  "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                  message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.content}
              </div>
            ))}
            {loading && shouldUpdateMessages && (
              <div className="flex justify-center mt-4">
                <Loader className="h-6 w-6 animate-spin" />
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <form
            onSubmit={handleMessageSend}
            className="flex w-full items-center space-x-2"
          >
            <Input
              id="message"
              placeholder="Type your message..."
              className="flex-1"
              autoComplete="off"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button type="submit" size="icon" disabled={inputLength === 0}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ChatWrapper;
