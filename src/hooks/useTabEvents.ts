// src/hooks/useTabEvents.ts
import { useEffect } from "react";

interface TabEventHandlers {
  onTabVisible?: () => void;
  onTabHidden?: () => void;
  onTabFocus?: () => void;
  onTabBlur?: () => void;
}

const useTabEvents = ({
  onTabVisible,
  onTabHidden,
  onTabFocus,
  onTabBlur,
}: TabEventHandlers) => {
  useEffect(() => {
    // Lắng nghe visibilitychange
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        onTabVisible?.();
      } else {
        onTabHidden?.();
      }
    };

    // Lắng nghe focus và blur
    const handleFocus = () => onTabFocus?.();
    const handleBlur = () => onTabBlur?.();

    // Đăng ký các sự kiện
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    // Dọn dẹp khi component unmount
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, [onTabVisible, onTabHidden, onTabFocus, onTabBlur]);
};

export default useTabEvents;
