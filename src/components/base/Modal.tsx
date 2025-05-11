import React, { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, LogOut, AlertTriangle, Info } from "lucide-react";

type ModalType = "confirm" | "alert" | "info" | "custom";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  type?: ModalType;
  title?: string;
  description?: string | ReactNode;
  children?: ReactNode;
  content?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  showCloseButton?: boolean;
  overlayClassName?: string;
  modalClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
  closeButtonClassName?: string;
  shouldCloseOnOverlayClick?: boolean;
  shouldCloseOnEsc?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  icon?: ReactNode;
}

const Modal = ({
  isOpen,
  onClose,
  type = "confirm",
  title = "Confirm Action",
  description = "Are you sure you want to perform this action?",
  content,
  children,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  showCloseButton = true,
  overlayClassName = "",
  modalClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  confirmButtonClassName = "",
  cancelButtonClassName = "",
  closeButtonClassName = "",
  shouldCloseOnOverlayClick = true,
  shouldCloseOnEsc = true,
  size = "md",
  icon,
}: ModalProps & { children?: ReactNode }) => {
  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && shouldCloseOnEsc && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, shouldCloseOnEsc, onClose]);

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && shouldCloseOnOverlayClick && onClose) {
      onClose();
    }
  };

  // Handle confirm action
  const handleConfirm = () => {
    onConfirm?.();
    if (type === "alert" || type === "confirm" || type === "info") {
      onClose?.();
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    onCancel?.();
    onClose?.();
  };

  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "max-w-sm";
      case "md":
        return "max-w-md";
      case "lg":
        return "max-w-lg";
      case "xl":
        return "max-w-xl";
      case "full":
        return "max-w-full mx-4";
      default:
        return "max-w-md";
    }
  };

  // Get default icon based on modal type
  const getDefaultIcon = () => {
    switch (type) {
      case "alert":
        return (
          <div className=" bg-yellow-100 p-4 rounded-full">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
          </div>
        );
      case "info":
        return (
          <div className=" bg-blue-100 p-4 rounded-full">
            <Info className="w-6 h-6 text-blue-500" />
          </div>
        );
      case "confirm":
        return (
          <div className=" bg-red-100 p-4 rounded-full">
            <LogOut className="w-6 h-6 text-red-500" />
          </div>
        );

      default:
        return null;
    }
  };

  const modalIcon = icon || getDefaultIcon();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 ${overlayClassName}`}
          onClick={handleOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className={`relative w-full ${getSizeClasses()} ${modalClassName}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Modal Content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
              {/* Close Button */}
              {showCloseButton && (
                <button
                  type="button"
                  className={`absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-700 dark:hover:text-white ${closeButtonClassName}`}
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {/* Custom Content */}
              {children ? (
                <div className="p-6">{children}</div>
              ) : (
                <div className="p-6 text-center">
                  {/* Icon */}
                  {modalIcon && (
                    <div className="flex justify-center mb-4">{modalIcon}</div>
                  )}

                  {/* Title */}
                  {title && (
                    <h3
                      className={`mb-4 text-lg font-semibold text-gray-900 dark:text-white ${titleClassName}`}
                    >
                      {title}
                    </h3>
                  )}

                  {/* Description */}
                  {description && (
                    <div
                      className={`mb-6 text-sm text-gray-500 dark:text-gray-400 ${descriptionClassName}`}
                    >
                      {typeof description === "string" ? (
                        <p>{description}</p>
                      ) : (
                        description
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-center gap-4">
                    {type !== "alert" && type !== "info" && (
                      <button
                        type="button"
                        className={`px-5 py-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600 ${cancelButtonClassName}`}
                        onClick={handleCancel}
                      >
                        {cancelLabel}
                      </button>
                    )}
                    <button
                      type="button"
                      className={`px-5 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800 ${confirmButtonClassName}`}
                      onClick={handleConfirm}
                    >
                      {confirmLabel}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
