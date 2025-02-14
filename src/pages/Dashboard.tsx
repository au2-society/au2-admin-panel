"use client";

import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-background">
      {/* TODO: Sidebar */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-background shadow-md z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center">
            <h1 className="text-2xl font-semibold text-foreground">
              Dashboard
            </h1>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-secondary/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
