import React, { useState } from "react";
import { MessengerProps } from "../../types/message.type";

const Messenger: React.FC<MessengerProps> = ({
  isMyMessage,
  messageTime,
  messageText,
  status,
  onReply,
  onForward,
  onCopy,
  onReport,
  onDelete,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle trạng thái dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  return (
    <div
      className={`flex mt-1 ${
        isMyMessage ? "justify-end" : "justify-start"
      } gap-2.5`}
    >
      <div
        className={`relative max-w-xs px-4 py-1 text-sm border-b-2 border-gray-500 dark:border-blue-700 rounded-lg shadow ${
          isMyMessage
            ? "bg-blue-100 dark:bg-blue-700 text-white rounded-tr-none"
            : "bg-gray-100 dark:bg-gray-700 text-black rounded-tl-none"
        }`}
      >
        <div className="flex items-start justify-between">
          {isMyMessage && (
            <button
              onClick={toggleDropdown}
              onBlur={() => setIsDropdownOpen(false)}
              data-dropdown-toggle="dropdownDots"
              data-dropdown-placement="bottom-start"
              className="mt-2 text-center text-gray-900 dark:text-white -translate-x-3"
              type="button"
            >
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 4 15"
              >
                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
              </svg>
            </button>
          )}
          {/* <p
              className={` ${
                isMyMessage
                  ? "dark:text-gray-900 text-white"
                  : "text-gray-900 dark:text-white"
              } text-base font-normal py-2.5 `}
            > */}
          <p className="text-gray-900 dark:text-white text-base font-normal py-2.5">
            {messageText}
          </p>
          {!isMyMessage && (
            <button
              onClick={toggleDropdown}
              onBlur={() => setIsDropdownOpen(false)}
              data-dropdown-toggle="dropdownDots"
              data-dropdown-placement="bottom-start"
              className="mt-2 text-center text-gray-900 dark:text-white translate-x-2"
              type="button"
            >
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 4 15"
              >
                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
              </svg>
            </button>
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-normal text-gray-500">{status}</span>
          <span className="text-xs font-normal text-gray-500">
            {messageTime}
          </span>
        </div>

        {isDropdownOpen && (
          <div
            className={`absolute top-0 ${
              isMyMessage ? "right-full -translate-x-2" : "-right-36"
            } z-10 w-32 bg-white rounded shadow-md`}
          >
            <ul className="py-1 text-sm text-gray-700">
              <li>
                <button
                  onClick={onReply}
                  className="block w-full px-4 py-2 hover:bg-gray-100"
                >
                  Reply
                </button>
              </li>
              <li>
                <button
                  onClick={onForward}
                  className="block w-full px-4 py-2 hover:bg-gray-100"
                >
                  Forward
                </button>
              </li>
              <li>
                <button
                  onClick={onCopy}
                  className="block w-full px-4 py-2 hover:bg-gray-100"
                >
                  Copy
                </button>
              </li>
              <li>
                <button
                  onClick={onReport}
                  className="block w-full px-4 py-2 hover:bg-gray-100"
                >
                  Report
                </button>
              </li>
              <li>
                <button
                  onClick={onDelete}
                  className="block w-full px-4 py-2 hover:bg-gray-100"
                >
                  Delete
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messenger;
