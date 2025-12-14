import React, { useState, useEffect, useCallback } from "react";
import { useTaxiStore } from "../store/taxiStore";
import { useAuthStore } from "../store/authStore";
import { BookingsTab } from "../components/Taxi/BookingsTab";
import { DashboardTab } from "../components/Taxi/DashboardTab";
import { AccountTab } from "../components/Taxi/AccountTab";

export function TaxiAdmin() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  // Get data and functions from stores
  const {
    profile,
    bookings,
    getProviderProfile,
    getTaxiBookings,
    getTaxiDashboardProfile,
    markBookingComplete,
    cancelBooking,
  } = useTaxiStore();
  const { user } = useAuthStore();

  // Fetch data when component mounts
  useEffect(() => {
    getProviderProfile();
    getTaxiDashboardProfile();
    getTaxiBookings();
  }, [getProviderProfile, getTaxiBookings, getTaxiDashboardProfile]);

  // Render tab content based on the 3 tabs there
  const renderContent = useCallback(() => {
    switch (activeTab) {
      case "Bookings":
        return (
          <BookingsTab
            bookings={bookings}
            getTaxiBookings={getTaxiBookings}
            markComplete={markBookingComplete}
            cancelBooking={cancelBooking}
          />
        );
      case "Dashboard":
        return <DashboardTab profile={profile} />;
      case "Account":
        return <AccountTab user={user} />;
      default:
        return null;
    }
  }, [
    activeTab,
    bookings,
    profile,
    user,
    getTaxiBookings,
    markBookingComplete,
    cancelBooking,
  ]);

  const tabs = ["Bookings", "Dashboard", "Account"];

  // Show loading state while profile data is being fetched
  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex max-w-screen items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // Build vehicle title from profile data
  const vehicleTitle = `${profile.vehicleNo || ""}`;

  return (
    <div className="min-h-screen bg-gray-50 max-w-screen">
      {/* Hero header with bg */}
      <div
        className="relative h-40 sm:h-100 bg-cover bg-center"
        style={{
          backgroundImage: `url(${"/adminBG.jpg"})`,
        }}
      ></div>

      {/* profile info */}
      <div className="max-w-screen xl:mx-12 mx-4 px-6 -mt-8 relative z-10">
        <div className="flex items-end space-x-3">
          {/* profile picture */}
          <img
            src={profile.profilePic || "/default-avatar.jpg"}
            alt="Driver"
            className="sm:w-40 sm:h-40 w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg"
          />
          {/* vehicle info */}
          <div className="pb-4">
            <h1 className="text-sm sm:text-2xl font-semibold text-black drop-shadow-lg">
              <span>{profile.model}</span> {vehicleTitle}
            </h1>
            <h1 className="text-gray-600 text-xs sm:text-base font-medium">
              {profile.province || "Western"}
            </h1>
          </div>
        </div>
      </div>

      {/* tab navigation according to user action */}
      <div className="max-w-screen xl:mx-18 mx-8 mt-4 sm:mt-8 mb-8">
        <div className="flex space-x-10 justify-evenly bg-white w-full rounded-md">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 py-3 font-medium text-xs sm:text-sm transition-all ${
                activeTab === tab
                  ? "text-gray-900 border-b-2 border-green-400"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* tab content */}
      <div className="pb-12">{renderContent()}</div>
    </div>
  );
}
