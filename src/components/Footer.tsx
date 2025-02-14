import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.pageYOffset > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.footer
      role="contentinfo"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative border-t bg-gradient-to-b from-background/90 via-background/70 to-background/90 backdrop-blur-lg"
    >
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.div className="flex items-center gap-1 text-muted-foreground hover:text-foreground cursor-default group">
            <span className="text-lg">©</span>
            {new Date().getFullYear()} Cvents. All rights reserved.
          </motion.div>

          <div className="flex gap-6">
            {["Privacy Policy", "Terms", "Contact"].map((link, index) => (
              <motion.a
                key={link}
                href="#"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative text-muted-foreground hover:text-foreground group text-sm"
              >
                {link}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
        initial={{ scale: 0 }}
        animate={{ scale: showScroll ? 1 : 0 }}
        whileHover={{ scale: 1.2, rotate: 360 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-background shadow-lg border hover:border-primary transition-colors flex items-center justify-center"
      >
        <ArrowUp className="h-5 w-5" />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/30"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>
    </motion.footer>
  );
};

export default Footer;
