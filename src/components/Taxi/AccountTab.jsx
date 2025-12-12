import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AccountTab = ({ user }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  // Populate form fields with user data
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  if (!user) {
    return (
      <p className="text-center py-10 text-gray-600">
        Loading account details...
      </p>
    );
  }

  // Handle account update
  const handleUpdate = (field) => {
    toast.success(`${field} updated successfully!`);
    // TODO: Implement actual API call to update user data
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="space-y-6">
        {/* Name field */}
        <div className="flex items-center justify-between gap-6">
          <label className="text-sm font-medium text-gray-700 w-32">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="example User"
          />
          <button
            onClick={() => handleUpdate("Name")}
            className="px-6 py-2 border border-green-400 text-green-600 rounded-md hover:bg-green-50 transition font-medium"
          >
            Change
          </button>
        </div>

        {/* Email field */}
        <div className="flex items-center justify-between gap-6">
          <label className="text-sm font-medium text-gray-700 w-32">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="exampleuser@gmail.com"
          />
          <button
            onClick={() => handleUpdate("Email")}
            className="px-6 py-2 border border-green-400 text-green-600 rounded-md hover:bg-green-50 transition font-medium"
          >
            Change
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
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="************"
          />
          <button
            onClick={() => handleUpdate("Password")}
            className="px-6 py-2 border border-green-400 text-green-600 rounded-md hover:bg-green-50 transition font-medium"
          >
            Change
          </button>
        </div>

        {/* Phone number field */}
        <div className="flex items-center justify-between gap-6">
          <label className="text-sm font-medium text-gray-700 w-32">
            Phone number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="0771234545"
          />
          <button
            onClick={() => handleUpdate("Phone")}
            className="px-6 py-2 border border-green-400 text-green-600 rounded-md hover:bg-green-50 transition font-medium"
          >
            Change
          </button>
        </div>
      </div>
    </div>
  );
};
