import PDFRenderer from "@/components/PDFRenderer/PDFRenderer";
import ChatWrapper from "@/components/ChatWrapper/ChatWrapper";

const Chat = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-6">
      <div>
        <PDFRenderer />
      </div>
      <div>
        <ChatWrapper />
      </div>
    </div>
  );
};

export default Chat;
