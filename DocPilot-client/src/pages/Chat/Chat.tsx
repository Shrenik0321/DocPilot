import PDFRenderer from "@/components/PDFRenderer/PDFRenderer";
import ChatInterface from "@/components/ChatInterface/ChatInterface";

const Chat = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-6">
      <div>
        <PDFRenderer />
      </div>
      <div>
        <ChatInterface />
      </div>
    </div>
  );
};

export default Chat;
