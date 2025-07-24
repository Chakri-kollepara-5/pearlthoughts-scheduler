// components/ui/Header.tsx
import React from "react";
import { Menu, Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full h-16 px-6 bg-white shadow-md flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Menu className="w-6 h-6 text-gray-700 cursor-pointer" />
        <h1 className="text-xl font-semibold text-gray-800">Shedula</h1>
      </div>
      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5 text-gray-700" />
        <img
          src="https://i.pravatar.cc/40"
          alt="User"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;


// components/ui/Sidebar.tsx
import React from "react";
import {
  CalendarDays,
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 h-full bg-white shadow-md p-6 hidden md:block">
      <div className="space-y-6">
        <div className="text-gray-700 font-bold text-lg">Menu</div>
        <nav className="flex flex-col space-y-4 text-sm text-gray-600">
          <a href="#" className="flex items-center gap-3 hover:text-indigo-600">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-indigo-600">
            <CalendarDays className="w-5 h-5" /> Schedule
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-indigo-600">
            <Users className="w-5 h-5" /> Team
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-indigo-600">
            <Settings className="w-5 h-5" /> Settings
          </a>
        </nav>
        <button className="mt-10 flex items-center gap-2 text-red-600 hover:text-red-800">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
