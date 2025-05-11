import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../components/base/Modal";
// import useAuth from "../hooks/useAuth";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  // const { signOut } = useAuth();

  const handleLogout = () => {
    // signOut();
    toast.success("Logout successful!");
    navigate("/login");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="p-8">
      <Modal
        isOpen={true}
        title="Louout"
        description="Are you sure you want to logout?"
        confirmLabel="Yes"
        cancelLabel="No"
        onConfirm={handleLogout}
        onCancel={handleCancel}
        onClose={handleCancel}
      />
    </div>
  );
};

export default Logout;
