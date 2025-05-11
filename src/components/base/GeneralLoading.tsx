import { AnimatePresence, motion } from "framer-motion";

type Props = {
  isLoading: boolean;
};

export default function GeneralLoading({ isLoading }: Props) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed top-0 left-0 h-1 bg-blue-500 z-[9999]"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      )}
    </AnimatePresence>
  );
}
