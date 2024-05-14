import PDFRenderer from "@/components/PDFRenderer/PDFRenderer";
import ChatInterface from "@/components/ChatInterface/ChatInterface";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const location = useLocation();
  const pdfData = location.state?.data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
      <div className="order-1">
        <PDFRenderer pdfData={pdfData} />
      </div>
      <div className="order-2 flex flex-col">
        <div className="flex-grow">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
};

export default Chat;
