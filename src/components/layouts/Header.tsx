import React, { useCallback, useState } from "react";
import ModeSwitcher from "../base/ModeSwicher";
import {
  ChevronDown,
  ChevronUp,
  LogOut,
  Menu,
  Search,
  Settings,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../../hooks/use-auth";
import Modal from "../base/Modal";
import { useDev } from "../../hooks/use-dev";

interface HeaderProps {
  toggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [searchbar, setSearchbar] = useState(false);
  const handleClickSearchIcon = useCallback(() => {
    setSearchbar((prev) => !prev);
  }, []);

  return (
    <header className="sticky top-0 z-50 flex flex-col w-full bg-slate-50 drop-shadow-1 dark:drop-shadow-none dark:bg-gray-900 dark:border-b-slate-700 border-b">
      <div className="flex flex-grow items-center md:justify-between justify-end px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <button
          onClick={toggleSidebar}
          className="p-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          <Menu className="w-5 h-5" />
        </button>
        {/* <div className="relative hidden md:inline">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5" />
          <input
            type="text"
            placeholder="Type to search..."
            className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
          />
        </div> */}
        <span className="self-center text-xl font-extrabold whitespace-nowrap text-green-400 dark:text-white flex-1 text-center"></span>
        <div className="flex items-center gap-10 2xsm:gap-7">
          <div
            className={`flex items-center justify-center gap-2 sm:gap-4 md:hidden h-10 w-10 p-1 cursor-pointer rounded-full transition-colors duration-150
              ${
                searchbar
                  ? "bg-blue-300 text-white dark:bg-blue-600 dark:text-zinc-300"
                  : "bg-gray-100 dark:bg-gray-700 text-zinc-400 dark:text-zinc-300"
              }`}
            onClick={handleClickSearchIcon}
          >
            <Search className="w-5 h-5" />
          </div>

          <ModeSwitcher />
          <ProfileDropdown />
        </div>
      </div>
      <AnimatePresence>
        {searchbar && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            transition={{ duration: 0.15 }}
            className="relative pb-3 px-3 md:hidden"
          >
            <Search className="absolute top-3 left-4 w-5 h-5" />
            <input
              type="text"
              placeholder="Type to search..."
              className="w-full bg-transparent p-2 ml-8 text-black focus:outline-none dark:text-white xl:w-125"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

const dropdownVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const toggleDropdown = () => setOpen((prev) => !prev);
  const { user, logoutMutation } = useAuth();
  const { showCommingSoon, CommingSoonModal } = useDev();
  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        // navigate('/login')
      },
    });
    setShowLogoutModal(false);
  };

  return (
    <div className="relative text-gray-600 dark:text-gray-300">
      <button onClick={toggleDropdown} className="flex items-center gap-2">
        <div className="rounded-full flex w-10 h-10 justify-center items-center bg-green-500">
          {user?.avatar ? (
            <img src={user.avatar} alt="Avatar" className="rounded-full" />
          ) : (
            <p className="text-2xl font-extrabold dark:text-gray-600 text-gray-300">
              {user?.firstName.slice(0, 1).toLocaleUpperCase()}
            </p>
          )}
        </div>
        <span className="hidden md:inline text-base m-2">
          {user?.firstName || "Admin"}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-12 mt-2 w-60 bg-white dark:bg-zinc-800 shadow-xl rounded-md overflow-hidden z-50"
          >
            <div className="px-4 py-3">
              <p className="text-sm font-medium">
                {`${user?.firstName} ${user?.lastName}` || "Admin"}
              </p>
              <p className="text-xs text-muted-foreground">
                {user?.email || "admin@example.com"}
              </p>
            </div>
            <hr className="border-t border-zinc-300 dark:border-zinc-700" />

            <button
              onClick={showCommingSoon}
              className="w-full flex items-center gap-2 px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors text-sm"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-full flex items-center gap-2 px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {showLogoutModal && (
        <Modal
          isOpen={showLogoutModal}
          title="Logout"
          description="Are you sure you want to logout?"
          confirmLabel="Yes"
          cancelLabel="No"
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutModal(false)}
          onClose={() => setShowLogoutModal(false)}
        />
      )}
      <CommingSoonModal />
    </div>
  );
};
