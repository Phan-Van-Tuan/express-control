import React, { useState } from "react";

const ModeSwitcher = () => {
  const [isChecked, setIsChecked] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const root = window.document.documentElement;

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      localStorage.setItem("theme", "light");
      root.classList.remove("dark");
    } else {
      localStorage.setItem("theme", "dark");
      root.classList.add("dark");
    }
  };

  return (
    <>
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          <div
            className={`block h-8 w-14 rounded-full ${
              isChecked ? "bg-[#3c50e0]" : "bg-[#E5E7EB]"
            } transition`}
          ></div>
          <div
            className={`dot absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
              isChecked ? "translate-x-full" : ""
            }`}
          >
            <img
              className="h-4 w-4 stroke-current"
              src={`${
                isChecked ? "/icons/night-mode.png" : "/icons/light-mode.png"
              }`}
              alt=""
            />
          </div>
        </div>
      </label>
    </>
  );
};

export default ModeSwitcher;
