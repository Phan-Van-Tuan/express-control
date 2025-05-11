// File: src/components/layouts/Sidebar.tsx
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { menu } from "../../contants/sidebar-menu";
import { cn } from "../../lib/utils";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (label: string) => {
    setOpenMenu((prev) => (prev === label ? null : label));
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 256 : 0 }}
      transition={{ duration: 0.25 }}
      id="logo-sidebar"
      className={cn(
        "fixed top-0 left-0 z-40  h-screen transition-transform -translate-x-full sm:translate-x-0 dark:border-r-slate-700 border-r border-r-slate-200 overflow-hidden",
        isOpen ? "w-64" : "w-0"
      )}
      aria-label="Sidebar"
    >
      <div className="h-full px-4 py-6 overflow-y-auto bg-slate-50 dark:bg-gray-900 text-white">
        <Link to="/" className="flex items-center ps-2.5 mb-8">
          <img
            className="h-18 me-4 sm:h-16 p-2"
            src="/icons/icon.png"
            alt="avatar"
          />
          <span className="self-center text-xl font-extrabold whitespace-nowrap text-green-400 dark:text-white">
            Carpool
            <br />
            Admin
          </span>
        </Link>

        <ul className="space-y-2 font-normal">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.to);
            // console.log(location);
            const isOpen = openMenu === item.label;

            return (
              <li key={item.label}>
                <div
                  className={cn(
                    "flex items-center justify-between px-3 my-3 rounded-lg text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer",
                    isActive && "bg-gray-300 dark:bg-gray-700"
                  )}
                  onClick={() =>
                    item.children ? toggleMenu(item.label) : null
                  }
                >
                  <Link to={item.to} className="flex items-center gap-3 py-3">
                    <Icon className="w-5 h-5" color="#818b9c" />
                    <span className="text-base font-medium">{item.label}</span>
                  </Link>
                  {item.children &&
                    (isOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    ))}
                </div>

                {/* Submenu animation */}
                <AnimatePresence initial={false}>
                  {item.children && isOpen && (
                    <motion.div
                      key="submenu"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-6 mt-1 overflow-hidden space-y-1"
                    >
                      {item.children.map((child) => {
                        const isChildActive = location.pathname === child.to;
                        return (
                          <Link
                            key={child.to}
                            to={child.to}
                            className={cn(
                              "block px-3 py-2 rounded-md text-sm text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer",
                              isChildActive && "bg-gray-300 dark:bg-gray-800"
                            )}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
