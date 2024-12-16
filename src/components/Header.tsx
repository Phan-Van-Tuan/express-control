// File: components/Header.tsx
import React from "react";

const Header: React.FC = () => {
  return (
    <a
      href="/"
      className="text-center  h-16 ps-2.5 mb-5 header bg-gray-50  dark:bg-gray-800"
    >
      {/* <img className="w-14 mr-2 ml-64" src="/logo192.png" alt="logo" /> */}
      <p className="self-center whitespace-nowrapinline-block mb-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        Van Minh garage management system
      </p>
    </a>
  );
};

export default Header;
