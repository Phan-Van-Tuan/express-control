import React, { useState, useEffect } from "react";

type ToastType = "success" | "danger" | "warning";

interface ToastOptions {
  type: ToastType;
  message: string;
  duration?: number; // Thời gian toast tự tắt (ms)
}

const useToast = () => {
  const [toasts, setToasts] = useState<ToastOptions[]>([]);

  const addToast = (toast: ToastOptions) => {
    setToasts((prev) => [...prev, toast]);
  };

  const removeToast = (index: number) => {
    setToasts((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (toasts.length > 0) {
      const timers = toasts.map((_, index) =>
        setTimeout(() => removeToast(index), toasts[index].duration || 3000)
      );
      return () => timers.forEach((timer) => clearTimeout(timer));
    }
  }, [toasts]);

  const ToastContainer = () => (
    <div className="fixed top-4 right-4 space-y-2 z-50 min-w-72">
      {toasts.map((toast, index) => (
        <div
          key={index}
          className={`flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 ${
            toast.type === "success"
              ? "border-l-4 border-green-500"
              : toast.type === "danger"
              ? "border-l-4 border-red-500"
              : "border-l-4 border-orange-500"
          }`}
        >
          <div
            className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${
              toast.type === "success"
                ? "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200"
                : toast.type === "danger"
                ? "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
                : "bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200"
            }`}
          >
            {toast.type === "success" && (
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
            )}
            {toast.type === "danger" && (
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
              </svg>
            )}
            {toast.type === "warning" && (
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
              </svg>
            )}
          </div>
          <div className="ms-3 text-sm font-normal">{toast.message}</div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            onClick={() => removeToast(index)}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );

  return { addToast, ToastContainer };
};

export default useToast;
