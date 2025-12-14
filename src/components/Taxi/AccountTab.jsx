import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

export const AccountTab = ({ user }) => {
  // We only need state for fields that can be updated: email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false); // State for loading

  // Get the update action from the store
  const { updateProfile } = useAuthStore();

  // Populate form fields with user data
  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      // We intentionally don't set the password state from 'user' for security
    }
  }, [user]);

  if (!user) {
    return (
      <p className="text-center py-10 text-gray-600">
        Loading account details...
      </p>
    );
  }

  // Handle account update (now async and takes the field to update)
  const handleUpdate = async (field) => {
    setIsUpdating(true);
    let updates = {};
    let oldValue = user[field.toLowerCase()] || "";
    let newValue;

    if (field === "Email") {
      newValue = email;
      // Basic client-side validation for change
      if (newValue === oldValue) {
        toast("Email is already up to date.", { icon: "ℹ️" });
        setIsUpdating(false);
        return;
      }
      updates.email = newValue;
    } else if (field === "Password") {
      newValue = password;
      // Password validation: Ensure it's not empty
      if (!newValue || newValue.length < 6) {
        toast.error("Password must be at least 6 characters.");
        setIsUpdating(false);
        return;
      }
      updates.password = newValue;
    } else {
      setIsUpdating(false);
      return;
    }

    try {
      // Call the store action
      await updateProfile(updates);

      // If Password update succeeds, clear the input field for security
      if (field === "Password") {
        setPassword("");
      }
      // The toast.success is already inside the updateProfile action
    } catch (error) {
      // Errors are handled in the store, but we catch here to stop loading
    } finally {
      setIsUpdating(false);
    }
  };

  const isEmailChanged = email !== user?.email;
  const isPasswordValid = password.length >= 6; // Simple check

  // rendering
  return (
    <div className="max-w-4xl mx-auto px-2 py-8">
      <div className="space-y-4">
        {/* Email field */}
        <div className="flex items-center justify-between gap-6">
          <label className="text-sm font-medium text-gray-700 w-32">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md  focus:ring-green-400 "
            placeholder="exampleuser@gmail.com"
            disabled={isUpdating}
          />
          <button
            onClick={() => handleUpdate("Email")}
            disabled={!isEmailChanged || isUpdating}
            className={`px-3 py-2 border rounded-md transition font-medium ${
              isEmailChanged
                ? "border-green-400 text-green-600 hover:bg-green-50"
                : "border-gray-300 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isUpdating ? (
              <span className="animate-pulse">...</span>
            ) : (
              <Pencil className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Password field */}
        <div className="flex items-center justify-between gap-6">
          <label className="text-sm font-medium text-gray-700 w-32">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md  focus:ring-green-400"
            placeholder="New password (min 6 chars)"
            disabled={isUpdating}
          />
          <button
            onClick={() => handleUpdate("Password")}
            disabled={!isPasswordValid || isUpdating}
            className={`px-3 py-2 border rounded-md transition font-medium ${
              isPasswordValid
                ? "border-green-400 text-green-600 hover:bg-green-50"
                : "border-gray-300 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isUpdating ? (
              <span className="animate-pulse">...</span>
            ) : (
              <Pencil className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
