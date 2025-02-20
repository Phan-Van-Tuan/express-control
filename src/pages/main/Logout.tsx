import { useNavigate } from "react-router-dom";
import useToast from "../../components/Toast";
import Modal from "../../components/Model";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { addToast, ToastContainer } = useToast();

  const handleLogout = () => {
    // Xóa thông tin đăng nhập (ví dụ: token trong localStorage)
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Hiển thị thông báo thành công
    addToast({ type: "success", message: "Logout successful!" });

    // Điều hướng về trang login (hoặc trang khác)
    setTimeout(() => {
      navigate("/auth/login");
    }, 1500); // Đợi 1.5 giây để hiển thị toast rồi điều hướng
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
      <ToastContainer />
    </div>
  );
};

export default Logout;
