import { useState } from "react";
import { Code } from "lucide-react";
import Modal from "../components/base/Modal";

// Tạo một hook tùy chỉnh
export const useDev = () => {
  const [show, setShow] = useState(false);

  const showCommingSoon = () => {
    setShow(true);
    setTimeout(() => setShow(false), 10000);
  };

  const CommingSoonModal = () => (
    <Modal
      isOpen={show}
      onClose={() => setShow(false)}
      type="alert"
      title="Coming Soon!"
      description="This feature is under development and will be available soon."
      confirmLabel="OK"
      icon={
        <div className=" bg-blue-100 p-4 rounded-full">
          <Code className="w-6 h-6 text-blue-500" />
        </div>
      }
    />
  );

  return { showCommingSoon, CommingSoonModal };
};

// Cách sử dụng:
/*
function App() {
  const { showCommingSoon, CommingSoonModal } = useCommingSoon();

  return (
    <div>
      <button onClick={() => showCommingSoon()}>Show Coming Soon</button>
      <CommingSoonModal />
    </div>
  );
}
*/
