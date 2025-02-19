import { motion } from "framer-motion";

const animationConfig = {
  animate: {
    scale: [1, 1.2, 1],
    rotate: [0, 180, 360],
  },
  transition: {
    duration: 2,
    ease: "easeInOut",
    times: [0, 0.5, 1],
    repeat: Infinity,
  },
};

const LoadingPage = () => {
  return (
    <main
      className="min-h-screen flex items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="absolute inset-0 bg-transparent backdrop-blur-lg dark:bg-black/70"></div>
      <motion.img
        src="/logo.png"
        alt="Loading spinner"
        animate={animationConfig.animate}
        transition={animationConfig.transition}
        className="w-16 h-16"
      />
    </main>
  );
};

export default LoadingPage;
