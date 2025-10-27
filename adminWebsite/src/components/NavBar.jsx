import { useState } from "react";
import {
  Menu,
  X,
  FileText,
  Users,
  UserCheck,
  Home,
  Trash2Icon,
  BookCheck,
  BookCopy,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: "Home", icon: Home, href: "" },
    { name: "In-Revision", icon: FileText, href: "InRevision" },
    { name: "In-Review", icon: FileText, href: "InReview" },
    { name: "Add Reviewers", icon: UserCheck, href: "AddReviewer" },
    { name: "Delete Content", icon: Trash2Icon, href: "DeleteContent" },
  ];

  return (
    <>
      {/* Desktop Sidebar - Always visible on lg+ screens */}
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:bg-gradient-to-b lg:from-slate-900 lg:to-slate-800 lg:shadow-2xl lg:z-40">
        <div className="flex items-center justify-center h-20 border-b border-slate-700/50">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            NMAMIT Researchers
          </h1>
        </div>
        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>(
                    `flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 group ${isActive ? "bg-slate-700/50" : ""}`
                  )}
                >
                  <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-slate-700/50">
          <p className="text-xs text-slate-400 text-center">
            © 2025 NMAMIT Researchers
          </p>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-slate-900 to-slate-800 shadow-lg z-50 flex items-center justify-between px-4">
        <h1 className="text-xl font-bold text-white">Research Hub</h1>
        <button
          onClick={toggleDrawer}
          className="p-2 text-white hover:bg-slate-700/50 rounded-lg transition-colors duration-200"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={toggleDrawer}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`lg:hidden fixed top-16 left-0 bottom-0 w-72 bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="overflow-y-auto h-full py-6 px-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={toggleDrawer}
                  className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 group"
                >
                  <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
