import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-center mb-16"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
        >
          Welcome to Cvents
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-xl mb-8 text-muted-foreground"
        >
          Powerful admin dashboard for your organization
        </motion.p>
        <motion.div variants={itemVariants}>
          <Button size="lg" className="group">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Home;
