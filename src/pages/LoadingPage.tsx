import { motion } from "framer-motion";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: Number.POSITIVE_INFINITY,
        }}
        className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
      />
    </div>
  );
};

export default LoadingPage;
