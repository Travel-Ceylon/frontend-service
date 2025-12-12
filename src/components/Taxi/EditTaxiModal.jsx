// src/components/Taxi/EditTaxiModal.jsx

import React from "react";
import { useTaxiStore } from "../../store/taxiStore";
import TaxiEditForm from "./TaxiEditForm"; // Component from Step 2

const EditTaxiModal = ({ isOpen, onClose }) => {
  const { profile } = useTaxiStore(); // Get the current profile data

  if (!isOpen) return null;

  return (
    // Modal Overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="bg-white rounded-lg shadow-2xl p-6 w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Stop propagation to prevent closing when clicking inside
      >
        <h2 className="text-xl font-semibold text-green-600 pb-2 mb-4">
          Edit Details
        </h2>

        {/* The Form Component */}
        <TaxiEditForm currentProfile={profile} onClose={onClose} />
      </div>
    </div>
  );
};

export default EditTaxiModal;
