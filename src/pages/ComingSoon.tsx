import { motion } from "framer-motion";
import { WandSparkles } from "lucide-react";

const ComingSoon = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 relative overflow-hidden"
    >
      <div className="relative z-10">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          <WandSparkles className="h-24 w-24 text-primary mb-6 mx-auto" />
        </motion.div>

        <motion.h2
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-5xl h-20 font-bold mb-4 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
        >
          Magic In Progress!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          Something magical is brewing in the cauldron... We're putting the
          final enchantments on this feature! 🔮
        </motion.p>
      </div>
    </motion.div>
  );
};

export default ComingSoon;
