import React, { useState } from "react";

const Notification: React.FC = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !message) {
      setError("Tiêu đề và nội dung không được để trống.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Gửi yêu cầu lên server
      const response = await fetch("/api/admin/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          message,
          target: "drivers", // Gửi thông báo cho tất cả tài xế
        }),
      });

      if (!response.ok) {
        throw new Error("Đã xảy ra lỗi khi gửi thông báo.");
      }

      const result = await response.json();
      setSuccess("Thông báo đã được gửi thành công.");
      setTitle("");
      setMessage("");
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-gray-800">
        <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Create Notification
          </h3>
        </div>
        <div className="flex flex-col gap-5 p-6">
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Title
            </label>
            <input
              type="text"
              placeholder="Default Input"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
          </div>
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Content
            </label>
            <textarea
              rows={6}
              placeholder="Active textarea"
              className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-blue-400 active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
            ></textarea>
          </div>
          <div>
            <label className="mb-3 block font-medium text-black dark:text-white">
              File Drop Zone
            </label>
            <div className="w-full h-36 flex items-center justify-center rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition hover:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black">
              <label
                className="p-4 rounded-full bg-slate-100 shadow-md cursor-pointer"
                htmlFor="upload-notify-file"
              >
                <img
                  className="w-4 h-4"
                  src="/icons/upload.png"
                  alt="upload icon"
                />
              </label>
              <input id="upload-notify-file" type="file" className="hidden" />
            </div>
          </div>
          <button className="flex w-full justify-center rounded bg-blue-700 p-3 font-medium text-white hover:bg-opacity-90">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
