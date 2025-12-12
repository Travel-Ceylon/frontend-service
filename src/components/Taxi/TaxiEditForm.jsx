// src/components/Taxi/TaxiEditForm.jsx

import React, { useState } from "react";
import { useTaxiStore } from "../../store/taxiStore";

const TaxiEditForm = ({ currentProfile, onClose }) => {
  const { updateTaxiDetails } = useTaxiStore();

  const [formData, setFormData] = useState({
    location: currentProfile.location || "",
    vehicleNo: currentProfile.vehicleNo || "",
    description: currentProfile.description || "",
    driverName: currentProfile.driverName || "",
    // Add other fields you want to make editable
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Pass the entire form data object to the store action
      await updateTaxiDetails(formData);
      onClose(); // Close modal on success
    } catch (error) {
      // Error handling is managed by the store (toast messages)
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Location Field */}
      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700"
        >
          Vehicle Model
        </label>
        <input
          type="text"
          name="location"
          id="location"
          value={formData.location}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      {/* Vehicle Number Field */}
      <div>
        <label
          htmlFor="vehicleNo"
          className="block text-sm font-medium text-gray-700"
        >
          Vehicle Number
        </label>
        <input
          type="text"
          name="vehicleNo"
          id="vehicleNo"
          value={formData.vehicleNo}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      {/* Description Field */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          About the vehicle
        </label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      {/* Description Field */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          About the driver
        </label>
        <textarea
          name="driverBio"
          id="driverBio"
          value={formData.driverBio}
          onChange={handleChange}
          rows="3"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-green-400"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default TaxiEditForm;
