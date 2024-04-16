import PDFRenderer from "@/components/PDFRenderer/PDFRenderer";
import ChatInterface from "@/components/ChatInterface/ChatInterface";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const location = useLocation();
  const pdfData = location.state?.data;

  return (
    <div className="grid grid-cols-2 gap-4 p-6">
      <div>
        <PDFRenderer pdfData={pdfData} />
      </div>
      <div>
        <ChatInterface />
      </div>
    </div>
  );
};

export default Chat;
