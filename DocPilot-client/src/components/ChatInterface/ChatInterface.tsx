import * as React from "react";
import { Send, Loader } from "lucide-react";
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
import { BotMessageSquare } from "lucide-react";
import { User } from "lucide-react";

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
        time: getCurrentTime(),
      },
    ]);

    setInput("");
    setShouldUpdateMessages(true);
  };

  const messageChatApi = async () => {
    setLoading(true);
    // const response: any = await chatApi(messages[messages.length - 1]);
    const response: any = await chatApi(messages);
    if (response && response.responseMessage) {
      setMessages([...messages, response.responseMessage]);
      setShouldUpdateMessages(false);
    }

    setLoading(false);
  };

  const getCurrentTime = () => {
    let currentTime = new Date();
    let hours: any = currentTime.getHours();
    let minutes: any = currentTime.getMinutes();
    let ampm: any = hours >= 12 ? "pm" : "am";

    // Convert hours from 24-hour format to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    // Add leading zero to minutes if needed
    minutes = minutes < 10 ? "0" + minutes : minutes;

    // Construct the formatted time string
    let timeString = hours + ":" + minutes + ampm;
    return timeString;
  };

  React.useEffect(() => {
    if (messages.length > 0 && shouldUpdateMessages) {
      messageChatApi();
    }
  }, [messages, shouldUpdateMessages]);

  return (
    <Card className="flex flex-col sm:h-full justify-between">
      <CardHeader className="flex flex-row items-center">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/avatars/01.png" alt="Image" />
            <AvatarFallback>DP</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">DocPilot</p>
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
              className={`flex flex-col gap-2 py-2 text-sm ${
                message.role === "user" ? "items-end" : "items-start"
              }`}
              key={index}
            >
              {message.role === "user" ? (
                <div className="flex flex-row-reverse items-end gap-1">
                  <div className="bg-[#ef4444] w-6 h-6 flex items-center justify-center rounded-sm">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="self-end ml-auto rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-none bg-[#ef4444] text-primary-foreground p-2">
                    <div className="text-left pb-3">{message.content}</div>
                    <div className="text-xs text-primary-foreground opacity-50 text-right">
                      {message.time}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-row items-end gap-1">
                  <div className="bg-[#52525b] w-6 h-6 flex items-center justify-center rounded-sm">
                    <BotMessageSquare className="h-4 w-4 text-white" />
                  </div>
                  <div className="rounded-tl-lg rounded-tr-lg rounded-br-lg rounded-bl-none bg-muted p-2">
                    <div className="text-left pb-3">{message.content}</div>
                    <div className="text-xs text-primary-foreground opacity-50 text-right">
                      {message.time}
                    </div>
                  </div>
                </div>
              )}
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
          <Button
            type="submit"
            size="icon"
            disabled={inputLength === 0}
            className="bg-[#ef4444]"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}

export default ChatWrapper;
