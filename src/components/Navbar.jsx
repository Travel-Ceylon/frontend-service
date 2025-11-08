import React, { useState, useRef, useEffect } from "react";
import { LogOut, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {useAuthStore} from '../store/authStore'

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore()
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-md">
      {/* Left - Logo */}
       <h1 className='text-2xl font-semibold mb-4 text-black'>Travel<span className='text-green-400'>Ceylon</span></h1>

      {/* Right - Profile */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <ChevronDown className="w-8 h-8 text-gray-600" />
        </button>

        {/* Dropdown */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
            <div className="px-4 py-2 text-sm text-gray-800 border-b">
              {user?.email}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
