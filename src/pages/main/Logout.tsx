import { useNavigate } from "react-router-dom";
import useToast from "../../components/Toast";

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { addToast, ToastContainer } = useToast();

  const handleLogout = () => {
    // Xóa thông tin đăng nhập (ví dụ: token trong localStorage)
    localStorage.removeItem("authToken");

    // Hiển thị thông báo thành công
    addToast({ type: "success", message: "Logout successful!" });

    // Điều hướng về trang login (hoặc trang khác)
    setTimeout(() => {
      navigate("/login");
    }, 1500); // Đợi 1.5 giây để hiển thị toast rồi điều hướng
  };

  return (
    <div>
      <span className="mt-4 text-lg text-center font-medium text-gray-900 dark:text-gray-300">
        Do you want to log out of this account?
      </span>
      <br />
      <button
        onClick={handleLogout}
        className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Logout
      </button>

      {/* Hiển thị container của toast */}
      <ToastContainer />
    </div>
  );
};

export default Logout;
