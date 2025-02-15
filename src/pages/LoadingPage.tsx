import { motion } from "framer-motion";

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-md z-50">
      <motion.img
        src="/logo.png"
        alt="Loading Spinner"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: Infinity,
        }}
        className="w-16 h-16"
      />
    </div>
  );
};

export default LoadingPage;
