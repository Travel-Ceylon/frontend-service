import React, { useState, useRef, useEffect } from "react";
import { LogOut, User } from "lucide-react"; // Only need LogOut and User icons
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside (Essential for accessibility)
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Use event.target to check where the click originated
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

  // Use a placeholder image or a static URL if the user object doesn't have it
  // Assuming the profile picture URL might be on the user object:
  const profileImageUrl = user?.profilePic || null;

  return (
    // 1. Transparent Background, Padding Adjusted (px-6 py-4 for space)
    // 2. Justify-end to push the content to the right
    <nav className="absolute top-0 left-0 right-0 z-10 flex items-center justify-end px-6 py-4 bg-transparent">
      {/* Right - Profile Button & Dropdown Container */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          // 3. Simple rounded button style, focus ring removed
          className="focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition-shadow rounded-full"
        >
          {profileImageUrl ? (
            // If a profile picture URL exists, display the image
            <img
              src={profileImageUrl}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-transparent hover:border-green-500 transition-colors shadow-md"
            />
          ) : (
            // Otherwise, display a default Lucide User icon fallback
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors shadow-md">
              <User className="w-6 h-6" />
            </div>
          )}
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          // 5. Positioned 'right-0' to align the menu flush with the right edge of the icon
          <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl border py-2 z-50">
            {/* User Email Display */}
            <div className="px-4 py-2 text-sm text-gray-800 border-b overflow-hidden text-ellipsis whitespace-nowrap">
              <p className="font-semibold text-gray-900">Account</p>
              <p className="text-xs text-gray-500">
                {user?.email || "Email unavailable"}
              </p>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
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
