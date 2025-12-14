import React, { useEffect, useState } from "react";
import { Phone, Mail, MapPin, Check, X } from "lucide-react";

export const BookingsTab = ({
  bookings,
  getTaxiBookings,
  markComplete,
  cancelBooking,
}) => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Select first contacted booking by default
    const contacted = bookings.filter((b) => b.status === "contacted");
    if (contacted.length > 0 && !selectedBooking) {
      setSelectedBooking(contacted[0]);
    }
    // Clear selection if booking no longer exists
    if (
      selectedBooking &&
      !bookings.find((b) => b._id === selectedBooking._id)
    ) {
      setSelectedBooking(null);
    }
  }, [bookings, selectedBooking]);

  if (bookings.length === 0) {
    return (
      <p className="text-center py-10 text-gray-600">
        No bookings found for your service.
      </p>
    );
  }

  // Filter bookings by status "contacted" for new, others for history
  const newBookings = bookings.filter((b) => b.status === "contacted");
  const history = bookings.filter((b) => b.status !== "contacted");

  // Handle mark as complete
  const handleMarkComplete = async (bookingId) => {
    setLoading(true);
    try {
      await markComplete(bookingId);
      await getTaxiBookings(); // Refresh bookings
    } catch (error) {
      console.error("Error marking booking complete:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel booking
  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }
    setLoading(true);
    try {
      await cancelBooking(bookingId);
      await getTaxiBookings(); // Refresh bookings
    } catch (error) {
      console.error("Error cancelling booking:", error);
    } finally {
      setLoading(false);
    }
  };

  // Individual booking card component
  const BookingCard = ({ booking, isNew = false }) => {
    const isSelected = selectedBooking?._id === booking._id;

    return (
      <div>
        <div
          onClick={() => setSelectedBooking(booking)}
          className={`flex items-center justify-between p-4 shadow-md rounded-md cursor-pointer transition ${
            isSelected ? "bg-green-100" : "hover:bg-gray-50"
          }`}
        >
          {/* Left side: Avatar and User/Pickup Info */}
          <div className="flex items-center space-x-3">
            <img
              src={"/avatar.png"}
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-gray-800">
                {booking.user?.name || "Booking User"}
              </p>
              <p className="text-xs text-gray-500">
                {booking.pickup || "Pickup location"}
              </p>
            </div>
          </div>

          {/* Right side: Date and Button (now stacked vertically and aligned to the right) */}
          <div className="flex flex-col items-end space-y-1">
            <p className="text-[10px] text-gray-600 text-right">
              {new Date(booking.date).toLocaleDateString()}
            </p>
            <button
              className={`px-4 py-1 rounded-full text-white text-xs font-medium ${
                isNew ? "bg-green-400" : "bg-green-400"
              }`}
            >
              {isNew ? "New Booking" : "View Booking"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Booking details panel (right side)
  const DetailsPanel = () => {
    if (!selectedBooking) {
      return (
        <div className="p-6 lg:mt-10 border rounded-lg bg-white text-center text-gray-500">
          Select a booking to view details
        </div>
      );
    }

    const user = selectedBooking.user;
    const { pickup, dropup, date, time, additionalInfo, status } =
      selectedBooking;
    const isContacted = status === "contacted";

    return (
      <div className="p-6 shadow-md rounded-lg bg-white space-y-4 sticky top-4 max-w-xl">
        <h3 className="font-semibold text-gray-800 text-lg mb-4">
          Client Information
        </h3>

        {/* Client Information */}
        <div className="space-y-3 pb-4 border-b ">
          <div className="flex justify-between text-sm">
            <span className="text-gray-900">User name:</span>
            <span className="font-medium text-gray-500">
              {user?.name || "N/A"}
            </span>
          </div>

          <div className="flex justify-between text-sm items-center">
            <span className="text-gray-900 flex items-center gap-1">
              <Mail className="w-4 h-4" /> Email:
            </span>
            <span className="font-medium text-right text-gray-500 text-xs break-all max-w-[60%]">
              {user?.email || "user@email.com"}
            </span>
          </div>

          <div className="flex justify-between text-sm items-center">
            <span className="text-gray-900 flex items-center gap-1">
              <Phone className="w-4 h-4" /> Phone:
            </span>
            <span className="font-medium text-gray-500">
              {user?.phone || "+94XXXXXXXXX"}
            </span>
          </div>
        </div>

        {/* Booking Information */}
        <h4 className="font-semibold text-gray-800 pt-2">
          Booking Information
        </h4>

        <div className="space-y-3 pb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-900 flex items-center gap-1">
              <MapPin className="w-4 h-4" /> Pickup:
            </span>
            <span className="font-medium text-right text-gray-500 max-w-[60%]">
              {pickup || "N/A"}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-900 flex items-center gap-1">
              <MapPin className="w-4 h-4" /> Drop:
            </span>
            <span className="font-medium  text-gray-500 text-right max-w-[60%]">
              {dropup || "N/A"}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-900">Date:</span>
            <span className="font-medium text-gray-500">
              {new Date(date).toLocaleDateString()}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-900">Time:</span>
            <span className="font-medium text-gray-500">{time || "---"}</span>
          </div>

          {additionalInfo && (
            <div className="flex flex-col text-sm gap-1">
              <span className="text-gray-900">Additional info:</span>
              <span className="font-medium text-gray-700 text-xs bg-gray-50 p-2 rounded">
                {additionalInfo}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons - Only show for contacted bookings */}
        {isContacted && (
          <div className="flex flex-col gap-2 pt-4 border-t">
            <button
              onClick={() => handleMarkComplete(selectedBooking._id)}
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg font-medium transition"
            >
              <Check className="w-4 h-4" />
              Mark as Completed
            </button>
            <button
              onClick={() => handleCancelBooking(selectedBooking._id)}
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg font-medium transition"
            >
              <X className="w-4 h-4" />
              Cancel Booking
            </button>
          </div>
        )}

        {/* Status Badge - Show for completed/cancelled bookings */}
        {!isContacted && (
          <div className="pt-4 border-t">
            <div
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                status === "completed"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left side - Bookings list */}
      <div className="col-span-1 lg:col-span-2 space-y-6">
        {/* New bookings section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            New Bookings
          </h2>

          <div className="border rounded-lg bg-white divide-y">
            {newBookings.length > 0 ? (
              newBookings.map((booking) => (
                <BookingCard key={booking._id} booking={booking} isNew={true} />
              ))
            ) : (
              <p className="p-6 text-center text-gray-500">
                No new booking requests
              </p>
            )}
          </div>
        </section>

        {/* Booking history section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">History</h2>
          <div className=" rounded-lg bg-white divide-y shadow-md">
            {history.length > 0 ? (
              history.map((booking) => (
                <BookingCard key={booking._id} booking={booking} />
              ))
            ) : (
              <p className="p-6 text-center text-gray-500">
                No completed or cancelled bookings yet
              </p>
            )}
          </div>
        </section>
      </div>

      {/* Right side - Booking details */}
      <div className="col-span-1 lg:col-span-1">
        <DetailsPanel />
      </div>
    </div>
  );
};
