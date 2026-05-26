import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PublicLayout = () => {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className={`${dark ? "dark bg-slate-950 text-white" : "bg-slate-50 text-slate-900"} min-h-screen font-inter transition-colors duration-500`}>
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]"></div>
      </div>

      <Navbar dark={dark} setDark={setDark} />
      
      <main className="relative z-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;
